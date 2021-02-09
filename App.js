import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';
import AppHeader from './components/AppBar';
import WelcomeScreen from './screens/WelcomeScreen';
import { AppTabNavigator } from './screens/AppTabNavigator';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';

export default class App extends React.Component {
  render() {
    return <AppContainer />
  }
}

const switchNavigator = createSwitchNavigator({
  BottomNavigator: { screen: AppTabNavigator },
  WelcomeScreen: { screen: WelcomeScreen },
})

const AppContainer = createAppContainer(switchNavigator);