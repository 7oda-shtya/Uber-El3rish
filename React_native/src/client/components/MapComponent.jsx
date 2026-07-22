import React from 'react'
import { Text, View } from 'react-native'

const MapComponent = ({ startPin, endPin, waypoints = [], routeCoords, pickTarget }) => {
	return (
		<View className={`flex-1 items-center justify-center bg-zinc-950 ${pickTarget ? 'border border-emerald-500/30' : ''}`}>
			<Text className='text-white font-bold text-base'>الخريطة غير متاحة في هذه النسخة</Text>
			<Text className='text-zinc-400 text-xs mt-2'>من: {startPin?.name || '-'}</Text>
			<Text className='text-zinc-400 text-xs'>إلى: {endPin?.name || '-'}</Text>
			<Text className='text-zinc-400 text-xs'>المحطات: {waypoints.length}</Text>
			<Text className='text-zinc-400 text-xs'>نقاط المسار: {routeCoords?.length || 0}</Text>
		</View>
	)
}

export default MapComponent