import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import OrderScreen from './screens/OrderScreen';
import CashierScreen from './screens/CashierScreen';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Order" component={OrderScreen} />
        <Stack.Screen name="CashierScreen" component={CashierScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
