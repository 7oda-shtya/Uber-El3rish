import React from 'react'
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native'

const trips = [
	{ id: 'trip_1', date: '2024-06-12', time: '3:30 PM', start: 'ميدان رمسيس', end: 'مدينة نصر', driver: 'أحمد منصور', car: 'فيرنا فيراني', price: 45 },
	{ id: 'trip_2', date: '2024-06-09', time: '11:10 AM', start: 'المعادي', end: 'وسط البلد', driver: 'إسلام علوان', car: 'لانوس بيضاء', price: 38 },
]

const History = () => {
	return (
		<SafeAreaView className='flex-1 bg-zinc-950 text-white' dir='rtl'>
			<ScrollView contentContainerStyle={{ padding: 16, paddingTop: 20, paddingBottom: 110 }}>
				<Text className='text-lg font-bold mb-4'>رحلاتي السابقة</Text>
				<View className='flex flex-col gap-3.5 mt-2'>
					{trips.map(trip => (
						<View key={trip.id} className='bg-zinc-800/70 border border-zinc-700/40 rounded-2xl p-4 flex flex-col gap-3'>
							<View className='flex-row justify-between items-center'>
								<Text className='text-xs text-zinc-400'>{trip.date} · {trip.time}</Text>
								<Text className='text-xs text-zinc-400'>مكتملة</Text>
							</View>
							<View className='flex flex-col gap-1.5 text-sm'>
								<Text className='text-white'>من: {trip.start}</Text>
								<Text className='text-white'>إلى: {trip.end}</Text>
							</View>
							<View className='flex-row justify-between items-center border-t border-zinc-700/40 pt-2.5 text-xs text-zinc-400'>
								<Text className='text-zinc-400'>{trip.driver} · {trip.car}</Text>
								<Text className='font-bold text-white text-sm'>{trip.price} ج.م</Text>
							</View>
						</View>
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default History