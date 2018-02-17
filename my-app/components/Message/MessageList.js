import React, {Component} from 'react';
import { StyleSheet, Text, View, Alert} from 'react-native';
import SettingsList from 'react-native-settings-list';


/********* USE REACT-NATIVE-LIST-VIEW *************/
export default class MessageListComponent extends Component {
  
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
	       <Text style={{alignSelf:'center', marginTop:50, marginBottom:10, fontWeight:'bold', fontSize: 16}}>Messages</Text>
	    </View>
	    <View style={{backgroundColor:'#EFEFF4', flex:1}}>
               <SettingsList borderColor='#c8c7cc' defaultItemSize={50}> 
                     <SettingsList.Header headerStyle={{marginTop:15}}/>
	          <SettingsList.Item titleInfo = 'John Appleseed' hasNavArrow={false} title='Name' 
			switchState={this.state.switchValue} switchOnValueChange={this.onValueChange}
			onPress={() => Alert.alert('Clicked Name')}/>
	          <SettingsList.Item titleInfo = 'johnappleseed@gmail.com' hasNavArrow={false} title='Email' 
			switchState={this.state.switchValue} switchOnValueChange={this.onValueChange}/>
		  <SettingsList.Item titleInfo = 'john_appleseed' hasNavArrow={false} title='Username' 
			switchState={this.state.switchValue} switchOnValueChange={this.onValueChange} />
		  <SettingsList.Item titleInfo = '********' hasNavArrow={false} title='Password' 
			switchState={this.state.switchValue} switchOnValueChange={this.onValueChange}/> 
               </SettingsList>
            </View>
        </View>
      );
   }

   onValueChange(value) {
      this.setState({switchValue: value});
   }
}
