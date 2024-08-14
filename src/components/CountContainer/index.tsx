import { Text, View } from 'react-native';
import styles from './styles';

type CountContainerProps = {
  count: number;
  label: string;
};
export const CountContainer = ({ count, label }: CountContainerProps) => {
  return (
    <View style={styles.container}>
      <Text>{count}</Text>
      <Text>{label}</Text>
    </View>
  );
};
