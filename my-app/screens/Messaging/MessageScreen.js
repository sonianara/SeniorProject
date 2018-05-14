import React, {Component} from 'react';
import { StyleSheet, Text, View, Alert, Button, FlatList, List, ScrollView, TouchableHighlight} from 'react-native';
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
       var db = firebase.database();
       return db.ref('matches/user ' + userInfo["id"])
         .once('value')
         .then((snapshot) => {
           arr = [];
           for (var val in snapshot.val()) {
             if (snapshot.val()[val] === "yes") {
               const picId = this.db.getUserProfilePicture(val);
               const name = this.db.getUserName(val);
               console.log(val);
               console.log(picId);
               arr.push({["key"]:val, ["picId"]:picId, ["name"]:name});
             }
           }
           this.setState({matches:arr});
           console.log(arr);
         });
      });
   }

   onPress = (item) => {
     const { state, navigate } = this.props.navigation;
     navigate('MessageStream', {reciever: item.target.value})
   }

   renderItem = ({item}) => (
     <TouchableHighlight
        onPress={this.onPress.bind(item)}>
        <Text>{item.key}</Text>
     </TouchableHighlight>
   );

   /*<TouchableHighlight style={styles.imageContainer }>
     <Image style={ styles.image } source={{ uri: }} />
   </TouchableHighlight>*/

   render() {
      var bgColor = '#DCE3F4';

      return (
         <View style={{backgroundColor:'#EFEFF4', flex:1}}>
            <View style={{borderBottomWidth:1, backgroundColor: '#f7f7f8', borderColor:'#c8c7cc'}}>
	             <Text style={{alignSelf:'center', marginTop:50, marginBottom:10, fontWeight:'bold', fontSize: 16}}>Messages</Text>
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
  paddingTop: 22
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
