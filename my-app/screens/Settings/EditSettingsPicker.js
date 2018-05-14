import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, Slider } from 'react-native';
import Prompt from 'rn-prompt';
import SettingsList from 'react-native-settings-list';
import { Header } from 'react-native-elements';
import * as firebase from 'firebase';
import { getUser, saveUser, updateUserFields } from '../../config/userinfo.js';

export default class EditPickerComponent extends Component {
  constructor(props) {
    super(props);
    const { state, navigate } = this.props.navigation;
    const range = (state.params.fieldValue).split('-');
    this.state = {
      userID: "0",
      userName: "New User",
      category: state.params.pageHeader,
      inputText: state.params.fieldValue,
      inputMin: range[0],
      inputMax: (range.length > 0 ? range[1] : range[0]),
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
    this.props.navigation.state.params.onNavigateBack();
  }

  updateValue = () => {
    this.handleEdit(this.state.inputMin + "-" + this.state.inputMax);
  }

  changeMin = (value) => {
    this.setState({ inputMin: String(value), });
  }

  changeMax = (value) => {
    this.setState({ inputMax: String(value), });
  }

  render() {
    const pageHeader = this.props.navigation.state.params.pageHeader;
    const maxValue = pageHeader === 'Interested Age' ? 50 : 200;
    const minValue = pageHeader === 'Interested Age' ? 18 : 0;
    const step = pageHeader === 'Interested Age' ? 1 : 10;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text}>Edit {pageHeader}</Text>
        </View>
        <View style={styles.settingsList}>
          <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
            <SettingsList.Header headerStyle={{ marginTop: 15 }} />
            <SettingsList.Item titleInfo={this.state.inputMin} hasNavArrow={false} title={"Minimum " + pageHeader} />
            <Slider style={styles.slider}
              step={step} minimumValue={minValue} maximumValue={maxValue}
              minimumTrackTintColor='#B899FB' maximumTrackTintColor='#2E1367'
              onSlidingComplete={this.updateValue.bind(this)}
              onValueChange={this.changeMin.bind(this)} value={Number(this.state.inputMin)} />
            <SettingsList.Item titleInfo={this.state.inputMax} hasNavArrow={false} title={"Maximum " + pageHeader} />
            <Slider style={styles.slider}
              step={step} minimumValue={minValue} maximumValue={maxValue}
              minimumTrackTintColor='#B899FB' maximumTrackTintColor='#2E1367'
              onSlidingComplete={this.updateValue.bind(this)}
              onValueChange={this.changeMax.bind(this)} value={Number(this.state.inputMax)} />
          </SettingsList>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFEFF4',
    flex: 1,
  },
  header: {
    borderBottomWidth: 1,
    backgroundColor: '#f7f7f8',
    borderColor: '#c8c7cc',
  },
  text: {
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  settingsList: {
    backgroundColor: '#EFEFF4',
    flex: 1,
  },
  slider: {
    backgroundColor: '#EFEFF4',
  },
});
