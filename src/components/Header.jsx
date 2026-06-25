import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import Wallet from './Wallet'
const Header = () => {

	return (
		<div className='text-white fixed top-0 left-0 right-0 flex justify-between p-4 items-center z-50'>

			<div className='relative z-20 flex-1 max-w-[75%]'>
				<button className='text-white bg-zinc-800 rounded-full h-14 w-14 max-w-full min-w-[3.5rem] flex items-center justify-start px-4 gap-4 overflow-hidden transition-all duration-500 ease-in-out hover:w-full group shadow-2xl hover:bg-blue-600'>

					<FontAwesomeIcon icon={faBell} className='shrink-0 text-xl' />

					<span className='whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 text-sm font-medium delay-100'>
						تم قبول كابتن أحمد لرحلتك!
					</span>
				</button>
			</div>

			<h1 className='absolute left-1/2 -translate-x-1/2 text-base font-medium z-10 pointer-events-none transition-opacity duration-300 group-hover:opacity-0'>
				مرحبا بك عمرو
			</h1>

			<Wallet />

		</div>
	)
}

export default Header