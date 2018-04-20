import { AsyncStorage } from 'react-native';
import * as React from 'react';
import { Alert } from 'react-native';


export async function saveUser(user) {
  try {
    AsyncStorage.setItem('user', JSON.stringify(user), () => {
      console.log("User was saved");
    });
  } catch (error) {
    console.log("Error saving user data" + error);
  }
}

export function getUser() {
  try {
    return AsyncStorage.getItem('user', (err, result) => {
      // Alert.alert("in getUser and result is : " + result);
      result;
    });
  } catch (error) {
    Alert.alert("Error retrieving data" + error);
  }
}

