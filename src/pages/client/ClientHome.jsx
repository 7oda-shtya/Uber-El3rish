import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet, faBell } from '@fortawesome/free-solid-svg-icons'
import Navigation from '../../components/Navigation'
import Header from '../../components/Header'
const ClientHome = () => {

	return (
		<div>
			<Header />
			<Navigation />
		</div>
	)
}

export default ClientHome