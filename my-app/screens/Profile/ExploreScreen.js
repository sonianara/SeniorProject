import * as React from 'react';
import { Alert, StyleSheet, ScrollView, Text, TouchableHighlight, View, Image } from 'react-native';
import Button from 'react-native-button';
import defaultImage from '../../resources/defaultUser.png'
import * as Constants from '../../resources/LoremIpsum.js';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import ProfileCard from './ProfileCard.js';

export default class ExploreScreen extends React.Component {
   constructor(props) {
      super(props);
   }

   newMessage = () => {
     Alert.alert('Message this person!');
   }

   render() {
      const loremIpsum = Constants.loremIpsum;

      return (
        <View style={{backgroundColor:'#EFEFF4', flex:1}}>
          <ProfileCard style={{flex: 1}} />
          {/*
            <View style={{borderBottomWidth:1, backgroundColor: '#f7f7f8', borderColor:'#c8c7cc'}}>
	            <Text style={{alignSelf:'center', marginTop:50, marginBottom:10, fontWeight:'bold', fontSize: 16}}>
                 Explore
              </Text>
	          </View>
            <View style={{borderBottomWidth:1, backgroundColor: '#fff', flexDirection:"row", alignSelf:"flex-end"}}>
               <TouchableHighlight onPress={this.newMessage.bind(this)} >
                  <Icon name="chat" size={35} />
               </TouchableHighlight>
	          </View>
	          <View style={styles.container} >
               <Image source={defaultImage} style={{width: 270, height: 270}} />
               <Text style={{ marginLeft:20, marginTop:10, marginBottom:10, fontSize:32}} >
                  Stacey Smith, 27
               </Text>
               <ScrollView style={{width: "85%"}}>
                  <Text >{loremIpsum}</Text>
               </ScrollView>
            </View> */}
         </View>
      );
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
