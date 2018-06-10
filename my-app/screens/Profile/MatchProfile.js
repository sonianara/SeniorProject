import * as React from 'react';
import { Alert, DatePickerIOS, StyleSheet, Picker, ScrollView, Slider, Text, TouchableOpacity, View, Image, AsyncStorage, Modal, TextInput } from 'react-native';
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
import * as Constants from '../../resources/LoremIpsum.js';
import editIcon from '../../resources/editIcon.png';
import uploadIcon from '../../resources/uploadIcon.png';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import * as firebase from 'firebase';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Dropdown } from 'react-native-material-dropdown';
import ModalDropdown from 'react-native-modal-dropdown';
import DatabaseConnections from '../../backend/DatabaseConnections.js';

export default class MatchProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: 0,
      userName: "New User",
      userPicture: "https://eliaslealblog.files.wordpress.com/2014/03/user-200.png",
      userLocation: "",
      userAge: "",
      userDescription: "",
    };

    this.db = new DatabaseConnections();
  }

  componentWillMount = async () => {
    const id = this.props.navigation.state.params.userID;
    const userInfo = await this.db.getUserFromDatabase(id);
    this.setState({
      userID: userInfo.id,
      userName: userInfo.name,
      userPicture: userInfo.picture,
      userLocation: userInfo.hometown,
      userAge: userInfo.age,
      userDescription: userInfo.description,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.modal}>
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
  headerText: {
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Avenir',
  },
  submitButton: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Avenir'
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
