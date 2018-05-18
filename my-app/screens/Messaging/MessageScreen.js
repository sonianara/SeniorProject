import React, {Component} from 'react';
import { StyleSheet, Text, View, Alert, Button, FlatList, Image, List, ScrollView, TouchableOpacity} from 'react-native';
import SettingsList from 'react-native-settings-list';
import Icon from 'react-native-vector-icons/FontAwesome';
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
      this.onPress = this.onPress.bind(this);
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
                  arr.push({ ["key"]: snapshot.val().id, ["pic"]: snapshot.val().picture, ["name"]: snapshot.val().name });
                  if (index === size) {
                    this.setState({ matches: arr });
                  }
                })
            }
            index++;
          }
        });
    });
  }

   onPress = (userID, userName) => {
     const { state, navigate } = this.props.navigation;
     navigate('MessageStream', {recieverID: userID, recieverName: userName})
   }


   renderBubble = ({item}) => {
     return (
       <View style={styles.column}>
         <TouchableOpacity
           onPress={() =>
             Alert.alert(
               'Choose an option',
               'Message or View Profile?',
              [
                {text: 'Send Message', onPress: () => this.onPress(item.key, item.name)},
                {text: 'View Profile', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              ],
            )}>
           <Image style={ styles.image } source={{ uri: item.pic}} />
         </TouchableOpacity>
         <Text>{item.name}</Text>
       </View>
     )
   };

/*
   renderBubble = ({item}) => {
     return (
       <View style={styles.column}>
         <TouchableOpacity
           onPress={() => this.onPress(item.key, item.name)}>
           <Image style={ styles.image } source={{ uri: item.pic}} />
         </TouchableOpacity>
         <Text>{item.name}</Text>
       </View>
     )
   }; */

   renderItem = ({item}) => {
     return (
       <View style={styles.row}>
         <TouchableOpacity
           onPress={() => this.onPress(item.key, item.name)}>
           <Text style={styles.sender}>{item.name}</Text>
           <Icon style={styles.arrowIcon} name="angle-right" size={24} color="#2A2B30" />
         </TouchableOpacity>
       </View>
     )
   };

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
              renderItem={this.renderBubble}
              horizontal={true}
            />
            <FlatList
              data={this.state.matches}
              renderItem={this.renderItem}
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
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom:0
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
 image: {
    height:128,
    width: 128,
    borderRadius: 64
  },
  column:{
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: 10,
  },
  row: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sender: {
    fontWeight: '200',
    paddingRight: 10,
    fontSize: 18,
  },
  arrowIcon: {
    position:'absolute',
    right:0
  }
})
