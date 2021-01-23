import React, {Component} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import WelcomeScreen from './screens/WelcomeScreen';
import BookDonateScreen from './screens/BookDonateScreen';
import BookRequestScreen from './screens/BookRequestScreen';
import CustomSideBarMenu from './components/customSideBarMenu';
import SettingScreen from './screens/Settings';

export default function App() {
  return (
    <AppContainer />
  );
}


const TabNavigator = createBottomTabNavigator({
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

export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : TabNavigator
  },
  Settings : {
    screen : SettingScreen
  }
},
{
  contentComponent: CustomSideBarMenu
},
{
  initialRouteName : 'Home'
})

const SwitchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen: WelcomeScreen},
  Drawer : {screen: AppDrawerNavigator}
})
const AppContainer = createAppContainer(SwitchNavigator);
