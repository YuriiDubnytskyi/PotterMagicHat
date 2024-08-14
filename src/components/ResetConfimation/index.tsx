import { View, Text, Modal, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useTranslation } from 'react-i18next';

type ResetConfirmationModalProps = {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ResetConfirmationModal = ({ isVisible, onConfirm, onCancel }: ResetConfirmationModalProps) => {
  const { t } = useTranslation('modal');

  return (
    <Modal transparent={true} animationType="slide" visible={isVisible} onRequestClose={onCancel}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{t('resetGame')}</Text>
          <Text style={styles.modalMessage}>{t('areYouSureReset')}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.buttonText}>{t('common:cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.buttonText}>{t('common:confirm')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
