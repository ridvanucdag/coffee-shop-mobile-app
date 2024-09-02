import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useTranslation } from "react-i18next";
import { StackNavigatorParamList } from './navigators/navigator.types';

const MainScreen = () => {
  const navigation = useNavigation<NavigationProp<StackNavigatorParamList>>();
  const { t } = useTranslation();
  const handleNavigate = (): void => {
    navigation.navigate('Tab', { screen: 'AnaSayfa' });
  };

  return (
    <ImageBackground
      source={require("../src/assets/images/Main/1.jpeg")}
      style={styles.imageBackground}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" backgroundColor="black" translucent/>
      <SafeAreaView style={styles.container}>
        <View style={styles.overlay}>
          <Text style={styles.title}>{t("main.welcome")}</Text>
          <Text style={styles.subtitle}>{t("main.description")}</Text>
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleNavigate}
          >
            <Text style={styles.buttonText}>{t("main.started")}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'tomato',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MainScreen;
