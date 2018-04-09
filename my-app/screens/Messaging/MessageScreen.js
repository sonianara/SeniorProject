import React, {Component} from 'react';
import { StyleSheet, Text, View, Alert, Button} from 'react-native';
import SettingsList from 'react-native-settings-list';
import MessageStream from './MessageStream.js';
import config from '../../App.js';
import * as firebase from 'firebase';

/********* USE REACT-NATIVE-LIST-VIEW *************/
export default class MessageScreen extends Component {

   constructor() {
      super();
      this.onValueChange = this.onValueChange.bind(this);
      this.state = {switchValue: false};
   }

   render() {

      var bgColor = '#DCE3F4';
      const { state, navigate } = this.props.navigation;

      return (
         <View style={{backgroundColor:'#EFEFF4', flex:1}}>
            <View style={{borderBottomWidth:1, backgroundColor: '#f7f7f8', borderColor:'#c8c7cc'}}>
	             <Text style={{alignSelf:'center', marginTop:50, marginBottom:10, fontWeight:'bold', fontSize: 16}}>Messages</Text>
	          </View>
            <View>
              <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
                <SettingsList.Header headerStyle={{marginTop:15}}/>
	              <SettingsList.Item hasNavArrow={true} title='Jane Doe'
			             switchState={this.state.switchValue} switchOnValueChange={this.onValueChange}
			             onPress={() => navigate('MessageStream', { go_back_key: state.key })}/>
                <SettingsList.Item hasNavArrow={true} title='Lucy Lu'
			             switchState={this.state.switchValue} switchOnValueChange={this.onValueChange}
			             onPress={() => navigate('MessageStream', { go_back_key: state.key })}/>
                <SettingsList.Item hasNavArrow={true} title='Gretchen Wieners'
			             switchState={this.state.switchValue} switchOnValueChange={this.onValueChange}
			             onPress={() => navigate('MessageStream', { go_back_key: state.key })}/>
                <SettingsList.Item hasNavArrow={true} title='Rebecca Black'
			             switchState={this.state.switchValue} switchOnValueChange={this.onValueChange}
			             onPress={() => navigate('MessageStream', { go_back_key: state.key })}/>
              </SettingsList>
              <Button
                onPress={() => updateDB(1, 2, "Message Content")}
                title="Add Message"
              />
           </View>
        </View>
      );
   }

   onValueChange(value) {
      this.setState({switchValue: value});
   }
}

function updateDB(userID, fieldValue1, fieldValue2) {
   firebase.database().ref(userID).set({
     field1: fieldValue1,
     field2: fieldValue2,
   });
 }
