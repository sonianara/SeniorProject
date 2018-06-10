import * as React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { Alert, StyleSheet, View, Text, Image } from 'react-native';
import { getUser, saveUser, updateUserFields } from '../../config/userinfo.js';
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export default class MessageStream extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      recieverName: "",
      recieverID: "",
      userID: "",
      userPic: "",
    };
  }

  componentDidMount() {
    getUser().then((user) => {
      const userInfo = JSON.parse(user);
      firebase.database().ref()
      .child('messages/user ' + userInfo.id + "/user " + this.props.navigation.state.params.recieverID)
      .once('value')
      .then((snapshot) => {
        this.setState({
          recieverName: this.props.navigation.state.params.recieverName,
          recieverID: this.props.navigation.state.params.recieverID,
          userID: userInfo.id,
          userPic: userInfo.picture,
          messages: snapshot.val() === null ? [] : snapshot.val(),
        });
      });
    });
  }

  onSend(messages) {
    this.setState((previousState) => {
      var messageObj = GiftedChat.append(previousState.messages, messages);
      this.state.messages.concat(previousState);
      var size = Object.keys(messageObj).length;
      var key = Object.keys(messageObj)[0];
      messageObj[key]["user"]["reciever"] = this.state.recieverName;
      messageObj[key]["user"]["_id"] = this.state.recieverID;
      messageObj[key]["user"]["avatar"] = this.state.userPic;
      firebase.database().ref('messages/user ' + this.state.userID + "/user " + this.state.recieverID).set(messageObj);
      firebase.database().ref('messages/user ' + this.state.recieverID + "/user " + this.state.userID).set(messageObj);

      return {
        messages: messageObj,
      };
    });
  }

  renderAvatar = (props) => {
    return(
      <Image source={{uri:this.state.userPic}}/>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{this.state.recieverName}</Text>
        </View>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          showAvatarForEveryMessage = {true}
          renderAvatar={() => this.renderAvatar()}
          user={{
            _id: this.state.recieverID,
          }}
        />
      </View>
    )
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
    borderColor: '#c8c7cc',
  },
  headerText: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    fontSize: 18,
  },
});
