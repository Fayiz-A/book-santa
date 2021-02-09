import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';
import AppHeader from './components/AppBar';
import WelcomeScreen from './screens/WelcomeScreen';
import { AppTabNavigator } from './screens/AppTabNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { DrawerNavigator } from './components/DrawerNavigator';

export default class App extends React.Component {
  render() {
    return <SafeAreaProvider>
      <SwitchNavigator />
    </SafeAreaProvider>
  }
}

const SwitchNavigator = createAppContainer(
  createSwitchNavigator({
    Drawer: { screen: DrawerNavigator  },
    WelcomeScreen: { screen: WelcomeScreen },
  },
  {
    initialRouteName: 'Drawer'
  }
  )

);