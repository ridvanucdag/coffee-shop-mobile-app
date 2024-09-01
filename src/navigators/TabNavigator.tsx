import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import FavoriteScreen from "../screen/FavoriteScreen/FavoriteScreen";
import BasketScreen from "../screen/BasketScreen/BasketScreen";
import ProfileScreen from "../screen/ProfileScreen/ProfileScreen";
import HomeScreen from "../screen/HomeScreen/HomeScreen";
import CustomTabBar from "../components/CustomTabBar"; 
import { TabNavigatorParamList } from "./navigator.types"; 
import { Platform } from "expo-modules-core";

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          if (route?.name === "AnaSayfa") {
            iconName = focused ? "home" : "home-outline";
          } else if (route?.name === "Favoriler") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route?.name === "Sepet") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route?.name === "Profil") {
            iconName = focused ? "person" : "person-outline";
          } else {
            iconName = "home";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          height: Platform.OS ==='ios' ?  50 : 55,
          paddingBottom:  Platform.OS ==='ios' ? 0 : 6,
          
        },
        tabBarLabelStyle: {
          fontSize: 13,
        },
        tabBarIconStyle: {
          marginTop:  Platform.OS ==='ios' ? 10 : 6,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="AnaSayfa" component={HomeScreen} />
      <Tab.Screen name="Favoriler" component={FavoriteScreen} />
      <Tab.Screen name="Sepet" component={BasketScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
