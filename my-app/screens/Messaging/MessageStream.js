import * as React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

export default class MessageStream extends React.Component {
  state = {
    messages: [],
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Start Your Conversation Here',
          createdAt: new Date(),
          renderAvatar:null,
        },
      ],
    })
    this.printItem();
  }

  printItem = () => {
    console.log("printing user from before")
    console.log(this.props.navigation.state.params.reciever);
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
  }
}
