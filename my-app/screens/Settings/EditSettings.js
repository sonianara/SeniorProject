import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Prompt from 'rn-prompt';
import SettingsList from 'react-native-settings-list';
import { Header } from 'react-native-elements';
import * as firebase from 'firebase';
import { getUser, saveUser, updateUserFields } from '../../config/userinfo.js';

export default class EditSettingsComponent extends Component {
  constructor(props) {
    super(props);
    const { state, navigate } = this.props.navigation;
    this.state = {
      userID: "0",
      userName: "New User",
      category: state.params.pageHeader,
      inputText: state.params.fieldValue,
      promptVisible: false
    };
  }

  componentWillMount = async () => {
    const user = await getUser();
    const userInfo = JSON.parse(user);
    this.setState({
      userID: userInfo.id,
      userName: userInfo.name,
    });
  }

  handleEdit = (newValue) => {
    let cat = this.state.category;
    cat = cat.toLowerCase();
    const updatedJSON = { [cat]: newValue, };
    firebase.database().ref('users/user ' + this.state.userID).update(updatedJSON);
    updateUserFields(updatedJSON);
    this.setState({ inputText: newValue, promptVisible: false });
  }

  render() {
    var bgColor = '#DCE3F4';

    const { state, navigate } = this.props.navigation;
    const pageHeader = state.params.pageHeader;
    const field = state.params.fieldValue;

    return (
      <View style={{ backgroundColor: '#EFEFF4', flex: 1 }}>
        <View style={{ borderBottomWidth: 1, backgroundColor: '#f7f7f8', borderColor: '#c8c7cc' }}>
          <Text style={{ alignSelf: 'center', marginTop: 50, marginBottom: 10, fontWeight: 'bold', fontSize: 16 }}>
            Edit {pageHeader}
          </Text>
        </View>
        <View style={{ backgroundColor: '#EFEFF4', flex: 1 }}>
          <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
            <SettingsList.Header headerStyle={{ marginTop: 15 }} />
            <SettingsList.Item titleInfo={this.state.inputText} hasNavArrow={false} title={pageHeader}
              onPress={() => this.setState({ promptVisible: true })} />
          </SettingsList>
        </View>
        <Prompt
          title={"Enter New Value for " + pageHeader + ":"}
          placeholder={field}
          defaultValue={field}
          visible={this.state.promptVisible}
          onCancel={() => this.setState({ promptVisible: false })}
          onSubmit={(value) => this.handleEdit(value)} />
      </View>
    );
  }
}
