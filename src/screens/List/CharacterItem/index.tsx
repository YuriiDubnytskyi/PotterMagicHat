import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../../../store/hooks';
import { useCallback } from 'react';
import { SCREEN } from '../../../constants/screens';
import { StoreState, updateRandomCharacter } from '../../store-slice';
import { useTranslation } from 'react-i18next';

type CharacterItemProps = {
  handleGoToDetails: (character: any) => void;
  character: StoreState['list'][0];
};

export const CharacterItem = ({ character, handleGoToDetails }: CharacterItemProps) => {
  const { t } = useTranslation('list');

  const dispatch = useAppDispatch();
  const { navigate } = useNavigation();

  const handleReGame = useCallback(() => {
    dispatch(updateRandomCharacter(character));
    navigate(SCREEN.HOME);
  }, [character, dispatch, navigate]);

  return (
    <View style={styles.characterContainer}>
      {character.imageUri ? (
        <Image source={{ uri: character.imageUri }} style={styles.characterImage} />
      ) : (
        <Image source={require('../../../assets/images/no-image.png')} style={styles.characterImage} />
      )}
      <TouchableOpacity style={styles.characterDetails} onPress={() => handleGoToDetails(character)}>
        <Text style={styles.characterName}>{character.name}</Text>
        <Text style={styles.characterAttempts}>{t('attempts', { count: character.attempts })}</Text>
      </TouchableOpacity>
      <View style={styles.actionIcons}>
        {character.status === 'success' ? (
          <Icon name="check-circle" size={30} color="green" />
        ) : (
          <>
            <TouchableOpacity onPress={handleReGame}>
              <Icon name="refresh" size={30} color="gray" />
            </TouchableOpacity>
            <View style={{ marginLeft: 10 }}>
              <Icon name="times-circle" size={30} color="red" />
            </View>
          </>
        )}
      </View>
    </View>
  );
};
