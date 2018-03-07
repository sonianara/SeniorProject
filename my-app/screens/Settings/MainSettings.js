import React, {Component} from 'react';
import { StyleSheet, Text, View, Alert} from 'react-native';
import SettingsList from 'react-native-settings-list';

import AccountSettings from '../../screens/Settings/AccountSettings.js';
import ProfileSettings from '../../screens/Settings/ProfileSettings.js';

export default class MainSettingsComponent extends Component {

   constructor() {
      super();
      this.onValueChange = this.onValueChange.bind(this);
      this.state = {switchValue: false};
   }
   render() {

      const { state, navigate } = this.props.navigation;
      var bgColor = '#DCE3F4';

      return (
         <View style={{backgroundColor:'#EFEFF4', flex:1}}>
            <View style={{borderBottomWidth:1, backgroundColor: '#f7f7f8', borderColor:'#c8c7cc'}}>
	             <Text style={{alignSelf:'center', marginTop:50, marginBottom:10, fontWeight:'bold', fontSize: 16}}>Main Settings</Text>
	          </View>
	          <View>
              <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
                <SettingsList.Header headerStyle={{marginTop:15}}/>
	              <SettingsList.Item hasNavArrow={true} title='Profile Settings'
			             switchState={this.state.switchValue} switchOnValueChange={this.onValueChange}
			             onPress={() => navigate('ProfileSettings', { go_back_key: state.key })}/>
                <SettingsList.Item hasNavArrow={true} title='Account Settings'
			             switchState={this.state.switchValue} switchOnValueChange={this.onValueChange}
			             onPress={() => navigate('AccountSettings', { go_back_key: state.key })}/>
              </SettingsList>
           </View>
        </View>
      );
   }

   onValueChange(value) {
      this.setState({switchValue: value});
   }
}
