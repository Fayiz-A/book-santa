import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import DonateBookScreen from '../screens/DonateBookScreen';
import ReceiverDetailsScreen from '../screens/ReceiverDetailsScreen';

export const AppStackNavigator = createStackNavigator(
   {
      BookDonateList: {
         screen: (props) => <DonateBookScreen navigation={props.navigation}/>,
            navigationOptions: {
               headerShown: false
            }
      },
      ReceiverDetails: {
         screen: (props) => <ReceiverDetailsScreen navigation={props.navigation}/>,
         navigationOptions: {
            headerShown: false
         }
      }
   }, 
   {
      initialRouteName: 'BookDonateList'
   }
)