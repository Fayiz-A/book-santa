import React, {Component} from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import {AppTabNavigator} from '../screens/AppTabNavigator';
import CustomDrawer from './Drawer';
import WelcomeScreen from '../screens/WelcomeScreen';
import DonateBookScreen from '../screens/DonateBookScreen';

export const DrawerNavigator = createDrawerNavigator(
   {
      Home: { 
         screen: () => <AppTabNavigator />
      },
   },
   {
      contentComponent: CustomDrawer
   },
   {
      initialRoute: 'Home'
   }
);