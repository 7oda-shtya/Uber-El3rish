import React, { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
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
		<View>
			<View className='flex-1 flex flex-col items-center text-zinc-400 text-sm py-8 w-full'>
				{!hasAnyData ? (
					<Text>لا توجد بيانات لعرضها حالياً</Text>
				) : selectedSection === 'rates' ? (
					<View className='w-full space-y-4 transition-all duration-300'>
						<View className='flex flex-row gap-2 justify-center mb-4'>
							<Pressable
								onPress={() => setRatesDirection('sent')}
								className={`px-4 py-2 rounded-full ${ratesDirection === 'sent' ? 'bg-green-500 text-white' : 'bg-zinc-700 text-zinc-300'}`}>
								<Text className='text-white'>التقييمات المرسلة</Text>
							</Pressable>
							<Pressable
								onPress={() => setRatesDirection('received')}
								className={`px-4 py-2 rounded-full ${ratesDirection === 'received' ? 'bg-blue-500 text-white' : 'bg-zinc-700 text-zinc-300'}`}>
								<Text className='text-white'>التقييمات المستلمة</Text>
							</Pressable>
						</View>
						{ratesDirection === 'sent' ? (
							<SentRates rates={sentRates} />
						) : (
							<ReceivedRates rates={receivedRates} />
						)}
					</View>
				) : selectedSection === 'reports' ? (
					<View className='w-full space-y-4'>
						<View className='flex flex-row gap-2 justify-center mb-4'>
							<Pressable
								onPress={() => setReportsDirection('sent')}
								className={`px-4 py-2 rounded-full ${reportsDirection === 'sent' ? 'bg-yellow-500 text-white' : 'bg-zinc-700 text-zinc-300'}`}>
								<Text className='text-white'>البلاغات المرسلة</Text>
							</Pressable>
							<Pressable
								onPress={() => setReportsDirection('received')}
								className={`px-4 py-2 rounded-full ${reportsDirection === 'received' ? 'bg-red-500 text-white' : 'bg-zinc-700 text-zinc-300'}`}>
								<Text className='text-white'>البلاغات المستلمة</Text>
							</Pressable>
						</View>
						{reportsDirection === 'sent' ? (
							<SentReports reports={sentReports} />
						) : (
							<ReceivedReports reports={receivedReports} />
						)}
					</View>
				) : selectedSection === 'favorites' ? (
					<View className='w-full space-y-3'>
						{favorites.length === 0 ? (
							<Text className='text-zinc-400'>لا توجد مفضلات حتى الآن</Text>
						) : (
							favorites.map((favorite, index) => (
								<View key={index} className='w-full bg-zinc-700/50 p-4 rounded-lg mb-4'>
									<Text>{favorite.name || `عنصر ${index + 1}`}</Text>
								</View>
							))
						)}
						</View>
				) : (
					<Text className='text-zinc-400'>يرجى اختيار قسم من الأعلى</Text>
				)}
			</View>
		</View>
	)
}

export default ProfileSections