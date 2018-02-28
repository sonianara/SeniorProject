import * as React from 'react';
import { Alert, StyleSheet, ScrollView, Text, TouchableHighlight, View, Image } from 'react-native';
import Button from 'react-native-button';
import defaultImage from '../../resources/defaultUser.png'
import * as Constants from '../../resources/LoremIpsum.js';
import editIcon from '../../resources/editIcon.png';
import uploadIcon from '../../resources/uploadIcon.png';
import PropTypes from 'prop-types';

export default class ProfileScreen extends React.Component {
   constructor(props) {
      super(props);
   }

   uploadImage = () => {
     Alert.alert('Route to upload dialog');
   }

   editPage = () => {
     Alert.alert('Switch to edit mode');
   }

   render() {
      const loremIpsum = Constants.loremIpsum;

      return (
        <View style={{backgroundColor:'#EFEFF4', flex:1}}>
            <View style={{borderBottomWidth:1, backgroundColor: '#f7f7f8', borderColor:'#c8c7cc'}}>
	             <Text style={{alignSelf:'center', marginTop:50, marginBottom:10, fontWeight:'bold', fontSize: 16}}>
                  My Profile
                </Text>
	          </View>
            <View style={{borderBottomWidth:1, backgroundColor: '#fff', flexDirection:"row"}}>
               <TouchableHighlight onPress={this.uploadImage.bind(this)}>
                  <Image source={uploadIcon} style={{left:10, width: 40, height: 40}} />
               </TouchableHighlight>
               <TouchableHighlight onPress={this.editPage.bind(this)} >
                  <Image source={editIcon} style={{left:280, width: 40, height: 40}} />
               </TouchableHighlight>
	          </View>
	          <View style={styles.container} >
               <Image source={defaultImage} style={{width: 270, height: 270}} />
               <Text style={{ marginLeft:20, marginTop:10, marginBottom:10, fontSize:32}} >
                  John Appleseed, 21
               </Text>
               <ScrollView style={{width: "85%"}}>
                  <Text >{loremIpsum}</Text>
               </ScrollView>
            </View>
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