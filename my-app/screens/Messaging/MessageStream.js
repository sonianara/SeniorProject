import * as React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { Alert, StyleSheet, View, Text, Image } from 'react-native';
import { getUser, saveUser, updateUserFields } from '../../config/userinfo.js';
import * as firebase from 'firebase';

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
      .child('messages/user ' + userInfo.id)
      .orderByChild("user/reciever")
      .equalTo(this.props.navigation.state.params.recieverName)
      .once('value')
      .then((snapshot) => {
        console.log("snapshot val: ", snapshot.val());
        console.log("user id ", userInfo.id);
        console.log("reciever name? ", this.props.navigation.state.params.recieverName);
        this.setState({
          recieverName: this.props.navigation.state.params.recieverName,
          recieverID: this.props.navigation.state.params.recieverID,
          userID: userInfo.id,
          userPic: userInfo.picture,
          messages: snapshot.val(),
        });
      });
    });
  }

  onSend(messages) {
    console.log("user picture url: " + this.state.userPic);
    this.setState((previousState) => {
      this.state.messages.concat(previousState);
      var messageObj = GiftedChat.append(previousState.messages, messages);
      var size = Object.keys(messageObj).length;
      var key = Object.keys(messageObj)[0];
      messageObj[key]["user"]["reciever"] = this.state.recieverName;
      messageObj[key]["user"]["_id"] = this.state.recieverID;
      messageObj[key]["user"]["avatar"] = this.state.userPic;
      firebase.database().ref('messages/user ' + this.state.userID).set(messageObj);

      return {
        messages: this.state.messages,
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
