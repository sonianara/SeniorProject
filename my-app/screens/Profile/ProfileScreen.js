import * as React from 'react';
import { Alert, StyleSheet, ScrollView, Text, TouchableHighlight, View, Image, AsyncStorage, Modal, TextInput } from 'react-native';
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
import * as Constants from '../../resources/LoremIpsum.js';
import editIcon from '../../resources/editIcon.png';
import uploadIcon from '../../resources/uploadIcon.png';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import { getUser, saveUser, updateUserFields } from '../../config/userinfo.js';
import * as firebase from 'firebase';

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 0,
      modalVisible: false,
      userName: "New User",
      birthday: "",
      userPicture: "https://eliaslealblog.files.wordpress.com/2014/03/user-200.png",
      userLocation: "",
      gender: "",
      userAge: "",
      interestedGender: "",
      interestedAge: "",
      interestedDistance: "",
      userDescription: "",
    };
  }

  newUser = () => {
    return this.props.navigation.state.params.newUser;
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
      "interested age": this.state.interestedAge,
      "interested gender": this.state.interestedGender,
      "interested distance": this.state.interestedDistance,
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>My Profile</Text>
        </View>
        {/* <View style={{ borderBottomWidth: 1, flexDirection: "row", alignSelf: "flex-end" }}>
          <TouchableHighlight onPress={this.uploadImage.bind(this)}>
            <Icon name="upload" type="material-community" size={35} />
          </TouchableHighlight>
        </View> */}
        <View style={styles.modal}>
          {/*---------------------- MODAL ---------------------->*/}
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => { alert("Modal has been closed"); }}>
            <View style={{
              marginTop: 100, marginLeft: 20,
              flex: 1,
            }}>
              <Text style={styles.titleText}>New User Registration</Text>
              <View>
                <TextField
                  style={{ height: 40 }}
                  label="Birthday"
                  onChangeText={(text) => this.setState({ birthday: text })}
                />
                <TextField
                  style={{ height: 40 }}
                  label="Hometown"
                  onChangeText={(text) => this.setState({ userLocation: text })}
                />
                <TextField
                  style={{ height: 40 }}
                  label="Gender"
                  onChangeText={(text) => this.setState({ gender: text })}
                />
                <TextField
                  style={{ height: 40 }}
                  label="Interested Age"
                  onChangeText={(text) => this.setState({ interestedAge: text })}
                />
                <TextField
                  style={{ height: 40 }}
                  label="Interested Gender"
                  onChangeText={(text) => this.setState({ interestedGender: text })}
                />
                <TextField
                  style={{ height: 40 }}
                  label="Interested Distance"
                  onChangeText={(text) => this.setState({ interestedDistance: text })}
                />
                <TextField
                  style={{ height: 40 }}
                  label="Bio (Optional)"
                  onChangeText={(text) => this.setState({ userDescription: text })}
                />
              </View>
              <TouchableHighlight
                onPress={(value) => {
                  this.handleEdit(value);
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={styles.submitButton}>Submit</Text>
              </TouchableHighlight>
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
            <Text style={styles.locationHeader} >{'Likes: Animals'}</Text>
            <Text style={styles.locationHeader} >{'Dislikes: Planes'}</Text>
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
  modal: {
    flex: 1,
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
    borderBottomColor: '#C1A9F6',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
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
