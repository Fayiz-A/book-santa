import React, {Component} from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import {AppTabNavigator} from '../screens/AppTabNavigator';
import CustomDrawer from './Drawer';
import WelcomeScreen from '../screens/WelcomeScreen';
import DonateBookScreen from '../screens/DonateBookScreen';
import SettingsScreen from '../screens/SettingsScreen';
import {AppStackNavigator} from '../components/AppStackNavigator';
import RecieverDetailsScreen from '../screens/ReceiverDetailsScreen';
import MyDonationsScreen from '../screens/MyDonationScreen';

export const DrawerNavigator = createDrawerNavigator(
   {
      Home: { 
         screen: AppStackNavigator,
      },
      Settings: {
         screen: (props) => <SettingsScreen/>
      },
      MyDonations: {
         screen: (props) => <MyDonationsScreen />
      }
   },
   {
      contentComponent: CustomDrawer
   },
   {
      initialRoute: 'Home'
   }
);