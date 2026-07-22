import React, { useState } from 'react'
import { Image, Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native'

const EditProfile = () => {
	const [form, setForm] = useState({
		name: 'عمرو محمد',
		phone: '01012345678',
		email: 'omar.mohamed@example.com',
		homeAddress: '123 شارع التحرير، القاهرة، مصر',
	})

	return (
		<SafeAreaView className='flex-1 bg-zinc-950 text-white' dir='rtl'>
			<ScrollView contentContainerStyle={{ padding: 16, paddingTop: 20, paddingBottom: 32 }}>
				<Text className='text-lg font-bold mb-4'>تعديل الملف الشخصي</Text>
				<View className='flex flex-col items-center gap-3 mt-4 mb-6'>
					<Image className='w-24 h-24 rounded-full border-2 border-zinc-700 object-cover' source={{ uri: 'https://via.placeholder.com/150' }} />
				</View>

				<View className='flex flex-col gap-4'>
					<TextInput value={form.name} onChangeText={value => setForm(prev => ({ ...prev, name: value }))} className='w-full bg-zinc-800 rounded-xl px-4 py-3 text-sm text-white' placeholder='الاسم' />
					<TextInput value={form.phone} onChangeText={value => setForm(prev => ({ ...prev, phone: value }))} className='w-full bg-zinc-800 rounded-xl px-4 py-3 text-sm text-white' placeholder='رقم الهاتف' />
					<TextInput value={form.email} onChangeText={value => setForm(prev => ({ ...prev, email: value }))} className='w-full bg-zinc-800 rounded-xl px-4 py-3 text-sm text-white' placeholder='البريد الإلكتروني' />
					<TextInput value={form.homeAddress} onChangeText={value => setForm(prev => ({ ...prev, homeAddress: value }))} className='w-full bg-zinc-800 rounded-xl px-4 py-3 text-sm text-white' placeholder='العنوان' />
					<Pressable className='mt-2 w-full bg-emerald-600 rounded-xl py-3.5 font-bold transition-all active:scale-[0.99]'>
						<Text className='text-center text-white font-bold'>حفظ التعديلات</Text>
					</Pressable>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default EditProfile