import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';
import AppHeader from './components/AppBar';
import WelcomeScreen from './screens/WelcomeScreen';

export default class App extends React.Component {
  render() {
    return <WelcomeScreen />
  }
}