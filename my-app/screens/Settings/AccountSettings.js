import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Button from 'react-native-button';
import SettingsList from 'react-native-settings-list';
import LoginScreen from '../Login/LoginScreen.js';
import MainSettings from '../Settings/MainSettings.js';
import Tabs from '../../config/routes';
import { getUser, saveUser } from '../../config/userinfo.js';
import { NavigationActions } from 'react-navigation';

export default class AccountSettingsComponent extends Component {

  constructor() {
    super();
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {
      userID: "0",
      userEmail: "email@example.com",
      userName: "New User",
      switchValue: false,
     };
  }

  componentWillMount = async () => {
    const user = await getUser();
    const userInfo = JSON.parse(user);
    this.setState({
      userID: userInfo.id,
      userEmail: userInfo.email,
      userName: userInfo.name,
    }
    );
  }

  logout = () => {
    const { state, navigate } = this.props.navigation;
    navigate('LoginScreen');
  }

  onValueChange(value) {
    this.setState({ switchValue: value });
  }

  render() {

    const { state, navigate } = this.props.navigation;
    var bgColor = '#DCE3F4';

    return (
      <View style={{ backgroundColor: '#EFEFF4', flex: 1 }}>
        <View style={{ borderBottomWidth: 1, backgroundColor: '#f7f7f8', borderColor: '#c8c7cc' }}>
          <Text style={{ alignSelf: 'center', marginTop: 50, marginBottom: 10, fontWeight: 'bold', fontSize: 16 }}>Account Settings</Text>
        </View>
        <View>
          <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
            <SettingsList.Header headerStyle={{ marginTop: 5 }} />
            <SettingsList.Item titleInfo={this.state.userName} hasNavArrow={false} title='Name' />
            <SettingsList.Item titleInfo={this.state.userEmail} hasNavArrow={false} title='Email' />
            <View>
              <Button onPress={this.logout.bind(this)}
                style={{ color: "red", alignSelf: "center", marginTop: 50, fontWeight: "bold", fontSize: 16 }} >
                Logout
                     </Button>
            </View>
          </SettingsList>
        </View>
      </View>
    );
  }
}
