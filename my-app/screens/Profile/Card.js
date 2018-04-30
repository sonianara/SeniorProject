'use strict';

import React from 'react';
import { StyleSheet, Text, View, Image, Alert, ScrollView, TouchableHighlight } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import * as firebase from 'firebase';
import { Icon } from 'react-native-elements';
import Button from 'react-native-button';
import { getUser, getMatch, saveMatch } from '../../config/userinfo.js';


export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 0,
      matchID: 0,
      matchName: "New Match",
      matchPicture: "https://eliaslealblog.files.wordpress.com/2014/03/user-200.png",
      matchLocation: "",
      matchGender: "",
      matchAge: "",
      matchDescription: "",
    };
  }

  componentWillMount = async () => {
    Alert.alert("Card data is " + this.props.cardData);
    const currentUser = JSON.parse(await getUser());
    const matchInfo = JSON.parse(await getMatch());
    this.setState({
      userID: currentUser.id,
      matchID: matchInfo.id,
      matchName: matchInfo.name,
      matchPicture: matchInfo.picture,
      matchLocation: matchInfo.hometown,
      matchAge: matchInfo.age,
      matchDescription: matchInfo.description,
    });
  }

  newMessage = () => {
    const { userID, matchID } = this.state;
    Alert.alert('User ' + userID + ' matched with user ' + matchID);
  }

  render() {
    return (
      <View style={styles.card}>
        {/* <Image style={styles.thumbnail} source={{ uri: this.props.image }} />
        <Text style={styles.text}>This is card {this.props.name}</Text>
      </View> */}
        <View style={{ borderBottomWidth: 1, backgroundColor: '#fff', flexDirection: "row", alignSelf: "flex-end" }}>
        </View>
        <View style={styles.container}>
          <Image source={{ uri: this.state.matchPicture }} style={styles.profilePicture} />
          <Text style={styles.textStyle}>
            {this.state.matchName + ", " + this.state.matchAge}
          </Text>
          <Text style={styles.textStyle} >
            {this.state.matchLocation}
          </Text>
          <ScrollView style={{ width: "85%" }}>
            <Text >{this.state.matchDescription}</Text>
          </ScrollView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textStyle: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 22,
    alignItems: 'center',
  },
  card: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 10,
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1,
    elevation: 1,
    flex: 1,
    justifyContent: 'center',
  },
  thumbnail: {
    width: 300,
    height: 300,
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicture: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
})
