import React, { useMemo, useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'

const SAMPLE_PLACES = [
	{ localName: 'ميدان رمسيس', fullName: 'ميدان رمسيس - القاهرة', lat: 30.0444, lng: 31.2357 },
	{ localName: 'مدينة نصر', fullName: 'مدينة نصر - القاهرة', lat: 30.1211, lng: 31.3452 },
	{ localName: 'الدقي', fullName: 'الدقي - الجيزة', lat: 30.0388, lng: 31.2118 },
]

const LocationSearchInput = ({ placeholder, onSelect }) => {
	const [query, setQuery] = useState('')
	const results = useMemo(() => {
		const q = query.trim().toLowerCase()
		if (q.length < 2) return []
		return SAMPLE_PLACES.filter(place => (place.localName || '').toLowerCase().includes(q) || (place.fullName || '').toLowerCase().includes(q))
	}, [query])

	return (
		<View className='flex flex-col gap-1.5'>
			<TextInput value={query} onChangeText={setQuery} placeholder={placeholder} className='w-full bg-zinc-800 border border-zinc-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500' />
			{results.length > 0 && (
				<View className='bg-zinc-800/60 border border-zinc-700/40 rounded-xl overflow-hidden'>
					{results.map((place, i) => (
						<Pressable key={i} onPress={() => onSelect && onSelect(place)} className='w-full text-right px-3 py-2.5 border-b border-zinc-700/40'>
							<Text className='text-xs text-zinc-200'>{place.localName || place.fullName}</Text>
						</Pressable>
					))}
				</View>
			)}
		</View>
	)
}

export default LocationSearchInput