import React, { useState, useEffect } from 'react';
import { View, Text, Modal } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import styles from './styles';
import { useTranslation } from 'react-i18next';

export const NetworkWrapper = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation('modal');
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        setModalVisible(true);
      } else {
        setModalVisible(false);
      }
    });

    // Cleanup the subscription when the component is unmounted
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* Children components */}
      {children}

      {/* Internet connection lost modal */}
      <Modal transparent={true} animationType="slide" visible={isModalVisible} onRequestClose={() => {}}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t('connectionLost')}</Text>
            <Text style={styles.modalMessage}>{t('connectionDescription')}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};
