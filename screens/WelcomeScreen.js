import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Modal } from 'react-native';
import AppHeader from '../components/AppBar';
import db from '../config';
import firebase from 'firebase';
import SantaAnimation from '../components/SantaClause';

export default class WelcomeScreen extends React.Component {

   constructor() {
      super();
      this.state = {
         dimensions: Dimensions.get('window'),
         emailId: '',
         password: '',
         modalVisible: false,
         userDetails: {
            mobileNo: 0,
            firstName: '',
            lastName: '',
            address: ''
         }
      }
   }

   componentDidMount() {
      Dimensions.addEventListener("change", ({ window, screen }) => {
         this.setState({
            dimensions: window
         })
      })
   }

   componentWillUnmount() {
      Dimensions.removeEventListener("change", () => console.log(`event listener removed in App.js`))
   }

   signUp = (emailId, password) => {
      if(emailId && password) {
         // firebase.auth().createUserWithEmailAndPassword(emailId, password)
         // .then(res => {
            alert(`User added successfully`);
            showModal();
         // })
         // .catch(err => {
         //    alert(`Some error occurred`)
         //    console.error(err)
         // });
      }
   }

   showModal = () => {
      this.setState({
         modalVisible: true
      })
   }
   
   login = (emailId, password) => {
      if(emailId && password) {
         firebase.auth().signInWithEmailAndPassword(emailId, password)
         .then(res => alert(`Login successful!`))
         .catch(err => {
            alert(`Some error occureed`)
            console.error(err)
         })
      }
   }

   onModalClosed = (userDetails) => {

   }

   saveUserDetails = async () => {
      print(`In user details`)
      let userDetails = this.state.userDetails;
      await db.collection('users').add({
         address: userDetails.address,
         mobileNo: userDetails.mobileNo,
         firstName: userDetails.firstName,
         lastName: userDetails.lastName
      }).then(res => alert(`Details successfully saved!`))
   }

   render() {
      console.log(`Dimensions: ${dimensions}`)
      let dimensions = this.state.dimensions;

      let textInputInfoList = [
         {
            onChangeText: (text) => {
               this.setState({
                  emailId: text
               })
            },
            placeholder: 'Email'
         },
         {
            onChangeText: (text) => {
               this.setState({
                  password: text
               })
            },
            placeholder: 'Password'
         }
      ]

      let buttonInfoList = [
         {
            title: 'Sign up',
            onPress: () => this.signUp(this.state.emailId, this.state.password)
         },
         {
            title: 'Login',
            onPress: () => this.login(this.state.emailId, this.state.password)
         }
      ]

      let userDetailsTextInputInfoList = [
         {
            onChangeText: (text) => {
               this.setState({
                  userDetails: {
                     ...this.state.userDetails,
                     firstName: text
                  }
               })
            },
            placeholder: 'First Name'
         },
         {
            onChangeText: (text) => {
               this.setState({
                  userDetails: {
                     ...this.state.userDetails,
                     lastName: text
                  }
               })
            },
            placeholder: 'Last Name'
         },
         {
            onChangeText: (text) => {
               this.setState({
                  userDetails: {
                     ...this.state.userDetails,
                     address: text
                  }
               })
            },
            placeholder: 'Address'
         },
         {
            onChangeText: (text) => {
               this.setState({
                  userDetails: {
                     ...this.state.userDetails,
                     mobileNo: text
                  }
               })
            },
            placeholder: 'Mobile No.'
         }
      ]

      let modalButtonInfoList = [
         {
            title: 'Submit',
            onPress: () => this.saveUserDetails()
         },
         {
            title: 'Cancel',
            onPress: () => this.setState({
               modalVisible: false
            })
         }
      ]

      return (
         <View>
            <AppHeader title='Book Santa' />
            <Modal 
               visible={this.state.modalVisible}
               transparent={true}
               animationType="slide"
               onRequestClose={() => this.onModalClosed(this.state.userDetails)}
               style={styles(dimensions).modalBackground}
            >
               <View>
                  <View style={{alignItems: 'center'}}>
                     <Text style={styles(dimensions).modalText}>Enter details</Text>
                  </View>
                  {
                     userDetailsTextInputInfoList.map(detail => {
                        return (
                           <View style={styles(dimensions).modalTextInputContainer}>
                              <TextInput 
                                 onChangeText={detail.onChangeText}
                                 placeholder={detail.placeholder}
                                 style={styles(dimensions).modalTextInput}
                              />
                           </View>
                        )
                     })
                  }
                  {
                      modalButtonInfoList.map(button => 
                        <View style = {styles(dimensions).modalButtonContainer}>
                           <TouchableOpacity
                              style={styles(dimensions).button}
                              onPress={button.onPress}
                           >
                               <Text style={{fontSize: 20, color: 'white', fontWeight: '600'}}>{button.title}</Text>
                           </TouchableOpacity>
                        </View>
                     )
                  }
               </View>
            </Modal>
            <View>
               <View style={styles(dimensions).backgroundContainer}>
                  {
                     textInputInfoList.map(textInput =>
                        <View style={styles(dimensions).textInputContainer}>
                           <TextInput
                              style={styles(dimensions).textInput}
                              onChangeText={textInput.onChangeText}
                              placeholder={textInput.placeholder}
                           />
                        </View>
                     )
                  }
               </View>
               <View>
                  {
                     buttonInfoList.map(button => 
                        <View style = {styles(dimensions).buttonContainer}>
                           <TouchableOpacity
                              style={styles(dimensions).button}
                              onPress={button.onPress}
                           >
                               <Text style={{fontSize: 20, color: 'white', fontWeight: '600'}}>{button.title}</Text>
                           </TouchableOpacity>
                        </View>
                     )
                  }
               </View>
            </View>
         </View>
      );
   }

}

const styles = (dimensions) => StyleSheet.create({
   backgroundContainer: {
      paddingTop: (dimensions.height / 2) - ((dimensions.height / 10) / 2),
      paddingLeft: (dimensions.width / 2) - ((dimensions.width / 3) / 2)
   },
   textInputContainer: {
      paddingTop: 20
   },
   textInput: {
      width: dimensions.width / 3,
      height: dimensions.height / 15,
      borderWidth: 4,
      borderColor: 'black',
      borderRadius: (dimensions.height / 15) / 2,
      fontSize: 20,
      padding: 2,
   },
   buttonContainer: {
      paddingLeft: (dimensions.width / 2) - (100 / 2),
      paddingTop: 10
   },
   button: {
      width: 100,
      height: 40,
      backgroundColor: 'purple',
      borderRadius: 25,
      borderWidth: 4,
      borderColor: 'black',
      alignItems: 'center',
      justifyContent: 'center'
   },
   modalBackground: {
      width: dimensions.width / 2,
      paddingVertical: 20,
      backgroundColor: 'yellow',
      borderWidth: 5,
      borderColor: 'black',
      borderRadius: 10
   },
   modalText: {
      fontSize: 20,
      fontWeight: '600'
   },
   modalTextInputContainer: {
      paddingTop: 20,
      alignItems: 'center'
   },
   modalTextInput: {
      width: dimensions.width / 6,
      height: 40,
      borderWidth: 4,
      borderRadius: 20,
      fontSize: 20,
      padding: 4
   },
   modalButtonContainer: {
      paddingTop: 20,
      alignItems: 'center'
   }
});