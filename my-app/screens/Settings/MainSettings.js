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
      return (
         <View style={styles.container}>
            <View style={styles.header}>
	             <Text style={styles.headerText}>Main Settings</Text>
	          </View>
	          <View style={{flex: 1}}>
              <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
                <SettingsList.Header headerStyle={{marginTop:15}}/>
	              <SettingsList.Item titleStyle={styles.itemTextStyle} hasNavArrow={true} title='Profile Settings'
			             switchState={this.state.switchValue} switchOnValueChange={this.onValueChange}
			             onPress={() => navigate('ProfileSettings', { go_back_key: state.key })}/>
                <SettingsList.Item titleStyle={styles.itemTextStyle} hasNavArrow={true} title='Account Settings'
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
