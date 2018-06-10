'use strict';

import * as React from 'react';
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
        <View style={{ borderBottomWidth: 1, backgroundColor: '#fff', flexDirection: "row", alignSelf: "flex-end" }}>
        </View>
        <View style={styles.container}>
          <View style={styles.basicInfo}>
            <Text style={styles.nameHeader}>{this.props.name + ", " + this.props.age}</Text>
            <Image source={{ uri: this.props.picture }} style={styles.profilePicture} />
            <Text style={styles.locationHeader}>{this.props.hometown}</Text>
          </View>
          <ScrollView style={styles.scrollbox}>
            <Text style={styles.descriptionBox}>{this.props.description}</Text>
          </ScrollView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ded3f6',
    alignItems: 'center',
  },
  textStyle: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 22,
    alignItems: 'center',
  },
  card: {
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    borderWidth: 0,
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
    marginTop: 10,
    alignItems: 'center',
  },
  basicInfo: {
    width: "100%",
    backgroundColor: '#ded3f6',
    alignItems: 'center',
    borderBottomWidth: 4,
    borderBottomColor: '#f47373',
  },
  nameHeader: {
    marginTop: 10,
    fontSize: 26,
    fontFamily: 'Avenir',
  },
  locationHeader: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    fontFamily: 'Avenir',
  },
  scrollbox: {
    width: "85%",
  },
  descriptionBox: {
    marginTop: 10,
    fontSize: 20,
    fontFamily: 'Gill Sans',
  },
})
