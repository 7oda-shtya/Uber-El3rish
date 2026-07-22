import React, { useState } from 'react'
import { Image, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import ProfileSections from '../components/ProfileSections'
import Setting from '../components/Setting'

const ClientProfile = () => {
	const [selectedSection, setSelectedSection] = useState('reports')
	const [isSettingOpen, setIsSettingOpen] = useState(false)

	const client = {
		avatar: 'https://via.placeholder.com/150',
		name: 'عمرو محمد',
		homeAddress: '123 شارع التحرير، القاهرة، مصر',
		phone: '01012345678',
		email: 'omar.mohamed@example.com',
	}

	return (
		<SafeAreaView className='flex-1 bg-zinc-950 text-white' dir='rtl'>
			<View className='fixed top-0 left-0 right-0 p-4 z-40 text-xs flex-row items-center justify-between bg-gray-800/80 backdrop-blur-md'>
				<Pressable onPress={() => setIsSettingOpen(true)} className='text-white bg-zinc-800 rounded-full h-14 w-14 flex items-center justify-center shadow-lg active:scale-95 transition-all'>
					<FontAwesome name='gear' size={16} color='#a1a1aa' />
				</Pressable>
			</View>

			<ScrollView contentContainerStyle={{ padding: 16, paddingTop: 96, paddingBottom: 110 }}>
				<View className='w-full rounded-3xl bg-zinc-800 p-4 flex flex-col items-center gap-4 shrink-0 shadow-md mt-2'>
					<View className='relative'>
						<Image className='w-24 h-24 rounded-full border-2 border-zinc-700 object-cover' source={{ uri: client.avatar }} />
					</View>
					<Text className='text-xl font-bold'>{client.name}</Text>
					<Text className='text-sm text-zinc-400'>{client.homeAddress}</Text>
					<View className='flex flex-wrap justify-center items-center gap-4 border-t border-zinc-700/50 pt-3 w-full font-thin text-zinc-400'>
						<Text className='text-xs text-zinc-400'>{client.phone}</Text>
						<Text className='text-xs text-zinc-400'>{client.email}</Text>
					</View>
				</View>

				<View className='w-full rounded-3xl bg-zinc-800 p-6 mt-4 flex-1 flex flex-col gap-6 shadow-md mb-4'>
					<View className='flex-row justify-around items-center gap-4 border-b border-zinc-700/50 pb-4 text-zinc-400 font-bold'>
						<Pressable onPress={() => setSelectedSection('reports')} className={`flex flex-col items-center gap-1 flex-1 transition-colors ${selectedSection === 'reports' ? 'text-yellow-500' : ''}`}>
							<Text className='text-[10px] font-normal'>البلاغات</Text>
						</Pressable>
						<Pressable onPress={() => setSelectedSection('myTrips')} className={`flex flex-col items-center gap-1 flex-1 transition-colors ${selectedSection === 'myTrips' ? 'text-blue-500' : ''}`}>
							<Text className='text-[10px] font-normal'>تفاصيل رحلاتي</Text>
						</Pressable>
						<Pressable onPress={() => setSelectedSection('rates')} className={`flex flex-col items-center gap-1 flex-1 transition-colors ${selectedSection === 'rates' ? 'text-green-500' : ''}`}>
							<Text className='text-[10px] font-normal'>التقييمات</Text>
						</Pressable>
					</View>

					<ProfileSections selectedSection={selectedSection} />
				</View>
			</ScrollView>

			<Setting isOpen={isSettingOpen} onClose={() => setIsSettingOpen(false)} />
		</SafeAreaView>
	)
}

export default ClientProfile
