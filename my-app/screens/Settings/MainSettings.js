import * as React from 'react';
import { StyleSheet, Text, View, Alert} from 'react-native';
import SettingsList from 'react-native-settings-list';
import AccountSettings from '../../screens/Settings/AccountSettings.js';
import ProfileSettings from '../../screens/Settings/ProfileSettings.js';
import { Actions } from 'react-native-router-flux';

export default class MainSettingsComponent extends React.Component {

   constructor() {
      super();
      this.onValueChange = this.onValueChange.bind(this);
      this.state = {switchValue: false};
   }

   render() {
      return (
         <View style={styles.container}>
	          <View>
              <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
                <SettingsList.Header headerStyle={{marginTop:15}}/>
	              <SettingsList.Item titleStyle={styles.itemTextStyle} hasNavArrow={true} title='Profile Settings'
			             switchState={this.state.switchValue} switchOnValueChange={this.onValueChange}
			             onPress={() => Actions.profileSettings()}/>
                <SettingsList.Item titleStyle={styles.itemTextStyle} hasNavArrow={true} title='Account Settings'
			             switchState={this.state.switchValue} switchOnValueChange={this.onValueChange}
			             onPress={() => Actions.accountSettings()}/>
              </SettingsList>
           </View>
        </View>
      );
   }

   onValueChange(value) {
      this.setState({switchValue: value});
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
    borderColor:'#c8c7cc'
  },
  headerText: {
    alignSelf:'center',
    marginTop: 10,
    marginBottom: 10,
    fontWeight:'bold',
    fontFamily: 'Avenir',
    fontSize: 18
  },
  itemTextStyle: {
    color: '#5228b8',
  },
});
