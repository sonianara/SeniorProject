import * as React from 'react';
import { Alert, StyleSheet, ScrollView, Text, TouchableHighlight, View, Image } from 'react-native';
import Button from 'react-native-button';
import defaultImage from '../../resources/defaultUser.png'
import * as Constants from '../../resources/LoremIpsum.js';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import ProfileCard from './ProfileCard.js';

export default class ExploreScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Explore</Text>
        </View>
          <ProfileCard />
      </View>
    );
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
    marginTop: 50,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Avenir',
  },
});
