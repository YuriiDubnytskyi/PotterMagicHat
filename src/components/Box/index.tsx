import { Image, ImageProps, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useCallback } from 'react';

type BoxProps = {
  imageUri?: ImageProps['source'];
  label: string;
  onPress: (type: 'Slytherin' | 'Gryffindor' | 'Ravenclaw' | 'Hufflepuff' | 'None') => void;
  type: 'Slytherin' | 'Gryffindor' | 'Ravenclaw' | 'Hufflepuff' | 'None';
};

export const Box = ({ imageUri, label, onPress, type }: BoxProps) => {
  const handlePress = useCallback(() => {
    onPress(type);
  }, [onPress, type]);

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      {imageUri && <Image source={imageUri} style={{ width: 35, height: 35 }} />}
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};
