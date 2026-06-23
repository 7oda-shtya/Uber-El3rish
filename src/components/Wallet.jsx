import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet } from '@fortawesome/free-solid-svg-icons'

const Wallet = () => {
	return (
		<div>
			<button className='text-white bg-zinc-800 rounded-full px-4 h-14 flex items-center justify-center gap-2 shadow-lg z-20 active:scale-95 transition-all shrink-0'>
				<FontAwesomeIcon icon={faWallet} className='text-green-400' />
				<span className='font-semibold'>$100</span>
			</button>
		</div>
	)
}

export default Wallet