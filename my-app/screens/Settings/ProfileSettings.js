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
      userInterestedAge: "21",
      userInterestedGender: "Female",
      userInterestedDistance: "25 miles",
    };
  }

  componentWillMount = async () => {
    const user = await getUser();
    const userInfo = JSON.parse(user);
    this.setState({
      userID: userInfo.id,
      userName: userInfo.name,
      userBirthday: userInfo.birthday,
      userHometown: userInfo.hometown,
      userGender: userInfo.gender,
      userInterestedAge: userInfo["interested age"],
      userInterestedGender: userInfo["interested gender"],
      userInterestedDistance: userInfo["interested distance"],
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
    var bgColor = '#fff';
    return (
      <View style={{ backgroundColor: bgColor, flex: 1 }}>
        <View style={{ borderBottomWidth: 1, backgroundColor: '#f7f7f8', borderColor: '#c8c7cc' }}>
          <Text style={{ alignSelf: 'center', marginTop: 50, marginBottom: 10, fontWeight: 'bold', fontSize: 16 }}>Profile Settings</Text>
        </View>
        <View style={{ backgroundColor: bgColor, flex: 1 }}>
          <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
            <SettingsList.Header headerStyle={{ marginTop: 15 }} />
            <SettingsList.Item titleInfo={this.state.userBirthday} hasNavArrow={false} title='Birthday' />
            <SettingsList.Item titleInfo={this.state.userGender} hasNavArrow={true} title='Gender'
              onPress={() => this.switchToEdit('Gender', this.state.userGender)} />
            <SettingsList.Item titleInfo={this.state.userInterestedGender} hasNavArrow={true} title='Interested In (Gender)'
              onPress={() => this.switchToEdit('Interested Gender', this.state.userInterestedGender)} />
            <SettingsList.Item titleInfo={this.state.userInterestedAge} hasNavArrow={true} title='Interested In (Age)'
              onPress={() => this.switchToEdit('Interested Age', this.state.userInterestedAge)} />
              <SettingsList.Item titleInfo={this.state.userHometown} hasNavArrow={true} title='Hometown'
              onPress={() => this.switchToEdit('Hometown', this.state.userHometown)} />
            <SettingsList.Item titleInfo={this.state.userInterestedDistance} hasNavArrow={true} title='Interested In (Distance)'
              onPress={() => this.switchToEdit('Interested Distance', this.state.userInterestedDistance)} />
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
