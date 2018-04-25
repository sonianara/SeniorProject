import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import SettingsList from 'react-native-settings-list';
import EditSettingsComponent from '../Settings/EditSettings';
import { getUser, saveUser } from '../../config/userinfo.js';

export default class ProfileSettingsComponent extends Component {

  constructor() {
    super();
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {
      userID: "0",
      userName: "New User",
      switchValue: false,
      userBirthday: "10/15/1994",
      userHometown: "Chicago, IL",
      userGender: "Male",
    };
  }

  componentWillMount = async () => {
    const user = await getUser();
    const userInfo = JSON.parse(user);
    this.setState({
      userID: userInfo.id,
      userName: userInfo.name,
      userBirthday: userInfo.birthday,
      userHometown: userInfo.hometown.name,
      userGender: userInfo.gender,
    }
    );
  }

  switchToEdit = (pageHeader, field) => {
    const { state, navigate } = this.props.navigation;
    navigate('EditSettings', {
      go_back_key: state.key,
      onNavigateBack: this.componentWillMount,
      pageHeader: pageHeader,
      fieldValue: field
    });
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
            <SettingsList.Item titleInfo={this.state.userBirthday} hasNavArrow={false} title='Birthday' />
            <SettingsList.Item titleInfo={this.state.userGender} hasNavArrow={true} title='Gender'
              onPress={() => this.switchToEdit('Gender', this.state.userGender)} />
            <SettingsList.Item titleInfo='Male, Female' hasNavArrow={true} title='Interested In (Gender)'
              onPress={() => this.switchToEdit('Interested Gender', 'Male, Female')} />
            <SettingsList.Item titleInfo='20-25' hasNavArrow={true} title='Interested In (Age)'
              onPress={() => this.switchToEdit('Interested Age', '20-25')} />
              <SettingsList.Item titleInfo={this.state.userHometown} hasNavArrow={true} title='Hometown'
              onPress={() => this.switchToEdit('Hometown', this.state.userHometown)} />
            <SettingsList.Item titleInfo='25 miles' hasNavArrow={true} title='Distance'
              onPress={() => this.switchToEdit('Distance', '25 miles')} />
            <SettingsList.Item title='Filtered Words'
              onPress={() => this.switchToEdit('Filtered Words', ' ')} />
          </SettingsList>
        </View>
      </View>
    );
  }

  onValueChange(value) {
    this.setState({ switchValue: value });
  }
}
