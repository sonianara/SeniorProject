import React, {Component} from 'react';
import { StyleSheet, Text, View, Alert} from 'react-native';
import SettingsList from 'react-native-settings-list';

export default class ProfileSettingsComponent extends Component {
  constructor() {
     super();
     this.onValueChange = this.onValueChange.bind(this);
     this.state = {switchValue: false};
  }
