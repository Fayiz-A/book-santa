import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { ListItem, ButtonGroup } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import AppHeader from '../components/AppBar';
import CustomDrawer from '../components/DrawerNavigator'

export default class DonateBookScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      requestedBooksList: []
    }
    this.requestRef = null
  }

  getRequestedBooksList = () => {
    this.requestRef = db.collection("bookRequests")
      .onSnapshot((snapshot) => {
        var requestedBooksList = snapshot.docs.map(document => document.data());
        this.setState({
          requestedBooksList: requestedBooksList
        });
      })
  }

  componentDidMount() {
    this.getRequestedBooksList()
  }

  componentWillUnmount() {
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item, i }) => {

    return (
      <ListItem
        key={i}
        bottomDivider
      >
        <ListItem.Content>
          <ListItem.Title style={{ color: 'black', fontWeight: 'bold' }}>{item.bookName}</ListItem.Title>
          <ListItem.Subtitle>{item.reason}</ListItem.Subtitle>

        </ListItem.Content>
        <ListItem.ButtonGroup 
            textStyle={{ color: '#000' }} 
            buttons={['View']} 
            onPress={(index) => {
                this.props.navigation.navigate('ReceiverDetails', {'details': item});
                console.log(`The button's index is: ${item.bookName}`)
            }}
        />
      </ListItem>
    )
  }

  render() {
    console.log(`Props are ${JSON.stringify(this.props)}`)
    return (
      <View style={{ flex: 1 }}>
        <AppHeader title="Donate Books" />
        <View style={{ flex: 1 }}>
          {
            this.state.requestedBooksList.length == 0
              ?
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20 }}>List Of All Requested Books</Text>
              </View>

              :
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.requestedBooksList}
                renderItem={this.renderItem}
              />

          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ff5722",
    borderRadius: 20,
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 2
    }
  }
})
