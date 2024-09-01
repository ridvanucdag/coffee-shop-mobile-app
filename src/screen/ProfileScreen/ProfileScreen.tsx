import React from 'react';
import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';

const ProfileScreen = () => {
  const { t } = useTranslation();
  const menuItems = [
    { title: 'Hesap Bilgileri', onPress: () => alert('Hesap Bilgileri Tıklandı!') },
    { title: 'Siparişlerim', onPress: () => alert('Siparişlerim Tıklandı!') },
    { title: 'Adres Defteri', onPress: () => alert('Adres Defteri Tıklandı!') },
    { title: 'Ödeme Yöntemleri', onPress: () => alert('Ödeme Yöntemleri Tıklandı!') },
    { title: 'Favoriler', onPress: () => alert('Favorilere Tıklandı!') },
    { title: 'Sıkça Sorulan Sorular', onPress: () => alert('SSS Tıklandı!') },
    { title: 'Ayarlar', onPress: () => alert('Ayarlar Tıklandı!') },
    { title: 'Çıkış Yap', onPress: () => alert('Çıkış Yap Tıklandı!') },
  ];

  const recentActivities = [
    { activity: 'Yeni bir ürün siparişi verdiniz.', date: '1 Eylül 2024' },
    { activity: 'Hesap bilgilerinizi güncellediniz.', date: '30 Ağustos 2024' },
    { activity: 'Mobil Uygulama reposunu açtın', date: '30 Ağustos 2024' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Rıdvan Üçdağ</Text>
      </View>
      {/* <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.title}>E-posta:</Text>
          <Text style={styles.infoText}>ridvanucdag@gmail.com</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.title}>Hakkında:</Text>
          <Text style={styles.infoText}>Yazılım geliştirici ve teknoloji meraklısı.</Text>
        </View>
      </View> */}

      <View style={styles.activityContainer}>
        <Text style={styles.activityHeader}>{t("profile.recentActivities")}</Text>
        {recentActivities?.map((item, index) => (
          <View key={index} style={styles.activityItem}>
            <Text style={styles.activityText}>{item?.activity}</Text>
            <Text style={styles.activityDate}>{item?.date}</Text>
          </View>
        ))}
      </View>

      <View style={styles.menuContainer}>
        {menuItems?.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem} onPress={item?.onPress}>
            <Text style={styles.menuText}>{item?.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,

    backgroundColor: '#f7f7f7',
  },
  header: {
    marginBottom: 10,
    marginTop: Platform.OS === 'android' ? 0 : -15,
    alignItems: 'center',
    padding: 2,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
  },
  headerText: {
    fontSize: 25,
    color: '#fff',
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',

  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight:5,

  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  activityContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,

  },
  activityHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4CAF50',
  },
  activityItem: {
    marginBottom: 10,
  },
  activityText: {
    fontSize: 16,
    color: '#333',
  },
  activityDate: {
    fontSize: 14,
    color: '#999',
  },
  menuContainer: {
    marginTop: 20,
  },
  menuItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  menuText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default ProfileScreen;
