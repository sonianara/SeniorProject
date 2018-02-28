import React, { Component } from 'react';
import { Tabs } from './config/routes.js';

export default class App extends React.Component {
  render() {
    return <Tabs />;
  }
}


/*
export default class App extends React.Component {
  render() {
    return (
	//<MessageList></MessageList>
      //<View style={styles.container}>
	<ProfileSettings></ProfileSettings>
        //<Text>Open up App.js to start working on your app!</Text>
        //<Text>Changes you make will automatically reload.</Text>
        //<Text>Shake your phone to open the developer menu.</Text>
      	//<Button></Button>
	//<MenuBar></MenuBar>
	//</View>
    );
  }
}*/

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
