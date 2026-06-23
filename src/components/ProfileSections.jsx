import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { SentRates, ReceivedRates, SentReports, ReceivedReports } from './Sections'

const ProfileSections = ({ selectedSection }) => {
	const client = useSelector((state) => state.auth || {})
	const { rates = { sent: [], received: [] }, reports = { sent: [], received: [] }, favorites = [] } = client
	const [ratesDirection, setRatesDirection] = useState('sent')
	const [reportsDirection, setReportsDirection] = useState('sent')

	const hasAnyData = (rates?.sent?.length || 0) + (rates?.received?.length || 0) + (reports?.sent?.length || 0) + (reports?.received?.length || 0) + favorites.length > 0
	const sentRates = rates?.sent || []
	const receivedRates = rates?.received || []
	const sentReports = reports?.sent || []
	const receivedReports = reports?.received || []

	return (
		<div>
			<div className='flex-1 flex flex-col items-center text-zinc-400 text-sm py-8 w-full'>
				{!hasAnyData ? (
					<p>لا توجد بيانات لعرضها حالياً</p>
				) : selectedSection === 'rates' ? (
					<div className='w-full space-y-4 transition-all duration-300'>
						<div className='flex gap-2 justify-center mb-4'>
							<button
								onClick={() => setRatesDirection('sent')}
								className={`px-4 py-2 rounded-full ${ratesDirection === 'sent' ? 'bg-green-500 text-white' : 'bg-zinc-700 text-zinc-300'}`}>
								التقييمات المرسلة
							</button>
							<button
								onClick={() => setRatesDirection('received')}
								className={`px-4 py-2 rounded-full ${ratesDirection === 'received' ? 'bg-blue-500 text-white' : 'bg-zinc-700 text-zinc-300'}`}>
								التقييمات المستلمة
							</button>
						</div>
						{ratesDirection === 'sent' ? (
							<SentRates rates={sentRates} />
						) : (
							<ReceivedRates rates={receivedRates} />
						)}
					</div>
				) : selectedSection === 'reports' ? (
					<div className='w-full space-y-4'>
						<div className='flex gap-2 justify-center mb-4'>
							<button
								onClick={() => setReportsDirection('sent')}
								className={`px-4 py-2 rounded-full ${reportsDirection === 'sent' ? 'bg-yellow-500 text-white' : 'bg-zinc-700 text-zinc-300'}`}>
								البلاغات المرسلة
							</button>
							<button
								onClick={() => setReportsDirection('received')}
								className={`px-4 py-2 rounded-full ${reportsDirection === 'received' ? 'bg-red-500 text-white' : 'bg-zinc-700 text-zinc-300'}`}>
								البلاغات المستلمة
							</button>
						</div>
						{reportsDirection === 'sent' ? (
							<SentReports reports={sentReports} />
						) : (
							<ReceivedReports reports={receivedReports} />
						)}
					</div>
				) : selectedSection === 'favorites' ? (
					<div className='w-full space-y-3'>
						{favorites.length === 0 ? (
							<p className='text-zinc-400'>لا توجد مفضلات حتى الآن</p>
						) : (
							favorites.map((favorite, index) => (
								<div key={index} className='w-full bg-zinc-700/50 p-4 rounded-lg mb-4'>
									<p>{favorite.name || `عنصر ${index + 1}`}</p>
								</div>
							))
						)}
					</div>
				) : (
					<p className='text-zinc-400'>يرجى اختيار قسم من الأعلى</p>
				)}
			</div>
		</div>
	)
}

export default ProfileSections