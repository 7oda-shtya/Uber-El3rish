import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faLocationDot, faCar, faCheckCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import Navigation from '../../components/Navigation'

const statusBadge = (status) =>
	status === 'completed' ? (
		<span className='text-[10px] font-bold text-green-400 bg-green-950/50 border border-green-900/50 px-2 py-0.5 rounded-md flex items-center gap-1'>
			<FontAwesomeIcon icon={faCheckCircle} /> مكتملة
		</span>
	) : (
		<span className='text-[10px] font-bold text-red-400 bg-red-950/50 border border-red-900/50 px-2 py-0.5 rounded-md flex items-center gap-1'>
			<FontAwesomeIcon icon={faXmarkCircle} /> ملغاة
		</span>
	)

const History = () => {
	const navigate = useNavigate()
	const trips = useSelector((state) => state.trip?.history || [])
	const userId = useSelector((state) => state.auth?.id)

	return (
		<div className='min-h-screen w-full bg-gradient-to-b from-gray-800 to-gray-900 text-white relative flex flex-col p-4 pt-20 pb-28' dir='rtl'>
			<header className='fixed top-0 left-0 right-0 p-4 z-40 flex items-center gap-4 bg-gray-800/80 backdrop-blur-md'>
				<button onClick={() => navigate(-1)} className='w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center'>
					<FontAwesomeIcon icon={faChevronRight} />
				</button>
				<h1 className='text-lg font-bold'>رحلاتي السابقة</h1>
			</header>

			<div className='flex flex-col gap-3.5 mt-2'>
				{trips.length === 0 ? (
					<p className='text-zinc-400 text-sm text-center py-10'>لا توجد رحلات سابقة حتى الآن</p>
				) : (
					trips.map((trip) => (
						<div key={trip.id} className='bg-zinc-800/70 border border-zinc-700/40 rounded-2xl p-4 flex flex-col gap-3'>
							<div className='flex justify-between items-center'>
								<span className='text-xs text-zinc-400'>{trip.date} · {trip.time}</span>
								{statusBadge(trip.status)}
							</div>

							<div className='flex flex-col gap-1.5 text-sm'>
								<p className='flex items-center gap-2'><FontAwesomeIcon icon={faLocationDot} className='text-emerald-400 text-xs' /> {trip.from?.name}</p>
								<p className='flex items-center gap-2'><FontAwesomeIcon icon={faLocationDot} className='text-red-400 text-xs' /> {trip.to?.name}</p>
							</div>

							<div className='flex justify-between items-center border-t border-zinc-700/40 pt-2.5 text-xs text-zinc-400'>
								<span className='flex items-center gap-1.5'><FontAwesomeIcon icon={faCar} /> {trip.driverName} · {trip.car}</span>
								<span className='font-bold text-white text-sm'>{trip.price > 0 ? `${trip.price} ج.م` : '—'}</span>
							</div>
						</div>
					))
				)}
			</div>

			<Navigation />
		</div>
	)
}

export default History