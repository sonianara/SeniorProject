import * as React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Button from 'react-native-button';
import SettingsList from 'react-native-settings-list';
import LoginScreen from '../Login/LoginScreen.js';
import MainSettings from '../Settings/MainSettings.js';
import Tabs from '../../config/routes';
import { getUser, saveUser } from '../../config/userinfo.js';
import { NavigationActions } from 'react-navigation';
import { Actions } from 'react-native-router-flux';

export default class AccountSettingsComponent extends React.Component {

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

  onValueChange(value) {
    this.setState({ switchValue: value });
  }

  render() {

    var bgColor = '#DCE3F4';

    return (
      <View style={styles.container}>
        <View>
          <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
            <SettingsList.Header headerStyle={{ marginTop: 5 }} />
            <SettingsList.Item titleStyle={styles.itemTextStyle} titleInfo={this.state.userName} hasNavArrow={false} title='Name' />
            <SettingsList.Item titleStyle={styles.itemTextStyle} titleInfo={this.state.userEmail} hasNavArrow={false} title='Email' />
          </SettingsList>
          <View>
            <Button onPress={() => Actions.loginScreen()} style={styles.logoutButton}>Logout</Button>
          </View>
        </View>
      </View>
    );
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
  headerText: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Avenir',
  },
  logoutButton: {
    color: "red",
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 16
  },
  itemTextStyle: {
    color: '#5228b8',
  },
});
