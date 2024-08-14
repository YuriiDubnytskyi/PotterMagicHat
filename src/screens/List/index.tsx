import { View, Text, Pressable, TextInput, FlatList } from 'react-native';
import { SCREEN } from '../../constants/screens';
import styles from './styles';
import { CountContainer } from '../../components/CountContainer';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CharacterItem } from './CharacterItem';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearStore, StoreState } from '../store-slice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ResetConfirmationModal } from '../../components/ResetConfimation';
import { useTranslation } from 'react-i18next';

type ListScreenProps = {
  navigation: NativeStackNavigationProp<any, any>;
};

export const ListScreen = ({ navigation }: ListScreenProps) => {
  const { t } = useTranslation('list');
  const dispatch = useAppDispatch();
  const { counter, list } = useAppSelector(({ store }) => store);

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

  const [searchText, setSearchText] = useState('');

  const filteredCharacters = useMemo(
    () => list.filter(character => character.name.toLowerCase().includes(searchText.toLowerCase())),
    [list, searchText],
  );

  const handleGoToDetails = useCallback(
    (character: StoreState['list'][0]) => {
      navigation.navigate(SCREEN.LIST.DETAILS, {
        title: character.name,
        access: character.status === 'success',
        id: character.id,
      });
    },
    [navigation],
  );

  return (
    <View style={styles.container}>
      <View style={styles.countContainer}>
        <CountContainer count={counter.total} label={t('common:total')} />
        <CountContainer count={counter.success} label={t('common:success')} />
        <CountContainer count={counter.failed} label={t('common:failed')} />
      </View>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="gray" />
        <TextInput
          style={styles.searchInput}
          placeholder={t('filterCharacters')}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      {filteredCharacters.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>{t('noResultsFound')}</Text>
        </View>
      ) : (
        <FlatList
          data={filteredCharacters}
          renderItem={({ item }) => <CharacterItem character={item} handleGoToDetails={handleGoToDetails} />}
          keyExtractor={item => item.id}
          style={styles.characterList}
        />
      )}
      <ResetConfirmationModal isVisible={isModalVisible} onConfirm={handleResetConfirm} onCancel={handleCancel} />
    </View>
  );
};
