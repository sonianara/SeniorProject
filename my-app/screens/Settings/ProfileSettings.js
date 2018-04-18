import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import SettingsList from 'react-native-settings-list';
import EditSettingsComponent from '../Settings/EditSettings';
import {UserInfo} from '../../config/userinfo.js';

export default class ProfileSettingsComponent extends Component {

  constructor() {
    super();
    this.onValueChange = this.onValueChange.bind(this);
    this.state = { switchValue: false };
  }

  switchToEdit = (pageHeader, field) => {
    const { state, navigate } = this.props.navigation;
    navigate('EditSettings', { go_back_key: state.key, pageHeader: pageHeader, fieldValue: field });
  }

  render() {
    var bgColor = '#DCE3F4';
    return (
      <View style={{ backgroundColor: '#EFEFF4', flex: 1 }}>
        <View style={{ borderBottomWidth: 1, backgroundColor: '#f7f7f8', borderColor: '#c8c7cc' }}>
          <Text style={{ alignSelf: 'center', marginTop: 50, marginBottom: 10, fontWeight: 'bold', fontSize: 16 }}>Profile Settings</Text>
        </View>
        <View style={{ backgroundColor: '#EFEFF4', flex: 1 }}>
          <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
            <SettingsList.Header headerStyle={{ marginTop: 15 }} />
            <SettingsList.Item titleInfo='22' hasNavArrow={true} title='Age'
              onPress={() => this.switchToEdit('Age', '22')} />
            <SettingsList.Item titleInfo='Male' hasNavArrow={true} title='Gender'
              onPress={() => this.switchToEdit('Gender', 'Male')} />
            <SettingsList.Item titleInfo='Male, Female' hasNavArrow={true} title='Interested In (Gender)'
              onPress={() => this.switchToEdit('Interested Gender', 'Male, Female')}  />
            <SettingsList.Item titleInfo='20-25' hasNavArrow={true} title='Interested In (Age)'
              onPress={() => this.switchToEdit('Interested Age', '20-25')}  />
            <SettingsList.Item titleInfo='25 miles' hasNavArrow={true} title='Distance'
              onPress={() => this.switchToEdit('Distance', '25 miles')}  />
            <SettingsList.Item title='Filtered Words'
              onPress={() => this.switchToEdit('Filtered Words', ' ')}  />
          </SettingsList>
        </View>
      </View>
    );
  }

  onValueChange(value) {
    this.setState({ switchValue: value });
  }
}
