import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ClientTabs from './ClientTabs'
import RequestTrip from '../client/screens/RequestTrip'
import EditProfile from '../client/screens/EditProfile'

const Stack = createNativeStackNavigator()

const ClientNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='ClientTabs'>
			{/* الشاشة دي هي اللي فيها التابز الأربعة والناف بار العائم */}
			<Stack.Screen name='ClientTabs' component={ClientTabs} />

			{/* شاشات لوحدها من غير ناف بار - زي شاشة كاملة لطلب رحلة أو تعديل بروفايل */}
			<Stack.Screen name='RequestTrip' component={RequestTrip} />
			<Stack.Screen name='EditProfile' component={EditProfile} />
		</Stack.Navigator>
	)
}

export default ClientNavigator