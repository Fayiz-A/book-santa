import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AppHeader from '../components/AppBar';
import { ListItem, Icon } from 'react-native-elements';

import firebase from 'firebase';
import db from '../config';

export default class NotificationsScreen extends Component {

   constructor(){
      super()
      this.state = {
        userId : firebase.auth().currentUser.email,
        allNotifications: []
      }
   }

   componentDidMount() {
      this.getAllNotificationsForCurrentUser();
   }

   getAllNotificationsForCurrentUser = () => {
      db.collection("notifications")
      .where("receiverID" ,'==', this.state.userId)
      .where("notificationStatus", "==", "unread")
      .onSnapshot((snapshot)=>{
        let allNotifications = [];

        snapshot.docs.map(
           document => {
               let notification = document.data();
               notification["docID"] = document.id;
               allNotifications.push(notification)
            }
         );

        this.setState({
         allNotifications : allNotifications,
        });
      })
   }

   keyExtractor = (item, index) => index.toString()

   renderItem = ( {item, i} ) =>(
      <ListItem
        key={i}
        bottomDivider
      >
         <ListItem.Chevron>
            <Icon name="book" type="font-awesome" color ='#696969' size={50}/>
         </ListItem.Chevron>
        <ListItem.Content>
          <ListItem.Title style={{ color: 'black', fontWeight: 'bold' }}>{item.bookName}</ListItem.Title>
            <ListItem.Subtitle>{item.message}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
   )

   render() {
      return (
         <View>
            <AppHeader title='Notifications'/>
               <View style={{flex:1}}>
               {
                  this.state.allNotifications.length === 0
                  ?(
                     <View style={styles.subtitle}>
                        <Text style={{ fontSize: 20}}>List of all notifications</Text>
                     </View>
                  )
                  :(
                     <FlatList
                     keyExtractor={this.keyExtractor}
                     data={this.state.allNotifications}
                     renderItem={this.renderItem}
                     />
                  )
               }
            </View>
         </View>
      );
   }
} 

const styles = StyleSheet.create({
   button:{
     width:100,
     height:30,
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:"#ff5722",
     shadowColor: "#000",
     shadowOffset: {
        width: 0,
        height: 8
      },
     elevation : 16
   },
   subtitle :{
     flex:1,
     fontSize: 20,
     justifyContent:'center',
     alignItems:'center'
   }
 })