import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faUser, faPlus, faHistory, faHome } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation } from 'react-router-dom'

const navItems = [
	{ id: 'profile', icon: faUser, path: '/profile' },
	{ id: 'bookmark', icon: faBookmark, path: '/bookmarks' },
	{ id: 'home', icon: faHome, path: '/' },
	{ id: 'request-trip', icon: faPlus, path: '/request-trip' },
	{ id: 'history', icon: faHistory, path: '/history' },
]

const getActiveId = (pathname) => navItems.find((item) => item.path === pathname)?.id || 'home'

const Navigation = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const [activeId, setActiveId] = useState(() => getActiveId(location.pathname))

	useEffect(() => {
		setActiveId(getActiveId(location.pathname))
	}, [location.pathname])

	const handleClick = (item) => {
		setActiveId(item.id)
		navigate(item.path)
	}

	return (
		<nav className='fixed bottom-5 left-0 right-0 z-50 mx-auto w-11/12 max-w-md [padding-bottom:env(safe-area-inset-bottom)]'>
			<div className='relative flex items-center justify-around rounded-full bg-zinc-900/95 backdrop-blur-xl border border-white/5 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.5)] px-2'>
				{navItems.map((item) => {
					const isActive = activeId === item.id
					const isCenterButton = item.id === 'home'

					return (
						<div key={item.id} className='relative flex h-14 w-14 items-center justify-center'>
							{isActive && (
								<motion.div
									layoutId='nav-halo'
									transition={{ type: 'spring', stiffness: 380, damping: 30 }}
									className='absolute -top-8 z-20 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-zinc-900'
								>
									<button
										onClick={() => handleClick(item)}
										className={`flex h-14 w-14 items-center justify-center rounded-full border-2 bg-transparent shadow-lg transition-all
											${isCenterButton
												? 'border-yellow-400 text-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.4)]'
												: 'border-emerald-400 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.35)]'
											}`}
									>
										<FontAwesomeIcon icon={item.icon} className='text-xl' />
									</button>
								</motion.div>
							)}

							<button
								onClick={() => handleClick(item)}
								className={`flex items-center justify-center rounded-full transition-all duration-300
									${isActive ? 'opacity-0' : 'text-zinc-400 hover:text-white'}
									${isCenterButton
										? 'h-14 w-14 bg-zinc-800 text-yellow-400 border border-yellow-400/20 shadow-md scale-105'
										: 'h-14 w-14 bg-zinc-800/40 hover:bg-zinc-800'
									}`}
							>
								<FontAwesomeIcon icon={item.icon} className={isCenterButton ? 'text-lg' : 'text-base'} />
							</button>
						</div>
					)
				})}
			</div>
		</nav>
	)
}

export default Navigation