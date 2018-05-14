import React, {Component} from 'react';
import { StyleSheet, Text, View, Alert, Button, FlatList, Image, List, ScrollView, TouchableHighlight} from 'react-native';
import SettingsList from 'react-native-settings-list';
import MessageStream from './MessageStream.js';
import config from '../../App.js';
import * as firebase from 'firebase';
import { getUser, getMatch, saveMatch } from '../../config/userinfo.js';
import DatabaseConnections from '../../backend/DatabaseConnections.js';

/********* USE REACT-NATIVE-LIST-VIEW *************/
export default class MessageScreen extends Component {

   constructor() {
      super();
      this.onValueChange = this.onValueChange.bind(this);
      this.state = {
        switchValue: false,
        matches: [],
        receiver: "",
      };
      this.db = new DatabaseConnections();
   }

   keyExtractor = (item, index) => index;

   componentDidMount() {
     this.getMatchesFromDatabase();
   }

   getMatchesFromDatabase = () => {
     const user = getUser().then((user) => {
       const userInfo = JSON.parse(user)
       var db = firebase.database().ref();
       db.child('matches/user ' + userInfo["id"])
         .once('value')
         .then((snapshot) => {
           var index = 0;
           arr = [];
           for (var val in snapshot.val()) {
             var size = Object.keys(snapshot.val()).length;
             if (snapshot.val()[val] === "yes" &&
               (val !== ("user " + userInfo["id"]))) {
               db.child('users/' + val).once('value')
               .then((snapshot) => {
                 arr.push({["key"]:val, ["pic"]:snapshot.val().picture, ["name"]:snapshot.val().name});
                 if (index === size) {
                   this.setState({matches:arr});
                 }
               })
             }
             index++;
           }
           console.log(arr);
         });
      });
   }

   onPress = (item) => {
     const { state, navigate } = this.props.navigation;
     navigate('MessageStream')
   }

   renderItem = ({item}) => (
     <TouchableHighlight style={styles.imageContainer }
       onPress={this.onPress}>
       <Image style={ styles.image } source={{ uri: item.pic}} />
     </TouchableHighlight>
   );

   render() {
      var bgColor = '#DCE3F4';

      return (
         <View style={styles.container}>
            <View style={styles.header}>
	             <Text style={styles.headerText}>Messages</Text>
	          </View>
            <View>
            <FlatList
              data={this.state.matches}
              renderItem={this.renderItem}
              horizontal={true}
            />
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
  flex: 1,
  backgroundColor: '#ded3f6',
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
 circleContainer: {
    height:128,
    width: 128,
    borderRadius: 64
  },
 item: {
   padding: 10,
   fontSize: 18,
   height: 44,
 },
 image: {
    height:128,
    width: 128,
    borderRadius: 64
  },
})
