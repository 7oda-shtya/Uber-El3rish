import { NavigationContainer } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import AuthNavigator from './AuthNavigator'
import ClientNavigator from './ClientNavigator'

const RootNavigator = () => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

	return (
		<NavigationContainer>
			{isAuthenticated ? <ClientNavigator /> : <AuthNavigator />}
		</NavigationContainer>
	)
}

export default RootNavigator