import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/src/redux/store';
import {StatusBar} from 'react-native';
import AppNavigator from '@/src/navigators/AppNavigator';
import { setCart } from '@/src/redux/slices/basketSlice';
import { setFavorites } from '@/src/redux/slices/favoriteSlice';
import { loadFromAsyncStorage } from '@/src/utils/AsyncStorage';
import i18next from 'i18next'; 
import { I18nextProvider } from 'react-i18next'; 
import en from '@/src/locales/en/en.json';  
import tr from '@/src/locales/tr/tr.json';  

import 'intl-pluralrules';

i18next.init({
  lng: 'tr',
  resources: {
    en: { translation: en },
    tr: { translation: tr },
  },
});

const Index = () => {
  useEffect(() => {
    const loadCartAndFavorites = async () => {
      try {
        const cartItems = await loadFromAsyncStorage("cart") || [];  
        const favoriteIds = await loadFromAsyncStorage("favorites") || [];  

        if (cartItems.length > 0) {
          store.dispatch(setCart(cartItems));
        }

        if (favoriteIds.length > 0) {
          store.dispatch(setFavorites(favoriteIds));
        }
      } catch (error) {
        console.error("Error loading cart or favorites from AsyncStorage", error);
      }
    };

    loadCartAndFavorites();
  }, []);

  return (
    <Provider store={store} >
      <StatusBar barStyle="light-content" translucent/>
      <I18nextProvider i18n={i18next}>
        <AppNavigator />
      </I18nextProvider>
    </Provider>
  );
};

export default Index;
