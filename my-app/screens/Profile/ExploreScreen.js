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
      <View style={{ backgroundColor: '#EFEFF4', flex: 1 }}>
        <ProfileCard style={{ flex: 1 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
