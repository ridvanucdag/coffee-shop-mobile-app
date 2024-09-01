import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { BottomTabBarProps, BottomTabBar } from '@react-navigation/bottom-tabs';
import { RootState } from '../redux/store';

const CustomTabBar: React.FC<BottomTabBarProps> = ({ ...props }) => {
  const cartItems = useSelector((state: RootState) => state?.cart?.items);

  return (
    <View style={styles.container}>
      <BottomTabBar {...props} />
      {cartItems?.length > 0 && (
        <View style={styles.cartLengthContainer}>
          <Text style={styles.cartLengthText}>{cartItems?.length}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  cartLengthContainer: {
    position: 'absolute',
    top: Platform.OS ==='ios' ? 5: 2,
    left: '64%',
    backgroundColor: 'red',
    borderRadius: 50,
    paddingHorizontal: 3,
    paddingVertical: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartLengthText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default CustomTabBar;
