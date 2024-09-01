// src/navigators/AppNavigator.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "../MainScreen";
import TabNavigator from "./TabNavigator"; // Import the TabNavigator
import { StackNavigatorParamList } from "./navigator.types"; // Import types
import ProductDetailScreen from "../screen/ProductDetailScreen/ProductDetailScreen";

const Stack = createStackNavigator<StackNavigatorParamList>();

function AppNavigator() {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="Main">
                <Stack.Screen
                    name="Main"
                    component={MainScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Tab"
                    component={TabNavigator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Detail"
                    component={ProductDetailScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;
