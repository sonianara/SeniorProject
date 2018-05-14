import * as React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { Alert, StyleSheet, View, Text } from 'react-native';
import { getUser, saveUser, updateUserFields } from '../../config/userinfo.js';
import * as firebase from 'firebase';

export default class MessageStream extends React.Component {
  state = {
    messages: [],
    reciever: "",
    userID: "",
  }

  componentDidMount() {
    getUser().then((user) => {
      console.log("lalalal");
      console.log("user: ", user);
      const userInfo = JSON.parse(user);
      this.setState({
        reciever: this.props.navigation.state.params.recieverName,
        userID: userInfo.name,
        messages: [
          {
            _id: 1,
            text: 'Start Your Conversation Here',
            createdAt: new Date(),
            renderAvatar:null,
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
        ],
      })
    });
  }

  printReciever = () => {
    console.log(this.state);
    console.log("reciever: " + this.state.reciever);
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
    firebase.database().ref('messages/user ' + this.state.userID).update(messages);
  }

  render() {
    console.log("rendering")
    this.printReciever();
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{this.state.reciever}</Text>
        </View>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
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
