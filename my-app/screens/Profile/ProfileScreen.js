import * as React from 'react';
import { Alert, DatePickerIOS, StyleSheet, Picker, ScrollView, Slider, Text, TouchableOpacity, View, Image, AsyncStorage, Modal, TextInput } from 'react-native';
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
import * as Constants from '../../resources/LoremIpsum.js';
import editIcon from '../../resources/editIcon.png';
import uploadIcon from '../../resources/uploadIcon.png';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import { getUser, saveUser, updateUserFields } from '../../config/userinfo.js';
import * as firebase from 'firebase';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Dropdown } from 'react-native-material-dropdown';
import ModalDropdown from 'react-native-modal-dropdown';
import { Actions } from 'react-native-router-flux';

var moment = require('moment');

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 0,
      modalVisible: false,
      userName: "New User",
      birthday: new Date(),
      userPicture: "https://eliaslealblog.files.wordpress.com/2014/03/user-200.png",
      userLocation: "",
      gender: "Select Gender",
      userAge: "",
      interestedGender: "",
      interestedAge: [18, 100],
      interestedDistance: [0, 100],
      userDescription: "",
      showDatePicker: false
    };
  }

  newUser = () => {
    return this.props.newUser;
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible })
  }

  componentWillMount = async () => {
    const user = await getUser();
    const userInfo = JSON.parse(user);
    this.setState({
      userID: userInfo.id,
      userName: userInfo.name,
      userPicture: userInfo.picture,
      userLocation: userInfo.hometown,
      userAge: userInfo.age,
      userDescription: userInfo.description,
    });

    if (this.newUser() == true) {
      this.setModalVisible(true);
      this.setState({ modalVisible: true });
    } else {
      this.setState({ modalVisible: false });
    }
  }

  handleEdit = (newValue) => {
    const newObj = {
      id: this.state.userID,
      name: this.state.userName,
      birthday: this.state.birthday,
      hometown: this.state.userLocation,
      gender: this.state.gender,
      "interested age": "" + this.state.interestedAge[0] + "-" + this.state.interestedAge[1],
      "interested gender": this.state.interestedGender,
      "interested distance": this.state.interestedDistance[0] + "-" + this.state.interestedDistance[1],
      description: this.state.userDescription,
    };

    firebase.database().ref('users/user ' + this.state.userID).update(newObj);
    updateUserFields(newObj);
  }

  userExists = async (userID) => {
    var db = firebase.database();
    return await db.ref('users').child('users/user ' + userID).once('value', function (snapshot) {
      var exists = snapshot.val() !== null
      return exists;
    });
  }

  uploadImage = () => {
    Alert.alert('Route to upload dialog');
  }

  editPage = () => {
    Alert.alert('Switch to edit mode');
  }

  _showDateTimePicker = () => this.setState({ showDatePicker: true });

  _hideDateTimePicker = () => this.setState({ showDatePicker: false });

  _handleDatePicked = (date) => {
    this.setState({ birthday: date });
    this._hideDateTimePicker();
  };

  handleAgeSlider = (values) => {
    this.setState({
      interestedAge: values,
    });
  };

  handleDistanceSlider = (values) => {
    this.setState({
      interestedDistance: values,
    });
  };

  render() {
    let genders = [{
      value: 'Male',
    }, {
      value: 'Female',
    }, {
      value: 'Other',
    }];
    return (
      <View style={styles.container}>
        <View style={styles.modal}>
          {/*---------------------- REGISTRATION MODAL ---------------------->*/}
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => { alert("Modal has been closed"); }}>
            <View style={styles.registrationForm}>
              <View style={styles.regFields}>
                <Text style={styles.titleText}>New User Registration</Text>
                <View>
                  <Text style={styles.mainText}>Birthday</Text>
                  <View style={{ borderBottomWidth: 0.5 }}>
                    <TouchableOpacity
                      onPress={() => this.setState({ showDatePicker: !this.state.showDatePicker })}>
                      <Text style={{ fontSize: 16, color: 'grey' }}>{moment(this.state.birthday).format('MM/DD/YYYY')}</Text>
                    </TouchableOpacity>
                  </View>
                  <DateTimePicker
                    isVisible={this.state.showDatePicker}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                  />
                  <TextField
                    style={{ height: 40 }}
                    label="Hometown"
                    onChangeText={(text) => this.setState({ userLocation: text })}
                  />
                  <Dropdown
                    label='Gender'
                    data={genders}
                    onChangeText={(text) => this.setState({ gender: text })}
                  />
                  <Dropdown
                    label='Interested Gender'
                    data={genders}
                    onChangeText={(text) => this.setState({ interestedGender: text })}
                  />
                  <Text style={{ fontSize: 16, marginBottom: 25, marginTop: 20 }}>
                    {"Interested Age: " + this.state.interestedAge[0] + " - " + this.state.interestedAge[1]}
                  </Text>
                  <View style={styles.slider}>
                    <MultiSlider
                      values={[this.state.interestedAge[0], this.state.interestedAge[1]]}
                      sliderLength={325} containerStyle={{ height: 12 }}
                      onValuesChange={this.handleAgeSlider} min={18} max={100} step={1}
                    />
                  </View>
                  <Text style={{ fontSize: 16, marginBottom: 25, marginTop: 20 }}>
                    {"Interested Distance: " + this.state.interestedDistance[0] + " - " + this.state.interestedDistance[1] + " miles"}
                  </Text>
                  <View style={styles.slider}>
                    <MultiSlider
                      values={[this.state.interestedDistance[0], this.state.interestedDistance[1]]}
                      sliderLength={325} onValuesChange={this.handleDistanceSlider}
                      containerStyle={{ height: 12 }} min={0} max={100} step={1}
                    />
                  </View>
                  <TextField
                    style={{ height: 40 }}
                    label="Bio (Optional)"
                    onChangeText={(text) => this.setState({ userDescription: text })}
                  />
                </View>
                <TouchableOpacity
                  onPress={(value) => {
                    this.handleEdit(value);
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text style={styles.submitButton}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          {/*<----------------- END MODAL --------------->*/}
          <View style={styles.basicInfo}>
            <Text style={styles.nameHeader} >{this.state.userName + ", " + this.state.userAge}</Text>
            <Image source={{ uri: this.state.userPicture }} style={styles.profilePicture} />
            <Text style={styles.locationHeader} >{this.state.userLocation}</Text>
          </View>
          <ScrollView style={{ width: "85%", }}>
            <Text style={styles.descriptionBox}>{this.state.userDescription}</Text>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ded3f6',
  },
  mainText: {
    fontSize: 16,
    marginBottom: 10
  },
  modal: {
    backgroundColor: '#ded3f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registrationForm: {
    backgroundColor: '#ded3f6',
    width: '100%',
    height: '100%'
  },
  regFields: {
    marginTop: 100,
    marginLeft: 10
  },
  slider: {
    marginLeft: 17,
  },
  header: {
    borderBottomWidth: 1,
    backgroundColor: '#C1A9F6',
    borderColor: '#c8c7cc'
  },
  basicInfo: {
    width: "100%",
    backgroundColor: '#ded3f6',
    alignItems: 'center',
    borderBottomWidth: 4,
    borderBottomColor: '#f47373',
  },
  titleText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    marginBottom: 10,
  },
  headerText: {
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Avenir',
  },
  submitButton: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Avenir',
    color: '#1273de'
  },
  profilePicture: {
    width: 300,
    height: 300,
    marginTop: 10,
  },
  nameHeader: {
    marginTop: 10,
    fontSize: 26,
    fontFamily: 'Avenir',
  },
  locationHeader: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    fontFamily: 'Avenir',
  },
  descriptionBox: {
    marginTop: 10,
    fontSize: 20,
    fontFamily: 'Gill Sans',
  },
});
