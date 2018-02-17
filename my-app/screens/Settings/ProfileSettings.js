import React, {Component} from 'react';
import { StyleSheet, Text, View, Alert} from 'react-native';
import SettingsList from 'react-native-settings-list';

export default class ProfileSettingsComponent extends Component {
  
   constructor() {
      super();
      this.onValueChange = this.onValueChange.bind(this);
      this.state = {switchValue: false};
   }
   render() {
      var bgColor = '#DCE3F4';
      return (
         <View style={{backgroundColor:'#EFEFF4', flex:1}}>
            <View style={{borderBottomWidth:1, backgroundColor: '#f7f7f8', borderColor:'#c8c7cc'}}>
	       <Text style={{alignSelf:'center', marginTop:50, marginBottom:10, fontWeight:'bold', fontSize: 16}}>Profile Settings</Text>
	    </View>
	    <View style={{backgroundColor:'#EFEFF4', flex:1}}>
               <SettingsList borderColor='#c8c7cc' defaultItemSize={50}> 
                     <SettingsList.Header headerStyle={{marginTop:15}}/>
	          <SettingsList.Item titleInfo = '22' hasNavArrow={false} title='Age' 
			switchState={this.state.switchValue} switchOnValueChange={this.onValueChange}
			onPress={() => Alert.alert('Clicked Age')}/>
	          <SettingsList.Item titleInfo = 'Male' hasNavArrow={false} title='Gender' 
			switchState={this.state.switchValue} switchOnValueChange={this.onValueChange}/>
		  <SettingsList.Item titleInfo = 'Male, Female' hasNavArrow={false} title='Interested In' 
			switchState={this.state.switchValue} switchOnValueChange={this.onValueChange} />
		  <SettingsList.Item titleInfo = '25 miles' hasNavArrow={false} title='Distance' 
			switchState={this.state.switchValue} switchOnValueChange={this.onValueChange}/> 
		  <SettingsList.Item title = 'Filtered Words' 
			onPress={() => Alert.alert('Routing to FilteringWords page')}/>
               </SettingsList>
            </View>
        </View>
      );
   }

   onValueChange(value) {
      this.setState({switchValue: value});
   }
}
