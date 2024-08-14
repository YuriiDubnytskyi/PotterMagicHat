import { useEffect, useMemo } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native';
import styles from './styles';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getDetails } from '../store-slice';
import { useTranslation } from 'react-i18next';

type DetailsScreenProps = {
  route?: {
    params?: {
      id: string;
      access: boolean;
    };
  };
};

export const DetailsScreen = ({ route }: DetailsScreenProps) => {
  const { t } = useTranslation('list');
  const dispatch = useAppDispatch();
  const { details, loading } = useAppSelector(({ store }) => store);

  useEffect(() => {
    dispatch(getDetails({ id: route?.params?.id }));
  }, [dispatch, route?.params?.id]);

  const access = route?.params?.access;
  const renderItem = ({ item }: { item: { id: string; label: string; value: string } }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.label}>{item.label}</Text>
      <Text style={styles.value}>{item.value}</Text>
    </View>
  );

  const characteristics = useMemo(
    () => [
      { id: '1', label: t('species'), value: details.species || t('common:na') },
      { id: '2', label: t('gender'), value: details.gender || t('common:na') },
      { id: '3', label: t('house'), value: details.house || t('common:na') },
      { id: '4', label: t('dateOfBirth'), value: details?.dateOfBirth || t('common:na') },
      { id: '5', label: t('yearOfBirth'), value: details?.yearOfBirth?.toString() || t('common:na') },
      { id: '6', label: t('wizard'), value: details.wizard ? t('common:yes') : t('common:no') },
      { id: '7', label: t('ancestry'), value: details.ancestry || t('common:na') },
      { id: '8', label: t('eyeColor'), value: details.eyeColour || t('common:na') },
      { id: '9', label: t('hairColor'), value: details.hairColour || t('common:na') },
      {
        id: '10',
        label: t('wand'),
        value:
          details.wand.core && details.wand.length && details.wand.wood
            ? `${details?.wand?.length} inches, ${details?.wand?.wood}, ${details?.wand?.core}`
            : t('common:na'),
      },
      { id: '11', label: t('patronus'), value: details.patronus || t('common:na') },
      { id: '12', label: t('hogwartsStudent'), value: details.hogwartsStudent ? t('common:yes') : t('common:no') },
      { id: '13', label: t('hogwartsStaff'), value: details.hogwartsStaff ? t('common:yes') : t('common:no') },
      { id: '14', label: t('actor'), value: details.actor || t('common:na') },
      { id: '15', label: t('alive'), value: details.alive ? t('common:yes') : t('common:no') },
    ],
    [
      details.actor,
      details.alive,
      details.ancestry,
      details?.dateOfBirth,
      details.eyeColour,
      details.gender,
      details.hairColour,
      details.hogwartsStaff,
      details.hogwartsStudent,
      details.house,
      details.patronus,
      details.species,
      details.wand.core,
      details.wand.length,
      details.wand.wood,
      details.wizard,
      details?.yearOfBirth,
      t,
    ],
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {access ? (
        <FlatList
          ListHeaderComponent={
            <>
              {details.image ? (
                <Image source={{ uri: details.image }} style={styles.image} resizeMode="contain" />
              ) : (
                <Image source={require('../../assets/images/no-image.png')} style={styles.image} resizeMode="contain" />
              )}
              <Text style={styles.name}>{details.name}</Text>
              {!!details.alternate_names.length && (
                <Text style={styles.alternateNames}>{`${t('alternativeNames')} ${details.alternate_names.join(
                  ', ',
                )}`}</Text>
              )}
            </>
          }
          data={characteristics}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={styles.list}
        />
      ) : (
        <View style={styles.accessDeniedContainer}>
          {details.image ? (
            <Image source={{ uri: details.image }} style={styles.image} resizeMode="contain" />
          ) : (
            <Image source={require('../../assets/images/no-image.png')} style={styles.image} resizeMode="contain" />
          )}

          <Text style={styles.accessDeniedText}>{t('accessDenied')}</Text>
        </View>
      )}
    </View>
  );
};
