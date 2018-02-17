import * as React from 'react';
import { View, Text, Image, Alert, TouchableHighlight, Container } from 'react-native';
import defaultImage from './defaultUser.png';
import PropTypes from 'prop-types';

export default class Avatar extends React.Component { 
   constructor(props) {
      super(props);
   }

   handlePress() {
      Alert.alert("Picture Clicked", "Avatar Icon Clicked");
   }

   render() {
      const { picturePath } = this.props;

      return (
         <TouchableHighlight onPress={this.handlePress.bind(this)}>
            <Image source={picturePath} resizeMode={"center"} />
         </TouchableHighlight>
      );
   }
}

// TODO: Add a property "profilePath" to take user to the selected profile when clicked
Avatar.propTypes = {
    picturePath: PropTypes.any
};
  
Avatar.defaultProps = {
    picturePath: defaultImage
};