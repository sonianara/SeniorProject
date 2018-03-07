import * as React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Alert, TouchableHighlight } from 'react-native';
import facebookLogo from '../../resources/loginWithFacebook.png';
import appLogo from '../../resources/appLogo.png';
import Button from 'react-native-button';

import ExploreScreen from '../../screens/Profile/ExploreScreen.js';

export default class LoginScreen extends React.Component {
   constructor(props) {
      super(props);
   }

   loginWithFb = () => {
      const { state, navigate } = this.props.navigation;
      Alert.alert('Placeholder for steps to login with Facebook');
      navigate('ExploreScreen', { go_back_key: state.key });
   }

   render() {
      return (
         <View style={styles.container}>
            <Image style={{width: "80%", height: "10%"}} source={appLogo}/>
            <TouchableHighlight onPress={this.loginWithFb.bind(this)}>
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