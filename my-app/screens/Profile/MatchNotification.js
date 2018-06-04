import * as React from 'react';
import { StyleSheet, Text, View, Alert, Button, FlatList, Image, List, ScrollView, TouchableOpacity} from 'react-native';
import SettingsList from 'react-native-settings-list';
import Icon from 'react-native-vector-icons/FontAwesome';
import MessageStream from './MessageStream.js';
import config from '../../App.js';
import * as firebase from 'firebase';
import { getUser, getMatch, saveMatch } from '../../config/userinfo.js';
import DatabaseConnections from '../../backend/DatabaseConnections.js';

export default class MatchNotification extends React.Component {

   constructor() {
      super();
      this.state = {
        switchValue: false,

      };
      this.db = new DatabaseConnections();
      this.onPress = this.onPress.bind(this);
   }

   render() {
      var bgColor = '#DCE3F4';

      return (
         <View style={styles.container}>
            <View style={styles.header}>
	             <Text style={styles.headerText}>You guys matched!</Text>
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
   fontSize: 30
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
