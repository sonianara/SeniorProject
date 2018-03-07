import React, {Component} from 'react';
import { StyleSheet, Text, View, Alert} from 'react-native';
import Button from 'react-native-button';
import SettingsList from 'react-native-settings-list';
import LoginScreen from '../Login/LoginScreen.js';

export default class AccountSettingsComponent extends Component {
  
   constructor() {
      super();
      this.onValueChange = this.onValueChange.bind(this);
      this.state = {switchValue: false};
   }

   logout = () => {
      const { state, navigate } = this.props.navigation;
      // Alert.alert('Log out');
      navigate('LoginScreen');
   }

   onValueChange(value) {
      this.setState({switchValue: value});
   }

   render() {

      const { state, navigate } = this.props.navigation;
      var bgColor = '#DCE3F4';

      return (
         <View style={{backgroundColor:'#EFEFF4', flex:1}}>
            <View style={{borderBottomWidth:1, backgroundColor: '#f7f7f8', borderColor:'#c8c7cc'}}>
	             <Text style={{alignSelf:'center', marginTop:50, marginBottom:10, fontWeight:'bold', fontSize: 16}}>Account Settings</Text>
	          </View>
	          <View>
               <SettingsList borderColor='#c8c7cc' defaultItemSize={50}> 
                  <SettingsList.Header headerStyle={{marginTop:5}}/>
	                <SettingsList.Item titleInfo = 'John Appleseed' hasNavArrow={false} title='Name' 
			              switchState={this.state.switchValue} switchOnValueChange={this.onValueChange}
			              onPress={() => Alert.alert('Clicked Name')}/>
	                <SettingsList.Item titleInfo = 'johnappleseed@gmail.com' hasNavArrow={false} title='Email' 
		                switchState={this.state.switchValue} switchOnValueChange={this.onValueChange}/>
		              <SettingsList.Item titleInfo = 'john_appleseed' hasNavArrow={false} title='Username' 
			              switchState={this.state.switchValue} switchOnValueChange={this.onValueChange} />
		              <SettingsList.Item titleInfo = '********' hasNavArrow={false} title='Password' 
			              switchState={this.state.switchValue} switchOnValueChange={this.onValueChange}/> 
                  <View>
                     <Button onPress={this.logout.bind(this)}
                            style={{color: "red", alignSelf:"center", marginTop:50, fontWeight: "bold", fontSize:16}} >
                       Logout
                     </Button>
                  </View>
               </SettingsList>
            </View>
        </View>
      );
   }
}
