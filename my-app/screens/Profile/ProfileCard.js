'use strict';

import * as React from 'react';
import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import * as firebase from 'firebase';
import Card from './Card.js';
import NoMoreCards from './NoMoreCards.js';
import { getUser, getMatch, saveMatch } from '../../config/userinfo.js';
import DatabaseConnections from '../../backend/DatabaseConnections.js';



export default class ProfileCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: this.props.cards,
      outOfCards: false
    }
    this.db = new DatabaseConnections();
  }

  componentWillMount = () => {
    let arr = [];
    const user = getUser().then((user) => {
      var userInfo = JSON.parse(user);
      console.log(`user info is ` + JSON.stringify(userInfo));
      this.db.getYesFromDatabase(user).then((yesArr) => {
        this.db.getUsersFromDatabase(user).then((jsonObj) => {
          console.log('users are ' + JSON.stringify(jsonObj));
          console.log('MY ID IS ' + userInfo.id);
          for (let val in jsonObj) {
            if ((val != ("user " + userInfo["id"]))) {
              // && (yesArr !== undefined) && (yesArr.length > 0) &&
              //   (yesArr.indexOf(val) < 0)
              if (yesArr == null || ((yesArr.length > 0) && (yesArr.indexOf(val) < 0))) {
                arr.push(jsonObj[val]);
              }
            }
          }
          console.log(`arr is ${arr}`);
          this.setState({ cards: arr, })
        });
      });
    })
  }

  handleYup = (card) => {
    const user = getUser().then((user) => {
      const userInfo = JSON.parse(user);
      const updatedJSON = { ["user " + card.id]: "yes",};
      firebase.database().ref('matches/user ' + userInfo.id).update(updatedJSON);

      //check if it was a match
      const rootRef = firebase.database().ref();
      const childRef = rootRef.child('matches/user ' + card.id+'/user ' + userInfo.id);
      childRef.once('value', function (snapshot) {
        if (snapshot.val() === "yes") {
          Alert.alert("Match!")
        }
      });
    });
  }

  handleNope = (card) => {
    const user = getUser().then((user) => {
      const userInfo = JSON.parse(user);
      const updatedJSON = { ["user " + card.id]: "no",};
      firebase.database().ref('matches/user ' + userInfo.id).update(updatedJSON);
    });
  }

  cardRemoved (index) {
    console.log(`The index is ${index}`);

    let CARD_REFRESH_LIMIT = 3

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);

      if (!this.state.outOfCards) {
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
