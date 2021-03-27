import * as React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Header,Icon,Badge } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import database from'../config';

class AppHeader extends React.Component {

  constructor() {
    super();

    this.state = {
      unreadNotifications: 0
    }
  }

  componentDidMount() {
    this.fetchUnreadNotificationsFromFirebase();
  }
  
  fetchUnreadNotificationsFromFirebase = () => {
    database.collection('notifications').where('notificationStatus', '==', 'unread').onSnapshot(
      (snapshot) => {
        let notificationList = [];

        snapshot.docs.map(doc => {
          let data = doc.data();
          notificationList.push(data);
        })

        this.setState({
          unreadNotifications: notificationList.length
        })
      }
    )
  }

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
        rightComponent={
          this.props.notificationIconVisible ? <View>
            <Icon
              name='bell'
              type='font-awesome'
              color='black'
              onPress={() => this.props.navigation.navigate('Notifications')}
            />
            <View style={styles.badgeContainer}>
              <Badge value={this.state.unreadNotifications} badgeStyle={{backgroundColor: 'red'}}/>
            </View>
          </View>
          :
          <View>
            
          </View>
        }
        backgroundColor = "#eaf8fe"
      />
    );
  }
}

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute', 
    top: -4, 
    right: -4
  }
});

export default withNavigation(AppHeader);