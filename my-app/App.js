import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Icon } from 'react-native-elements';
import { Router, Scene } from 'react-native-router-flux';
import { Text } from 'react-native';

import AccountSettings from './screens/Settings/AccountSettings.js';
import ProfileSettings from './screens/Settings/ProfileSettings.js';
import MessageScreen from './screens/Messaging/MessageScreen.js';
import MessageStream from './screens/Messaging/MessageStream.js';
import ProfileScreen from './screens/Profile/ProfileScreen.js';
import MatchProfile from './screens/Profile/MatchProfile';
import ExploreScreen from './screens/Profile/ExploreScreen.js';
import MainSettings from './screens/Settings/MainSettings.js';
import EditSettings from './screens/Settings/EditSettings.js';
import EditGenderSettings from './screens/Settings/EditGenderSettings.js';
import EditSettingsPicker from './screens/Settings/EditSettingsPicker.js';
import LoginScreen from './screens/Login/LoginScreen.js';

export const config = {
    apiKey: "AIzaSyCaV4VJHObOdUkmSdCFx4ExCF1abixhfbg",
    authDomain: "seniorproject-f58f9.firebaseapp.com",
    databaseURL: "https://seniorproject-f58f9.firebaseio.com",
    storageBucket: "seniorproject-f58f9.appspot.com"
  };

const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{color: selected ? 'red' :'black'}}>{title}</Text>
  );
}

firebase.initializeApp(config);

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar={true}>
        {/* Tab Container */}
        <Scene key="LoginScreen" component={LoginScreen} initial={true}>
          <Scene
            key="tabbar"
            tabs={true}
            tabBarStyle={{ backgroundColor: '#FFFFFF' }}
          >
              {/* Tab and it's scenes */}
              <Scene key="Settings" hideNavBar={true} title="Settings" icon={TabIcon}>
                <Scene
                  key="mainSettings"
                  component={MainSettings}
                  hideNavBar={false}
                />
                <Scene
                  key="editSettings"
                  component={EditSettings}
                  hideNavBar={false}
                  onBack={() => Actions.mainSettings()}
                />
                <Scene
                  key="profileSettings"
                  component={ProfileSettings}
                  hideNavBar={false}
                  onBack={() => Actions.mainSettings()}
                />
                <Scene
                  key="editGenderSettings"
                  component={EditGenderSettings}
                  hideNavBar={false}
                  onBack={() => Actions.profileSettings()}
                />
                <Scene
                  key="editSettingsPicker"
                  component={EditSettingsPicker}
                  hideNavBar={false}
                  onBack={() => Actions.editSettings()}
                />
                <Scene
                  key="accountSettings"
                  component={AccountSettings}
                  hideNavBar={false}
                  onBack={() => Actions.mainSettings()}
                />
              </Scene>

              {/* Tab and it's scenes */}
              <Scene key="ProfileScreen" component={ProfileScreen} hideNavBar={true} title="Profile" icon={TabIcon}>
                <Scene
                  key="profileScreen"
                  component={ProfileScreen}
                  hideNavBar={false}
                  onBack={() => Actions.editSettings()}
                />
              </Scene>

              {/* Tab and it's scenes */}
              <Scene key="Explore" hideNavBar={true} title="Explore" icon={TabIcon}>
                <Scene
                  key="explore"
                  component={ExploreScreen}
                  hideNavBar={false}
                />
              </Scene>

              {/* Tab and it's scenes */}
              <Scene key="Messages" hideNavBar={true} title="Messages" icon={TabIcon}>
                <Scene
                  key="messageScreen"
                  component={MessageScreen}
                  hideNavBar={false}
                />
                <Scene
                  key="messageStream"
                  component={MessageStream}
                  hideNavBar={false}
                  onBack={() => Actions.messageScreen()}
                />
                <Scene
                  key="matchProfile"
                  component={MatchProfile}
                  hideNavBar={false}
                  onBack={() => Actions.messageStream()}
                />
              </Scene>
            </Scene>
          </Scene>
        </Scene>
      </Router>
    );
  }
}
