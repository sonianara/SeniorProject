import * as React from 'react';
import { StyleSheet, Text, View, Alert, Slider } from 'react-native';
import Prompt from 'rn-prompt';
import SettingsList from 'react-native-settings-list';
import { Header } from 'react-native-elements';
import * as firebase from 'firebase';
import { getUser, saveUser, updateUserFields } from '../../config/userinfo.js';
import { Actions } from 'react-native-router-flux';

export default class EditPickerComponent extends React.Component {
  constructor(props) {
    super(props);
    const range = (this.props.fieldValue).split('-');
    this.state = {
      userID: "0",
      userName: "New User",
      category: this.props.pageHeader,
      inputText: this.props.fieldValue,
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
    this.props.onNavigateBack();
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
    const pageHeader = this.props.pageHeader;
    const maxValue = pageHeader === 'Interested Age' ? 50 : 200;
    const minValue = pageHeader === 'Interested Age' ? 18 : 0;
    const step = pageHeader === 'Interested Age' ? 1 : 10;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Edit {pageHeader}</Text>
        </View>
        <View style={styles.settingsList}>
          <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
            <SettingsList.Header headerStyle={{ marginTop: 15 }} />
            <SettingsList.Item titleStyle={styles.itemTextStyle} titleInfo={this.state.inputMin} hasNavArrow={false} title={"Minimum " + pageHeader} />
            <Slider style={styles.slider}
              step={step} minimumValue={minValue} maximumValue={maxValue}
              minimumTrackTintColor='#B899FB' maximumTrackTintColor='#2E1367'
              onSlidingComplete={this.updateValue.bind(this)}
              onValueChange={this.changeMin.bind(this)} value={Number(this.state.inputMin)} />
            <SettingsList.Item titleStyle={styles.itemTextStyle} titleInfo={this.state.inputMax} hasNavArrow={false} title={"Maximum " + pageHeader} />
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
    backgroundColor: '#ded3f6',
    flex: 1,
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
    fontSize: 18,
    fontFamily: 'Avenir',
  },
  settingsList: {
    backgroundColor: '#ded3f6',
    flex: 1,
  },
  itemTextStyle: {
    color: '#5228b8',
  },
  slider: {
    backgroundColor: '#EFEFF4',
  },
});
