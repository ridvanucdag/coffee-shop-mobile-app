import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from "react-i18next";

const ToggleSwitch = () => {
  const [isSanaGelsin, setIsSanaGelsin] = useState(true);
  const { t } = useTranslation();
  const toggleSelection = () => {
    setIsSanaGelsin(!isSanaGelsin);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.toggleButton, isSanaGelsin ? styles.activeSanaGelsin : styles.inactive]}
        onPress={toggleSelection}
      >
        <Text style={isSanaGelsin ? styles.activeText : styles.inactiveText}>{t("general.delivery")}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.toggleButton, !isSanaGelsin ? styles.activeGelAl : styles.inactive]}
        onPress={toggleSelection}
      >
        <Text style={!isSanaGelsin ? styles.activeText : styles.inactiveText}>{t("general.pickup")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 44,
    width: 300,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
  },
  toggleButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
    width: 150,
    borderRadius: 10,
    margin: 4,
  },
  activeSanaGelsin: {
    backgroundColor: 'red',
  },
  activeGelAl: {
    backgroundColor: 'blue',
  },
  inactive: {
    backgroundColor: '#F0F0F0',
  },
  activeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  inactiveText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F2D2C',
  },
});

export default ToggleSwitch;
