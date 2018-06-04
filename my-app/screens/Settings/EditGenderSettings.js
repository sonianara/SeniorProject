import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, PickerIOS, Animated, Dimensions, TouchableHighlight } from 'react-native';
import Prompt from 'rn-prompt';
import SettingsList from 'react-native-settings-list';
import { Header } from 'react-native-elements';
import * as firebase from 'firebase';
import { getUser, saveUser, updateUserFields } from '../../config/userinfo.js';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const genders = [{ gender: 'Female' }, { gender: 'Male' }, { gender: 'Male and Female'}, { gender: 'Other' }];
const PickerItemIOS = PickerIOS.Item;

export default class EditGenderComponent extends React.Component {
    constructor(props) {
        super(props);

        const { state, navigate } = this.props.navigation;
        this.state = {
            userID: "0",
            userName: "New User",
            category: state.params.pageHeader,
            inputText: state.params.fieldValue,
            gender: state.params.fieldValue,
            promptVisible: false,
            offSet: new Animated.Value(deviceHeight),
            genderIndex: 0,
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

    changeGender = (gender) => {
        this.setState({ gender, genderIndex: gender });
        // this.handleEdit(genders[gender].gender);
    }

    render() {
        var bgColor = '#DCE3F4';
        const { state, navigate } = this.props.navigation;
        const pageHeader = state.params.pageHeader;
        const field = state.params.fieldValue;

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Edit {pageHeader}</Text>
                </View>
                <View style={styles.settingsList}>
                    <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
                        <SettingsList.Header headerStyle={{ marginTop: 15 }} />
                        <SettingsList.Item titleStyle={styles.itemTextStyle} titleInfo={this.state.inputText} hasNavArrow={false}
                            title={pageHeader} onPress={() => this.setState({ promptVisible: true })} />
                    </SettingsList>
                </View>
                {this.state.promptVisible ? <Picker
                    closeModal={() => this.handleEdit(genders[this.state.genderIndex].gender)}
                    offSet={this.state.offSet} changeGender={this.changeGender}
                    selectedGender={this.state.gender} /> : null}
            </View>
        );
    }
}

class Picker extends React.Component {

    componentDidMount = () => {
        Animated.timing(this.props.offSet, {
            duration: 300,
            toValue: 0
        }).start()
    }

    closeModal = () => {
        Animated.timing(this.props.offSet, {
            duration: 300,
            toValue: deviceHeight
        }).start(this.props.closeModal);
    }

    render() {
        return (
            <Animated.View style={{ transform: [{ translateY: this.props.offSet }] }}>
                <View style={styles.closeButtonContainer}>
                    <TouchableHighlight onPress={this.closeModal} underlayColor="transparent" style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Save</Text>
                    </TouchableHighlight>
                </View>
                <PickerIOS
                    selectedValue={this.props.selectedGender}
                    onValueChange={(gender) => this.props.changeGender(gender)}>
                    {Object.keys(genders).map((gender) => (
                        <PickerItemIOS key={gender} value={gender} label={genders[gender].gender} />
                    ))}
                </PickerIOS>
            </Animated.View>
        )
    }
}

var styles = StyleSheet.create({
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
        fontFamily: 'Avenir',
        fontSize: 18,
    },
    settingsList: {
        backgroundColor: '#ded3f6',
        flex: 1,
    },
    itemTextStyle: {
        color: '#5228b8',
    },
    button: {
        marginTop: 25,
        marginBottom: 25
    },
    closeButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderTopColor: '#e2e2e2',
        borderTopWidth: 1,
        borderBottomColor: '#e2e2e2',
        borderBottomWidth: 1
    },
    closeButton: {
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonText: {
        textAlign: 'center'
    },
    closeButtonText: {
        color: '#027afe'
    },
});
