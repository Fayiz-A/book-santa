import * as React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Header,Icon,Badge } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

class AppHeader extends React.Component {

  render() {
    return (
      <Header 
        leftComponent={
          <Icon 
            name='bars' 
            type='font-awesome' 
            color='#696969' 
            onPress={() => this.props.navigation.toggleDrawer()}
          />
        }
        centerComponent={{
          text: this.props.title,
          style: {
            fontSize: 20,
            color:'#90A5A9',
            fontWeight: 'bold'
          }
        }}
        backgroundColor = "#eaf8fe"
      />
    );
  }
}

export default withNavigation(AppHeader);