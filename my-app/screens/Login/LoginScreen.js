import * as React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Alert, TouchableHighlight } from 'react-native';
import facebookLogo from './loginWithFacebook.png';
import appLogo from './appLogo.png';
import Button from 'react-native-button';

export default class LoginScreen extends React.Component {
   constructor(props) {
      super(props);
   }

   handlePress() {
      Alert.alert("Clicked", "button clicked");
   }

   render() {
      return (
         <View style={styles.container}>
            <Image style={{width: "80%", height: "10%"}} source={appLogo}/>
            <TouchableHighlight onPress={this.handlePress.bind(this)}>
               <Image source={facebookLogo} resizeMode={"center"} />
           </TouchableHighlight>
         </View>
      );
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});