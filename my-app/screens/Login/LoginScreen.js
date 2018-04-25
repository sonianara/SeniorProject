import * as React from 'react';
import { StyleSheet, Text, View, Image, Alert, TouchableHighlight, AsyncStorage } from 'react-native';
import facebookLogo from '../../resources/loginWithFacebook.png';
import appLogo from '../../resources/appLogo.png';
import Button from 'react-native-button';
import * as firebase from 'firebase';
import config from '../../App.js';
import ExploreScreen from '../../screens/Profile/ProfileScreen.js';
import { getUser, saveUser } from '../../config/userinfo.js';

const APP_ID = "413413412439784";

export default class LoginScreen extends React.Component {

  userExists = async (user) => {
    var db = firebase.database();
    return await db.ref('users').child('users/user ' + user.id).once('value', function (snapshot) {
      var exists = snapshot.val() !== null
      return exists;
    });
  }

  addUserToDatabase = (user) => {
    firebase.database().ref('users/user ' + user.id).update({
      "id": user.id,
      "name": user.name,
      "age": 21,
      "picture": user.picture,
      "birthday": user.birthday ? user.birthday : " ",
      "hometown": user.hometown ? user.hometown : " ",
      "gender": user.gender ? user.gender : " ",
      "email": user.email ? user.email : " "
    });
  }

  getUserFromDatabase = async (userId) => {
    var db = firebase.database();
    return await db.ref('users/user ' + userId).once('value').then(function(snapshot) {
      return snapshot.val();
    });
  }

  logIn = async () => {
    const { state, navigate } = this.props.navigation;
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      APP_ID,
      { permissions: ['public_profile', 'user_photos', 'user_birthday', 'user_hometown', 'email'] }
    );
    if (type === 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);

      firebase.auth().signInWithCredential(credential).catch((error) => {
        // Handle Errors here.
      });
      const fields = 'name,picture.width(200).height(200),birthday,hometown,gender,email';
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=${fields}`);
      const userInfo = await response.json();

      if ((await this.userExists(userInfo)) === false) { // If the user is new, register them
        saveUser(userInfo);
        this.addUserToDatabase(userInfo);

      } else { // If the user has already logged in, grab their info from the database
        const dbInfo = await this.getUserFromDatabase(userInfo.id);
        Alert.alert("User from db: " + JSON.stringify(dbInfo));
        saveUser(dbInfo);
      }
      
      navigate('ProfileScreen', { go_back_key: state.key });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={{ width: "80%", height: "10%" }} source={appLogo} />
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
