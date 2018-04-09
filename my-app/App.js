import React, { Component } from 'react';
import { AppRoot, Tabs } from './config/routes.js';
import * as firebase from 'firebase';

export const config = {
    apiKey: "AIzaSyCaV4VJHObOdUkmSdCFx4ExCF1abixhfbg",
    authDomain: "seniorproject-f58f9.firebaseapp.com",
    databaseURL: "https://seniorproject-f58f9.firebaseio.com",
    storageBucket: "seniorproject-f58f9.appspot.com"
  };

firebase.initializeApp(config);

export default class App extends React.Component {
  render() {
    return <AppRoot/>
  }
}
