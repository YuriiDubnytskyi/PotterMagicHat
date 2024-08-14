import { View, Text, Image, ScrollView, RefreshControl, Pressable, ActivityIndicator } from 'react-native';
import { CountContainer } from '../../components/CountContainer';
import styles from './styles';
import { useImageAspectRatio } from '../../hooks/useImageAspectRatio';
import { Box } from '../../components/Box';
import { useCallback, useEffect, useState } from 'react';
import { useToast } from 'react-native-toast-notifications';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearStore, failedAnswer, getDataList, resetRandomCharacter, successAnswer } from '../store-slice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ResetConfirmationModal } from '../../components/ResetConfimation';
import { useTranslation } from 'react-i18next';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<any, any>;
};
export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { t } = useTranslation('home');
  const dispatch = useAppDispatch();
  const { randomCharacter, loading, counter, list, dataList, successFinished } = useAppSelector(({ store }) => store);

  const [isModalVisible, setModalVisible] = useState(false);

  const handleResetConfirm = useCallback(() => {
    setModalVisible(false);
    dispatch(clearStore());
  }, [dispatch]);

  const handleCancel = useCallback(() => {
    setModalVisible(false);
  }, []);

  const handleShowModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const toast = useToast();

  useEffect(() => {
    if (dataList.length === 0 && !successFinished) {
      dispatch(getDataList());
    }
  }, [dataList.length, dispatch, successFinished]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={handleShowModal}
          disabled={counter.total === 0}
          style={counter.total === 0 && styles.disabled}
        >
          <Text style={{ color: 'black' }}>{t('common:reset')}</Text>
        </Pressable>
      ),
    });
  }, [navigation, counter, handleShowModal, t]);

  const aspectRatio = useImageAspectRatio(randomCharacter.imageUri);

  const handleAnswer = useCallback(
    (type: 'Slytherin' | 'Gryffindor' | 'Ravenclaw' | 'Hufflepuff' | 'None') => {
      if (type === 'None' && randomCharacter.house === '') {
        dispatch(
          successAnswer({
            ...randomCharacter,
            attempts: list.find(item => item.id === randomCharacter.id)?.attempts || 0,
          }),
        );
        dispatch(resetRandomCharacter());
        toast.show(t('correctAnswer'), { type: 'success', placement: 'top', duration: 2000 });
        return;
      }
      if (type === randomCharacter.house) {
        dispatch(
          successAnswer({
            ...randomCharacter,
            attempts: list.find(item => item.id === randomCharacter.id)?.attempts || 0,
          }),
        );
        dispatch(resetRandomCharacter());
        toast.show(t('correctAnswer'), { type: 'success', placement: 'top', duration: 2000 });
      } else {
        dispatch(
          failedAnswer({
            ...randomCharacter,
            attempts: list.find(item => item.id === randomCharacter.id)?.attempts || 0,
          }),
        );
        toast.show(t('wrongAnswer'), { type: 'danger', placement: 'top', duration: 2000 });
        dispatch(resetRandomCharacter());
      }
    },
    [dispatch, list, randomCharacter, t, toast],
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView
      refreshControl={<RefreshControl onRefresh={() => dispatch(resetRandomCharacter())} refreshing={false} />}
    >
      <View style={styles.countContainer}>
        <CountContainer count={counter.total} label={t('common:total')} />
        <CountContainer count={counter.success} label={t('common:success')} />
        <CountContainer count={counter.failed} label={t('common:failed')} />
      </View>
      {successFinished && (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>{t('successFinish')}</Text>
        </View>
      )}
      {!successFinished && (
        <>
          <View style={styles.imageContainer}>
            {randomCharacter.imageUri ? (
              <Image source={{ uri: randomCharacter.imageUri }} style={{ width: 100, aspectRatio }} />
            ) : (
              <Image source={require('../../assets/images/no-image.png')} style={{ width: 100, height: 100 }} />
            )}
            <Text>{randomCharacter.name}</Text>
          </View>
          <View style={styles.countContainer}>
            <Box
              label={t('gryffindor')}
              onPress={handleAnswer}
              imageUri={require('../../assets/images/grifindor.png')}
              type="Gryffindor"
            />
            <Box
              label={t('slytherin')}
              onPress={handleAnswer}
              imageUri={require('../../assets/images/slytherin.png')}
              type="Slytherin"
            />
          </View>
          <View style={styles.countContainer}>
            <Box
              label={t('ravenclaw')}
              onPress={handleAnswer}
              imageUri={require('../../assets/images/ravenclaw.png')}
              type="Ravenclaw"
            />
            <Box
              label={t('hufflepuff')}
              onPress={handleAnswer}
              imageUri={require('../../assets/images/hufflepuff.png')}
              type="Hufflepuff"
            />
          </View>
          <View style={styles.countContainer}>
            <Box label={t('notInHouse')} onPress={handleAnswer} type="None" />
          </View>
        </>
      )}
      <ResetConfirmationModal isVisible={isModalVisible} onConfirm={handleResetConfirm} onCancel={handleCancel} />
    </ScrollView>
  );
};
