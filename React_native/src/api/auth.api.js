import client from './client'

export const loginRequest = (phone, password) => {
	return client.post('/client/auth/login', { phone, password })
}

export const registerRequest = data => {
	return client.post('/client/auth/register', data)
}

export const getMeRequest = () => {
	return client.get('/client/auth/me')
}