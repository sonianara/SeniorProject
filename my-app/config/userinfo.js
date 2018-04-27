import { AsyncStorage } from 'react-native';
import * as React from 'react';
import { Alert } from 'react-native';


export async function saveUser(user) {
  try {
    AsyncStorage.setItem('user', JSON.stringify(user), () => {
      console.log("User was saved");
    });
  } catch (error) {
    Alert.alert("User was not saved.")
    console.log("Error saving user data" + error);
  }
}

export async function updateUserFields(updatedFields) {
  try {
    AsyncStorage.mergeItem('user', JSON.stringify(updatedFields), () => {
      console.log("User was updated");
    });
  } catch (error) {
    console.log("Error updating user data" + error);
  }
}

export function getUser() {
  try {
    return AsyncStorage.getItem('user', (err, result) => {
      result;
    });
  } catch (error) {
    Alert.alert("Error retrieving data" + error);
  }
}
