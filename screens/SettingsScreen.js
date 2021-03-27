import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import AppHeader from '../components/AppBar';
import firebase from 'firebase';
import db from '../config';

export default class SettingsScreen extends React.Component {

   constructor() {
      super();
      this.state = {
         emailId: '',
         firstName: '',
         lastName: '',
         address: '',
         contact: '',
         docId: null
      }
   }

   componentDidMount() {
      this.fetchUserDetails();
   }

   fetchUserDetails = async () => {
      let user = firebase.auth().currentUser;

      if (user != null) {
         let email = user.email;

         await db.collection('users').where('email_id', '==', email).get()
            .then(snapshot => {
               snapshot.forEach(doc => {
                  let data = doc.data();
                  this.setState({
                     emailId: data.email_id,
                     firstName: data.first_name,
                     lastName: data.last_name,
                     address: data.address,
                     contact: data.contact,
                     docId: doc.id
                  })
               })
            });

            console.log(`Email id is ${this.state.emailId} & email id sign in is ${email}`)
      } else {
         console.log(`User not signed in`)
      }

   }

   updateUserDetails = async (firstName, lastName, emailId, contact, address) => {
      await db.collection('users').doc(this.state.docId).update({
         email_id: emailId,
         first_name: firstName,
         last_name: lastName,
         address: address,
         contact: contact,
      }).catch(e => console.error(e));

      alert(`User modified Successfully`);
   }

   render() {
      return (
         <View>
            <AppHeader title='Settings' notificationIconVisible={true}/>
            <View>
               <TextInput
                  style={styles.formTextInput}
                  placeholder={"First Name"}
                  maxLength={8}
                  value={this.state.firstName}
                  onChangeText={(text) => {
                     this.setState({
                        firstName: text
                     })
                  }}
               />
               <TextInput
                  style={styles.formTextInput}
                  placeholder={"Last Name"}
                  maxLength={8}
                  value={this.state.lastName}
                  onChangeText={(text) => {
                     this.setState({
                        lastName: text
                     })
                  }}
               />
               <TextInput
                  style={styles.formTextInput}
                  placeholder={"Contact"}
                  maxLength={10}
                  value={this.state.contact}
                  keyboardType={'numeric'}
                  onChangeText={(text) => {
                     this.setState({
                        contact: text
                     })
                  }}
               />
               <TextInput
                  style={styles.formTextInput}
                  placeholder={"Address"}
                  multiline={true}
                  value={this.state.address}
                  onChangeText={(text) => {
                     this.setState({
                        address: text
                     })
                  }}
               />
               <TextInput
                  style={styles.formTextInput}
                  placeholder={"Email"}
                  keyboardType={'email-address'}
                  value={this.state.emailId}
                  onChangeText={(text) => {
                     this.setState({
                        emailId: text
                     })
                  }}
               />
               <View style={styles.modalBackButton}>
                  <TouchableOpacity
                     style={styles.saveButton}
                     onPress={() => this.updateUserDetails(this.state.firstName, this.state.lastName, this.state.emailId, this.state.contact, this.state.address)}
                  >
                     <Text style={{ color: '#ff5722' }}>Save</Text>
                  </TouchableOpacity>
               </View>
            </View>
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#F8BE85',
      alignItems: 'center',
      justifyContent: 'center'
   },
   profileContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   title: {
      fontSize: 65,
      fontWeight: '300',
      paddingBottom: 30,
      color: '#ff3d00'
   },
   loginBox: {
      width: 300,
      height: 40,
      borderBottomWidth: 1.5,
      borderColor: '#ff8a65',
      fontSize: 20,
      margin: 10,
      paddingLeft: 10
   },
   KeyboardAvoidingView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },
   modalTitle: {
      justifyContent: 'center',
      alignSelf: 'center',
      fontSize: 30,
      color: '#ff5722',
      margin: 50
   },
   modalContainer: {
      flex: 1,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#ffff",
      marginRight: 30,
      marginLeft: 30,
      marginTop: 80,
      marginBottom: 80,
   },
   formTextInput: {
      width: "75%",
      height: 35,
      alignSelf: 'center',
      borderColor: '#ffab91',
      borderRadius: 10,
      borderWidth: 1,
      marginTop: 20,
      padding: 10
   },
   registerButton: {
      width: 200,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderRadius: 10,
      marginTop: 30
   },
   registerButtonText: {
      color: '#ff5722',
      fontSize: 15,
      fontWeight: 'bold'
   },
   saveButton: {
      width: 200,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 5,
      marginLeft: 400
   },

   button: {
      width: 300,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 25,
      backgroundColor: "#ff9800",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.30,
      shadowRadius: 10.32,
      elevation: 16,
      padding: 10
   },
   buttonText: {
      color: '#ffff',
      fontWeight: '200',
      fontSize: 20
   }
})