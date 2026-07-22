import React, { useState } from 'react'
import { Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native'

const Favorites = () => {
	const [favorites, setFavorites] = useState([
		{ id: 'fav_1', name: 'المنزل', address: '123 شارع التحرير، القاهرة، مصر' },
		{ id: 'fav_2', name: 'العمل', address: 'مدينة نصر، القاهرة' },
	])

	const [name, setName] = useState('')
	const [address, setAddress] = useState('')

	return (
		<SafeAreaView className='flex-1 bg-zinc-950 text-white' dir='rtl'>
			<ScrollView contentContainerStyle={{ padding: 16, paddingTop: 20, paddingBottom: 110 }}>
				<Text className='text-lg font-bold mb-4'>المفضلة</Text>
				<View className='flex flex-col gap-3 mt-2'>
					{favorites.map(fav => (
						<View key={fav.id} className='flex-row items-center gap-3 bg-zinc-800/70 border border-zinc-700/40 rounded-2xl p-4'>
							<View className='w-11 h-11 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0'>
								<Text className='text-emerald-400'>★</Text>
							</View>
							<View className='flex-1 min-w-0'>
								<Text className='font-semibold text-white'>{fav.name}</Text>
								<Text className='text-xs text-zinc-400'>{fav.address}</Text>
							</View>
						</View>
					))}

					<View className='bg-zinc-800/70 border border-zinc-700/40 rounded-2xl p-4 flex flex-col gap-3'>
						<Text className='text-xs font-semibold text-zinc-400 px-1'>إضافة مكان جديد</Text>
						<TextInput value={name} onChangeText={setName} placeholder='اسم المكان' className='bg-zinc-900 rounded-xl px-4 py-2.5 text-sm text-white' />
						<TextInput value={address} onChangeText={setAddress} placeholder='العنوان بالتفصيل' className='bg-zinc-900 rounded-xl px-4 py-2.5 text-sm text-white' />
						<Pressable className='flex items-center justify-center gap-2 border border-emerald-500 text-emerald-400 rounded-2xl py-4 mt-1'>
							<Text className='text-sm font-medium text-white'>إضافة</Text>
						</Pressable>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default Favorites