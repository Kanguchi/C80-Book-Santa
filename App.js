import React, {Component} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import WelcomeScreen from './screens/WelcomeScreen';
import BookDonateScreen from './screens/BookDonateScreen';
import BookRequestScreen from './screens/BookRequestScreen';

export default function App() {
  return (
    <AppContainer />
  );
}
const BottomTabNavigator = createBottomTabNavigator({
  DonateBooks: {
    screen: BookDonateScreen,
    navigationOptions: {
        tabBarIcon: <Image source={require('./assets/request-list.png')} style={{width: 20, height: 20}}/>,
        tabBarLabel: "Donate Books",
    }
},
BookRequest: {
    screen: BookRequestScreen, navigationOptions: {
        tabBarIcon: <Image source={require('./assets/request-book.png')} style={{width: 20, height: 20}}/>,
        tabBarLabel: "Request Book",
    }
}
})

const SwitchNavigator = createSwitchNavigator({
  WelcomeScreen: {screen: WelcomeScreen},
  AppTabNavigator: {screen: BottomTabNavigator}
})
const AppContainer = createAppContainer(SwitchNavigator);
