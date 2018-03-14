import * as React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Alert, TouchableHighlight } from 'react-native';
import facebookLogo from '../../resources/loginWithFacebook.png';
import appLogo from '../../resources/appLogo.png';
import Button from 'react-native-button';

import ExploreScreen from '../../screens/Profile/ProfileScreen.js';

const APP_ID = "413413412439784";

export default class LoginScreen extends React.Component {
   constructor(props) {
      super(props);
   }

   logIn = async () => {
     const { state, navigate } = this.props.navigation;
     const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(APP_ID, {
         permissions: ['public_profile', 'user_photos'],
       });
     if (type === 'success') {
       const fields = 'name,picture';
       const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=${fields}`);
       const userInfo = await response.json();
       navigate('ProfileScreen', { go_back_key: state.key, user: userInfo });
     }
   }

   render() {
      return (
         <View style={styles.container}>
            <Image style={{width: "80%", height: "10%"}} source={appLogo}/>
            <TouchableHighlight onPress={this.logIn.bind(this)}>
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