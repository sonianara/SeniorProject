import React, {Component} from 'react';
import { StyleSheet, Text, View, Alert} from 'react-native';
import SettingsList from 'react-native-settings-list';

export default class MessageStream extends Component {
  
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
	             <Text style={{alignSelf:'center', marginTop:50, marginBottom:10, fontWeight:'bold', fontSize: 16}}>
                    Conversation
                 </Text>
	          </View>
            <View style={{backgroundColor:'#EFEFF4', flex:1}}>
              <Text>Placeholder for message screen</Text>
           </View>
        </View>
      );
   }

   onValueChange(value) {
      this.setState({switchValue: value});
   }
}