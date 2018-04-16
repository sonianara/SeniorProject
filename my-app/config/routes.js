import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import AccountSettings from '../screens/Settings/AccountSettings.js';
import ProfileSettings from '../screens/Settings/ProfileSettings.js';
import MessageScreen from '../screens/Messaging/MessageScreen.js';
import MessageStream from '../screens/Messaging/MessageStream.js';
import ProfileScreen from '../screens/Profile/ProfileScreen.js';
import ExploreScreen from '../screens/Profile/ExploreScreen.js';
import MainSettings from '../screens/Settings/MainSettings.js';
import LoginScreen from '../screens/Login/LoginScreen.js'

export const SettingsStack = StackNavigator({
  MainSettings: {
    screen: MainSettings
  },
  ProfileSettings: {
    screen: ProfileSettings
  },
  AccountSettings: {
    screen: AccountSettings
  },
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions:  {
      headerLeft: null // Do not show back button for login screen
    }
  }
});

export const MessageFeedStack = StackNavigator({
  MessageScreen: {
    screen: MessageScreen
  },
  MessageStream: {
    screen: MessageStream
  }
});

export const Tabs = TabNavigator({
  MainSettings: {
    screen: SettingsStack,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => <Icon name="settings" size={35} color={tintColor} />
    },
    initialRouteName: MainSettings,
  },
  ProfileScreen: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
    },
  },
  ExploreScreen: {
    screen: ExploreScreen,
    navigationOptions: {
      tabBarLabel: 'Explore',
      tabBarIcon: ({ tintColor }) => <Icon name="search" size={35} color={tintColor} />
    },
  },
  MessageScreen: {
    screen: MessageFeedStack,
    navigationOptions: {
      tabBarLabel: 'Messages',
      tabBarIcon: ({ tintColor }) => <Icon name="message" size={35} color={tintColor} />
    },
  },
  /*
  RegisterScreen: {
    screen: RegisterScreen,
    navigationOptions: {
      tabBarLabel: 'Register',
      tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
    },
  } */
});

export const AppRoot = StackNavigator({
  Login: {
    screen: LoginScreen
  },
  Home: {
    screen: Tabs
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});
