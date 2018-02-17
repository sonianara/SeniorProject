import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from './components/Button/Button.js';
import MenuBar from './components/NavigationBar/MenuBar.js';
import AccountSettings from './screens/Settings/AccountSettings.js';
import ProfileSettings from './screens/Settings/ProfileSettings.js';
import MessageList from './components/Message/MessageList.js';

import ProfileScreen from './screens/Profile/ProfileScreen';

export default class App extends React.Component {
  render() {
    return (
	<MessageList></MessageList>
      //<View style={styles.container}>
	//<ProfileSettings></ProfileSettings>
        //<Text>Open up App.js to start working on your app!</Text>
        //<Text>Changes you make will automatically reload.</Text>
        //<Text>Shake your phone to open the developer menu.</Text>
      	//<Button></Button>
	//<MenuBar></MenuBar>
	//</View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
