import * as React from 'react';
import { StyleSheet, Text, View, Image, Alert, TouchableHighlight, AsyncStorage } from 'react-native';
import facebookLogo from '../../resources/loginWithFacebook.png';
import appLogo from '../../resources/appLogo.png';
import Button from 'react-native-button';
import * as firebase from 'firebase';
import config from '../../App.js';
import ExploreScreen from '../../screens/Profile/ProfileScreen.js';
import { getUser, saveUser } from '../../config/userinfo.js';
import DatabaseConnections from '../../backend/DatabaseConnections.js';

const APP_ID = "413413412439784";

export default class LoginScreen extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        modalVisible: false,
      };

      this.db = new DatabaseConnections();
   }

  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  userExists = async (user) => {
    var db = firebase.database();
    return await db.ref('users').once('value').then(function (snapshot) {
      if (snapshot.hasChild('user ' + user.id)) {
        return true;
      }
      return false;
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
      const newUser = true;
      const userExists = await this.userExists(userInfo);

      if (userExists == false) {
        this.db.addUserToDatabase(userInfo);
      }
      else {
        newUser = false;
        const dbInfo = await this.db.getUserFromDatabase(userInfo.id);
        saveUser(dbInfo);
      }
      navigate('ProfileScreen', { go_back_key: state.key, newUser: newUser });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={{ width: "80%", height: "18%" }} source={appLogo} />
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
    backgroundColor: '#C1A9F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
