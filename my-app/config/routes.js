import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

//import Feed from '../screens/Feed';
//import Me from '../screens/Me';

import AccountSettings from '../screens/Settings/AccountSettings.js';
import ProfileSettings from '../screens/Settings/ProfileSettings.js';
import MessageList from '../components/Message/MessageList.js';
import ProfileScreen from '../screens/Profile/ProfileScreen.js';
import MainSettings from '../screens/Settings/MainSettings.js';
import Login from '../screens/Login/LoginScreen.js'

export const Tabs = TabNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      tabBarLabel: 'Login',
      tabBarIcon: ({ tintColor }) => <Icon name="book" size={35} color={tintColor} />
    },
  },
  MainSettings: {
    screen: MainSettings,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => <Icon name="settings" size={35} color={tintColor} />
    },
  },
  ProfileSettings: {
    screen: ProfileSettings,
    navigationOptions: {
      tabBarLabel: 'P Settings',
      tabBarIcon: ({ tintColor }) => <Icon name="person" size={35} color={tintColor} />
    },
  },
  AccountSettings: {
    screen: AccountSettings,
    navigationOptions: {
      tabBarLabel: 'A Settings',
      tabBarIcon: ({ tintColor }) => <Icon name="person" size={35} color={tintColor} />
    },
  },
  ProfileScreen: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
    },
  },
  MessageList: {
    screen: MessageList,
    navigationOptions: {
      tabBarLabel: 'Messages',
      tabBarIcon: ({ tintColor }) => <Icon name="message" size={35} color={tintColor} />
    },
  },
});
