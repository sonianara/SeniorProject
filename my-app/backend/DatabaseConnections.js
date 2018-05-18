import * as React from 'react';
import * as firebase from 'firebase';
import { getUser, saveUser } from '../config/userinfo.js';
import { Alert } from 'react-native';

export default class DatabaseConnections extends React.Component {

  addUserToDatabase = (user) => {
    const newUser = {
      "id": user.id,
      "name": user.name,
      "age": 21,
      "picture": user.picture ? user.picture.data.url : " ",
      "birthday": user.birthday ? user.birthday : " ",
      "hometown": user.hometown ? user.hometown.name : " ",
      "gender": user.gender ? user.gender : " ",
      "email": user.email ? user.email : " ",
      "description": "Enter description here"
    }
    firebase.database().ref('users/user ' + user.id).update(newUser);
    saveUser(newUser);
  }

  getUserFromDatabase = (userId) => {
    var db = firebase.database();
    return db.ref('users/user ' + userId).once('value').then(function(snapshot) {
      return snapshot.val();
    });
  }

  getUsersFromDatabase = (user) => {
    const userInfo = JSON.parse(user)
    var db = firebase.database();
    return db.ref('users/')
      .orderByChild("interested age")
      .equalTo(userInfo["interested age"])
      .once('value')
      .then(function(snapshot) {
        return snapshot.val();
    });
  }

  getUserProfilePicture = (userId) => {
    firebase.database().ref('users/' + userId).once('value').then((snapshot) => {
      return snapshot.val().picture;
    });
  }

  getUserName = (userId) => {
    var rootRef = firebase.database().ref();
    rootRef.child('users/' + userId).once('value', (snapshot) => {
      return snapshot.val().name;
    });
  }

}
