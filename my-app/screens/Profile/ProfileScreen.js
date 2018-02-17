import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Button from 'react-native-button';
import defaultImage from './defaultUser.png';
import PropTypes from 'prop-types';

export default class ProfileScreen extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <View style={styles.container}>
            <Image source={defaultImage} resizeMode={"center"}/>
            <Text style={styles.titleText}>Your Name Here</Text>
            <Text>Your bio here</Text>
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