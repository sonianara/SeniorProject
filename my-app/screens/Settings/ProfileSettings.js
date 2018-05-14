import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import SettingsList from 'react-native-settings-list';
import EditSettingsComponent from '../Settings/EditSettings';
import EditGenderComponent from '../Settings/EditGenderSettings';
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


  switchToEditText = (pageHeader, field) => {
    const { state, navigate } = this.props.navigation;
    navigate('EditSettings', {
      go_back_key: state.key,
      onNavigateBack: this.componentWillMount,
      pageHeader: pageHeader,
      fieldValue: field
    });
  }

  switchToEditGender = (pageHeader, field) => {
    const { state, navigate } = this.props.navigation;
    navigate('EditGenderSettings', {
      go_back_key: state.key,
      onNavigateBack: this.componentWillMount,
      pageHeader: pageHeader,
      fieldValue: field
    });
  }

  switchToEditPicker = (pageHeader, field) => {
    const { state, navigate } = this.props.navigation;
    navigate('EditSettingsPicker', {
      go_back_key: state.key,
      onNavigateBack: this.componentWillMount,
      pageHeader: pageHeader,
      fieldValue: field
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Profile Settings</Text>
        </View>
        <View style={styles.container}>
          <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
            <SettingsList.Header headerStyle={{ marginTop: 15 }} />
            <SettingsList.Item titleInfo={this.state.userBirthday} hasNavArrow={false} title='Birthday' />
            <SettingsList.Item titleInfo={this.state.userHometown} hasNavArrow={true} title='Hometown'
              onPress={() => this.switchToEditText('Hometown', this.state.userHometown)} />
            <SettingsList.Item titleInfo={this.state.userGender} hasNavArrow={true} title='Gender'
              onPress={() => this.switchToEditGender('Gender', this.state.userGender)} />
            <SettingsList.Item titleInfo={this.state.userInterestedGender} hasNavArrow={true} title='Interested In (Gender)'
              onPress={() => this.switchToEditGender('Interested Gender', this.state.userInterestedGender)} />
            <SettingsList.Item titleInfo={this.state.userInterestedAge} hasNavArrow={true} title='Interested In (Age)'
              onPress={() => this.switchToEditPicker('Interested Age', this.state.userInterestedAge)} />
            <SettingsList.Item titleInfo={this.state.userInterestedDistance} hasNavArrow={true} title='Interested In (Distance)'
              onPress={() => this.switchToEditPicker('Interested Distance', this.state.userInterestedDistance)} />
            <SettingsList.Item title='Filtered Words'
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
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    borderBottomWidth: 1,
    backgroundColor: '#f7f7f8',
    borderColor: '#c8c7cc'
  },
  headerText: {
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 16
  },
  // settingsList: {
  //   ,
  // }
});
