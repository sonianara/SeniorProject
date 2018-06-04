import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import SettingsList from 'react-native-settings-list';
import EditSettingsComponent from '../Settings/EditSettings';
import EditGenderComponent from '../Settings/EditGenderSettings';
import { getUser, saveUser } from '../../config/userinfo.js';
import { Actions } from 'react-native-router-flux';

export default class ProfileSettingsComponent extends React.Component {

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

  switchToEditText = (pageHeader, field) => {
    Actions.editSettings({
      onNavigateBack: this.componentWillMount,
      pageHeader: pageHeader,
      fieldValue: field
    });
  }

  switchToEditGender = (pageHeader, field) => {
    Actions.editGenderSettings({
      onNavigateBack: this.componentWillMount,
      pageHeader: pageHeader,
      fieldValue: field
    });
  }

  switchToEditPicker = (pageHeader, field) => {
    Actions.editSettings({
      onNavigateBack: this.componentWillMount,
      pageHeader: pageHeader,
      fieldValue: field
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Profile Settings</Text>
        </View>
        <View style={styles.container}>
          <SettingsList borderColor='#ded3f6' defaultItemSize={50}>
            <SettingsList.Header headerText='My Profile Properties' headerStyle={styles.itemDivider} />
            <SettingsList.Item titleStyle={styles.itemTextStyle} titleInfo={this.state.userBirthday} hasNavArrow={false} title='Birthday' />
            <SettingsList.Item titleStyle={styles.itemTextStyle} titleInfo={this.state.userHometown} hasNavArrow={true} title='Hometown'
              onPress={() => this.switchToEditText('Hometown', this.state.userHometown)} />
            <SettingsList.Item titleStyle={styles.itemTextStyle} titleInfo={this.state.userGender} hasNavArrow={true} title='Gender'
              onPress={() => this.switchToEditGender('Gender', this.state.userGender)} />
            <SettingsList.Item titleStyle={styles.itemTextStyle} title='Likes'
              onPress={() => this.switchToEditText('Likes', ' ')} />
            <SettingsList.Item titleStyle={styles.itemTextStyle} title='Dislikes'
              onPress={() => this.switchToEditText('Dislikes', ' ')} />
            <SettingsList.Header headerText='Match Properties' headerStyle={styles.itemDivider} />
            <SettingsList.Item titleStyle={styles.itemTextStyle} titleInfo={this.state.userInterestedGender} hasNavArrow={true} title='Interested In (Gender)'
              onPress={() => this.switchToEditGender('Interested Gender', this.state.userInterestedGender)} />
            <SettingsList.Item titleStyle={styles.itemTextStyle} titleInfo={this.state.userInterestedAge} hasNavArrow={true} title='Interested In (Age)'
              onPress={() => this.switchToEditPicker('Interested Age', this.state.userInterestedAge)} />
            <SettingsList.Item titleStyle={styles.itemTextStyle} titleInfo={this.state.userInterestedDistance} hasNavArrow={true} title='Interested In (Distance)'
              onPress={() => this.switchToEditPicker('Interested Distance', this.state.userInterestedDistance)} />
            <SettingsList.Item titleStyle={styles.itemTextStyle} title='Filtered Words'
              onPress={() => this.switchToEditText('Filtered Words', ' ')} />
          </SettingsList>
        </View>
      </View>
    );
  }
  onValueChange(value) {
    this.setState({ switchValue: value });
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ded3f6',
    flex: 1,
  },
  header: {
    borderBottomWidth: 1,
    backgroundColor: '#C1A9F6',
    borderColor: '#c8c7cc'
  },
  itemTextStyle: {
    color: '#5228b8',
  },
  itemDivider: {
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    backgroundColor: "#ded3f6",
    marginTop: 15,
  },
  headerText: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    fontSize: 18
  },
});
