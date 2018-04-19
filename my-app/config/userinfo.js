import { AsyncStorage } from 'react-native';
import * as React from 'react';
import { Alert } from 'react-native';

export async function saveUser(user) {
  try {
    await AsyncStorage.setItem('userID', user.id);
    await AsyncStorage.setItem('userName', user.name);
    await AsyncStorage.setItem('userPicture', JSON.stringify(user.picture));
    await AsyncStorage.setItem('userBirthday', user.birthday ? user.birthday : " ",);
    await AsyncStorage.setItem('userGender', user.gender);
    await AsyncStorage.setItem('userHometown', user.hometown ? JSON.stringify(user.hometown) : " ",);
    await AsyncStorage.setItem('userEmail', user.email);
    Alert.alert("user id is: " + user.id);
  } catch (error) {
    Alert.alert("Error saving data" + error);
  }
}

export async function getUser() {
  try {
    Alert.alert("We are in getUser");
    return {
      "userID": await AsyncStorage.getItem('userID'),
      "name": await AsyncStorage.getItem('userName'),
      "picture": JSON.parse(await AsyncStorage.getItem('userPicture')),
      "birthday": await AsyncStorage.getItem('userBirthday'),
      "gender": await AsyncStorage.getItem('userGender'),
      "hometown": JSON.parse(await AsyncStorage.getItem('userHometown')),
      "email": await AsyncStorage.getItem('userEmail'),
    };
  } catch (error) {
    Alert.alert("Error retrieving data" + error);
  }
}

