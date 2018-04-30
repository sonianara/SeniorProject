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
    };
  }

  componentWillMount = async () => {
    const currentUser = JSON.parse(await getUser());
    this.setState({
      userID: currentUser.id,
    });
  }

  newMessage = () => {
    const { userID } = this.state;
    const matchId = this.props.id;
    Alert.alert('User ' + userID + ' matched with user ' + matchID);
  }

  render() {
    return (
      <View style={styles.card}>
        <View style={{ borderBottomWidth: 1, backgroundColor: '#f7f7f8', borderColor: '#c8c7cc' }}>
          <Text style={{ alignSelf: 'center', marginTop: 50, marginBottom: 10, fontWeight: 'bold', fontSize: 16 }}>
            Explore
        </Text>
        </View>
        <View style={{ borderBottomWidth: 1, backgroundColor: '#fff', flexDirection: "row", alignSelf: "flex-end" }}>
          <TouchableHighlight onPress={this.newMessage.bind(this)} >
            <Icon name="chat" size={35} />
          </TouchableHighlight>
        </View>
        <View style={styles.container}>
          <Image source={{ uri: this.props.picture }} style={styles.profilePicture} />
          <Text style={{ marginLeft: 20, marginTop: 10, marginBottom: 10, fontSize: 32 }} >
            {this.props.name + ", " + this.props.age}
          </Text>
          <Text style={{ marginLeft: 20, marginTop: 10, marginBottom: 10, fontSize: 22 }} >
            {this.props.hometown}
          </Text>
          <ScrollView style={{ width: "85%" }}>
            <Text >{this.props.description}</Text>
          </ScrollView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1,
    elevation: 1,
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
