import React, {Component} from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import {AppTabNavigator} from '../screens/AppTabNavigator';
import CustomDrawer from './Drawer';
import WelcomeScreen from '../screens/WelcomeScreen';
import DonateBookScreen from '../screens/DonateBookScreen';
import SettingsScreen from '../screens/SettingsScreen';

export const DrawerNavigator = createDrawerNavigator(
   {
      Settings: {
         screen: (props) => <SettingsScreen/>
      },
      Home: { 
         screen: (props) => <DonateBookScreen/>,
      },
   },
   {
      contentComponent: CustomDrawer
   },
   {
      initialRoute: 'Home'
   }
);