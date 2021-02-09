import React, { Component } from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import DonateBookScreen from './DonateBookScreen';
import RequestBookScreen from './RequestBookScreen';

export const AppTabNavigator = createBottomTabNavigator({
   DonateBook: {
      screen: DonateBookScreen,
      navigationOptions: {
         // tabBarIcon: <Image source={'https://raw.githubusercontent.com/whitehatjr/book-santa-stage-3/master/assets/request-book.png'} style={{width: 40, height: 40}}/>,
         tabBarLabel: 'DonateBook'
      }
   },
   RequestBookScreen: {
      screen: RequestBookScreen,
      navigationOptions: {
         // tabBarIcon: <Image source={'https://github.com/whitehatjr/book-santa-stage-3/blob/master/assets/request-list.png'} style={{width: 40, height: 40}}/>,
         tabBarLabel: 'RequestBook'
      }
   }  
});