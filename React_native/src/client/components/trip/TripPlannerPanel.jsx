import React, { useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'

const TripPlannerPanel = ({ trip, onConfirm, requesting, isTripSaved, onToggleSaveTrip }) => {
	const [startName, setStartName] = useState(trip.startPin?.name || '')
	const [endName, setEndName] = useState(trip.endPin?.name || '')
	const [passengerCount, setPassengerCount] = useState(1)
	const [customerNote, setCustomerNote] = useState('')
	const [scheduleTime, setScheduleTime] = useState('')

	return (
		<View className='absolute inset-x-0 top-16 z-30 flex flex-col items-center p-4 gap-3' dir='rtl'>
			<View className='w-full max-w-sm bg-zinc-900/95 backdrop-blur-md border border-zinc-700/40 rounded-2xl shadow-xl overflow-hidden p-4 gap-3'>
				<Text className='text-white font-bold text-sm'>طلب الرحلة</Text>
				<TextInput value={startName} onChangeText={setStartName} placeholder='نقطة البداية' className='bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-white' />
				<TextInput value={endName} onChangeText={setEndName} placeholder='نقطة الوصول' className='bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-white' />
				<TextInput value={scheduleTime} onChangeText={setScheduleTime} placeholder='موعد لاحق اختياري' className='bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-white' />
				<TextInput value={String(passengerCount)} onChangeText={text => setPassengerCount(Math.max(1, Math.min(6, Number(text || 1))))} placeholder='عدد الركاب' keyboardType='numeric' className='bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-white' />
				<TextInput value={customerNote} onChangeText={setCustomerNote} placeholder='ملاحظات للسائق' multiline className='bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-white min-h-[90px]' />

				<View className='flex-row gap-2'>
					<Pressable onPress={onToggleSaveTrip} className={`flex-1 rounded-xl py-2.5 ${isTripSaved ? 'bg-emerald-600' : 'bg-zinc-800'}`}>
						<Text className='text-center text-xs font-bold text-white'>{isTripSaved ? 'محفوظة' : 'حفظ الرحلة'}</Text>
					</Pressable>
					<Pressable onPress={() => onConfirm && onConfirm({ scheduledTime: scheduleTime || null, customerNote, passengerCount })} disabled={requesting} className='flex-1 rounded-xl py-2.5 bg-emerald-600'>
						<Text className='text-center text-xs font-bold text-white'>{requesting ? 'جارِ الإرسال...' : 'تأكيد واطلب'}</Text>
					</Pressable>
				</View>
			</View>
		</View>
	)
}

export default TripPlannerPanel