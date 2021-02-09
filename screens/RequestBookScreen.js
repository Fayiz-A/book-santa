import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput } from 'react-native';
import AppHeader from '../components/AppBar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import db from '../config';

export default class RequestBookScreen extends React.Component {

   constructor() {
      super();

      this.state={
         bookName: '',
         reason: ''
      }
   }

   addRequest = async (bookName, reason) => {
      if(bookName.trim().length != 0 && reason.trim().length != 0) {
         await db.collection('bookRequests').add({
            bookName: bookName,
            reason: reason
         });
   
         this.setState({
            bookName: '',
            reason: ''
         });
   
         alert('Book requested successfully');
      } else {
         alert('Please all the details!')
      }
   }

   render() {
      return (
         <View>
            {/* <AppHeader title='Request Book'/> */}
            <KeyboardAvoidingView>
               <View>
                  <View style={styles.bookNameTextInputContainer}>
                     <TextInput 
                        style={styles.bookNameTextInput}
                        placeholder='Enter book name'
                        onChangeText={(bookName) => this.setState({
                           bookName: bookName
                        })}
                        value={this.state.bookName}
                     />
                  </View>
                  <View style={styles.reasonTextInputContainer}>
                     <TextInput 
                        style={styles.reasonTextInput}
                        placeholder='Why do you want to read that book?'
                        multiline={true}
                        onChangeText={(reason) => this.setState({
                           reason: reason
                        })}
                        value={this.state.reason}
                     />
                  </View>
                  <View style={styles.submitButtonContainer}>
                     <TouchableOpacity
                     style={styles.submitButton}
                        onPress={() => this.addRequest(this.state.bookName, this.state.reason)}
                     >
                        <Text style={styles.submitButtonText}>Submit</Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </KeyboardAvoidingView>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   bookNameTextInputContainer: {
      paddingTop: 50,
      paddingLeft: 400,

   },
   reasonTextInputContainer: {
      paddingTop: 20,
      paddingLeft: 400,
   },
   bookNameTextInput: {
      width: 400,
      fontSize: 20,
      borderRadius: 40,
      borderWidth: 4,
      padding: 5,
   },
   reasonTextInput: {
      width: 400,
      fontSize: 20,
      height: 300,
      borderRadius: 20,
      borderWidth: 4,
      padding: 5,
   },
   submitButtonContainer: {
      paddingLeft: 400,
      paddingTop: 20,
   },
   submitButton: {
      alignItems: 'center',
      justifyContent: "center",
      backgroundColor: 'red',
      width: 200,
      height: 40,
      borderRadius: 20,
      shadowColor: 'black',
      elevation: 20,
      shadowOpacity: 0.5,
      shadowOffset:{
         width: 0, 
         height:2
      }
   },
   submitButtonText: {
      fontSize: 20,
      color: 'white',
      fontWeight: '600'
   }
})