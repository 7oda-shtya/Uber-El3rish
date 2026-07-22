import React from 'react'
import { Pressable, Text, View } from 'react-native'

const TripStatusPanel = ({ trip, offers = [], onAccept, onCancel, onFinish }) => {
	const isPending = trip.status === 'pending'

	return (
		<View className='absolute bottom-24 left-3 right-3 z-30 bg-zinc-900 border border-zinc-700/40 rounded-3xl p-4 shadow-2xl flex flex-col gap-3 max-h-[60vh] overflow-hidden'>
			<View className='flex-row items-center justify-between'>
				<Text className='text-sm font-bold'>{isPending ? 'جارِ البحث عن سائق...' : 'الرحلة جارية'}</Text>
				{trip.route && <Text className='text-[11px] text-zinc-400'>{trip.route.distanceKm.toFixed(1)} كم</Text>}
			</View>

			<View className='flex flex-col gap-1.5 text-xs text-zinc-300 bg-zinc-800/50 rounded-xl p-3'>
				<Text>من: {trip.startPin?.name || '-'}</Text>
				{trip.waypoints?.map((wp, i) => <Text key={i} className='text-zinc-400'>محطة: {wp.name}</Text>)}
				<Text>إلى: {trip.endPin?.name || '-'}</Text>
			</View>

			{isPending ? (
				<View className='flex flex-col gap-2'>
					{offers.length === 0 ? (
						<Text className='text-zinc-500 text-xs text-center py-4'>لا يوجد سائقون متاحون حاليًا</Text>
					) : (
						offers.map(offer => (
							<View key={offer.id} className='flex-row items-center justify-between gap-3 bg-zinc-800/60 border border-zinc-700/40 rounded-2xl p-3'>
								<View className='flex-1 min-w-0'>
									<Text className='text-sm font-semibold truncate'>{offer.driverName}</Text>
									<Text className='text-[11px] text-zinc-400'>
										{offer.rate} - {offer.car} - يصل خلال {offer.timeToReach}
									</Text>
								</View>
								<View className='text-left shrink-0 flex flex-col items-end gap-1.5'>
									<Text className='font-bold text-sm'>{offer.price} ج.م</Text>
									<Pressable onPress={() => onAccept && onAccept(offer)} className='bg-emerald-600 rounded-lg px-3 py-1.5'>
										<Text className='text-[11px] font-bold text-white'>قبول</Text>
									</Pressable>
								</View>
							</View>
						))
					)}

					<Pressable onPress={onCancel} className='w-full bg-red-950/40 text-red-400 border border-red-900/40 rounded-2xl py-2.5 mt-1'>
						<Text className='text-center text-xs font-bold text-red-400'>إلغاء الطلب</Text>
					</Pressable>
				</View>
			) : (
				<View className='flex flex-col gap-3'>
					<View className='flex-row items-center justify-between bg-zinc-800/60 border border-zinc-700/40 rounded-2xl p-3'>
						<View>
							<Text className='text-sm font-semibold'>{trip.driverName}</Text>
							<Text className='text-[11px] text-zinc-400'>{trip.car}</Text>
						</View>
						<Text className='font-bold'>{trip.price} ج.م</Text>
					</View>

					<Pressable onPress={onFinish} className='w-full bg-emerald-600 rounded-2xl py-2.5'>
						<Text className='text-center text-xs font-bold text-white'>إنهاء الرحلة (تجريبي)</Text>
					</Pressable>
				</View>
			)}
		</View>
	)
}

export default TripStatusPanel