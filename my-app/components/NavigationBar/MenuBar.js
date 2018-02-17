import React, {Component} from 'react'
import BottomNavigation, {Tab} from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class NavBarComponent extends Component {
   render() {
      return (
         <BottomNavigation 
	    labelColor="white"
	    rippleColor="white"
	    style = {{height:56, elevation: 8, position: 'absolute', left: 0, bottom: 0, right: 0 }}
	    //onTabChange= { (newTabIndex => alert('New Tab at position ${newTabIndex}')}
	 >
            <Tab 
	       barBackgroundColor="#37474F"
	       label="Profile"
	       icon={<Icon size={24} color="white" name="person" />}
	    />
	    <Tab 
	       barBackgroundColor="#00796B"
	       label="Messages"
	       icon={<Icon size={24} color="white" name="message" />}
	    />
 	    <Tab 
	       barBackgroundColor="#5D4037"
	       label="Settings"
	       icon={<Icon size={24} color="white" name="settings" />}
	    />
	    <Tab 
	       barBackgroundColor="#5D4037"
	       label="Notifications"
	       icon={<Icon size={24} color="white" name="notifications" />}
	    />

	 </BottomNavigation>
      )
   }
}

