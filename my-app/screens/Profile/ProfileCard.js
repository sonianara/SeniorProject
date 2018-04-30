'use strict';

import React from 'react';
import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import * as firebase from 'firebase';
import Card from './Card.js';
import NoMoreCards from './NoMoreCards.js';
import { getUser, getMatch, saveMatch } from '../../config/userinfo.js';


export default class ProfileCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: this.props.cards,
      outOfCards: false
    }
  }

  getUsersFromDatabase = async () => {
    var db = firebase.database();
    return await db.ref('users/').once('value').then(function(snapshot) {
      return snapshot.val();
    });
  }

  componentWillMount = async () => {
    let arr = [];
    let jsonObj = await this.getUsersFromDatabase();
    for (let val in jsonObj) {
      arr.push(jsonObj[val]);
    }
    Alert.alert("First entry in arr of cards is " + JSON.stringify(arr[0]));
    // arr = JSON.stringify(arr);
    this.setState({ cards: arr, })
  }

  handleYup (card) {
    Alert.alert("yup")
  }

  handleNope (card) {
    Alert.alert("nope")
  }

  cardRemoved (index) {
    console.log(`The index is ${index}`);

    let CARD_REFRESH_LIMIT = 3

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);

      if (!this.state.outOfCards) {
        Alert.alert("Out of matches");
      }
    }
  }

  render() {
    return (
      <SwipeCards
        cards={this.state.cards}
        loop={false}

        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        showYup={true}
        showNope={true}

        handleYup={this.handleYup}
        handleNope={this.handleNope}
        cardRemoved={this.cardRemoved.bind(this)}
      />
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
  }
})
