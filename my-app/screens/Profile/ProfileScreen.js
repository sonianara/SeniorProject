import * as React from 'react';
import { Alert, StyleSheet, ScrollView, Text, TouchableHighlight, View, Image } from 'react-native';
import Button from 'react-native-button';
import defaultImage from '../../resources/defaultUser.png'
import * as Constants from '../../resources/LoremIpsum.js';
import editIcon from '../../resources/editIcon.png';
import uploadIcon from '../../resources/uploadIcon.png';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';


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
      const { state, navigate } = this.props.navigation;
      const userInfo = state.params.user;
      Alert.alert("Welcome " + userInfo.name + "!");
      const userPhoto = userInfo.picture;
      const userPhotoData = userPhoto.data;

      return (
        <View style={{backgroundColor:'#EFEFF4', flex:1}}>
            <View style={{borderBottomWidth:1, backgroundColor: '#f7f7f8', borderColor:'#c8c7cc'}}>
	            <Text style={{alignSelf:'center', marginTop:50, marginBottom:10, fontWeight:'bold', fontSize: 16}}>
                 My Profile
              </Text>
	          </View>
            <View style={{borderBottomWidth:1, flexDirection:"row", alignSelf:"flex-end"}}>
               <TouchableHighlight onPress={this.uploadImage.bind(this)}>
                  <Icon name="upload" type="material-community" size={35} />
               </TouchableHighlight>
               <Text>   </Text>
               <TouchableHighlight onPress={this.editPage.bind(this)} >
                  <Icon name="edit" type="entypo" size={35} />
               </TouchableHighlight>
	          </View>
	          <View style={styles.container} >
               <Image source={{uri: userPhotoData.url}} style={{width: 200, height: 200}} />
               <Text style={{ marginLeft:20, marginTop:10, marginBottom:10, fontSize:32}} >
                  {userInfo.name}
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
