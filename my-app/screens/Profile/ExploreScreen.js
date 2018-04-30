import * as React from 'react';
import { Alert, StyleSheet, ScrollView, Text, TouchableHighlight, View, Image } from 'react-native';
import Button from 'react-native-button';
import defaultImage from '../../resources/defaultUser.png'
import * as Constants from '../../resources/LoremIpsum.js';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import ProfileCard from './ProfileCard.js';
import { getUser, getMatch, saveMatch } from '../../config/userinfo.js';

export default class ExploreScreen extends React.Component {
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

      return (
        <View style={{backgroundColor:'#EFEFF4', flex:1}}>
          <ProfileCard style={{flex: 1}} />
          {/*
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
              <Image source={{uri: this.state.matchPicture}} style={styles.profilePicture} />
              <Text style={{ marginLeft: 20, marginTop: 10, marginBottom: 10, fontSize: 32 }} >
                {this.state.matchName + ", " + this.state.matchAge}
              </Text>
              <Text style={{ marginLeft: 20, marginTop: 10, marginBottom: 10, fontSize: 22 }} >
                {this.state.matchLocation}
              </Text>
              <ScrollView style={{ width: "85%" }}>
                <Text >{this.state.matchDescription}</Text>
              </ScrollView>
            </View>
          </View> */}
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
  profilePicture: {
    width: 300,
    height: 300,
    marginTop:20,
  },
});
