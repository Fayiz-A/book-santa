import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';
import AppHeader from './components/AppBar';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      dimensions: Dimensions.get('window')
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

  render() {
    console.log(`Dimensions: ${dimensions}`)
    let dimensions = this.state.dimensions;

    return (
      <View>
        <AppHeader title='Book Santa'/>
        <View>
          <View style={styles(dimensions).emailTextInputContainer}>
            <TextInput 
              style={styles(dimensions).textInput}
              onChangeText={(text) => console.log(text)}
              placeholder='Email'
            />
          </View>
          <View>
            <TextInput />
          </View>
        </View>
      </View>
    );
  }

}

const styles = (dimensions) => StyleSheet.create({
  emailTextInputContainer: {
    paddingTop: (dimensions.height / 2) - ((dimensions.height / 10) / 2),
    paddingLeft: (dimensions.width / 2) - ((dimensions.width / 3) /  2)
  },
  textInput: {
    width: dimensions.width / 3,
    height: dimensions.height / 15,
    borderWidth: 4,
    borderColor: 'black',
    borderRadius: 10
  }
});
