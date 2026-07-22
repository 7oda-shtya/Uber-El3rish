import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Navigation from '../client/components/Navigation'
import Home from '../client/screens/Home'
import History from '../client/screens/History'
import Favorites from '../client/screens/Favorites'
import Profile from '../client/screens/Profile'

const Tab = createBottomTabNavigator()

// دول التابز الأربعة اللي هيكون ليهم الناف بار العائم
// أي شاشة تانية (RequestTrip, EditProfile) بتفضل جوه الـ Stack بره هنا، فمش هيظهرلها الناف بار
const ClientTabs = () => {
	return (
		<Tab.Navigator screenOptions={{ headerShown: false }} tabBar={props => <Navigation {...props} />}>
			<Tab.Screen name='Home' component={Home} />
			<Tab.Screen name='History' component={History} />
			<Tab.Screen name='Favorites' component={Favorites} />
			<Tab.Screen name='Profile' component={Profile} />
		</Tab.Navigator>
	)
}

export default ClientTabs