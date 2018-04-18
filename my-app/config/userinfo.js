import {AsyncStorage } from 'react-native';
import * as React from 'react';

export default class UserInfo extends React.Component {

  saveUser = (value) => {
      try {
        AsyncStorage.setItem('userID', value).then()
      } catch (error) {
        console.log("Error saving data" + error);
      }
    }

  getUser = () => {
      try {
        const value = AsyncStorage.getItem('userID').then()
        return value;
        //this.setState({myKey: value});
      } catch (error) {
        console.log("Error retrieving data" + error);
      }
    }
}
