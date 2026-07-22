import React, { useState } from 'react'
import { Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native'
import MapComponent from '../components/MapComponent'
import TripPlannerPanel from '../components/trip/TripPlannerPanel'
import TripStatusPanel from '../components/trip/TripStatusPanel'

const RequestTrip = () => {
	const [currentTrip, setCurrentTrip] = useState({
		status: 'idle',
		startPin: { lat: 30.0444, lng: 31.2357, name: 'ميدان رمسيس' },
		endPin: { lat: 30.1211, lng: 31.3452, name: 'مدينة نصر' },
		waypoints: [],
		route: { coordinates: [], distanceKm: 12.3, durationMin: 26, price: 53 },
		price: 53,
		driverName: 'أحمد منصور',
		car: 'فيرنا فيراني',
	})

	const [requesting, setRequesting] = useState(false)
	const offers = [
		{ id: 'o_1', driverName: 'أحمد منصور', rate: 4.8, car: 'فيرنا فيراني', timeToReach: '4 دقائق', price: 50 },
		{ id: 'o_2', driverName: 'إسلام علوان', rate: 4.9, car: 'لانوس بيضاء', timeToReach: '6 دقائق', price: 55 },
	]

	return (
		<SafeAreaView className='w-full flex-1 bg-zinc-950 text-white overflow-hidden'>
			<View className='flex-1 relative'>
				<MapComponent startPin={currentTrip.startPin} endPin={currentTrip.endPin} waypoints={currentTrip.waypoints} routeCoords={currentTrip.route?.coordinates} />
				<TripPlannerPanel trip={currentTrip} requesting={requesting} isTripSaved={false} onToggleSaveTrip={() => {}} onConfirm={() => setRequesting(true)} />
				<TripStatusPanel trip={{ ...currentTrip, status: 'pending' }} offers={offers} onAccept={() => {}} onCancel={() => setRequesting(false)} onFinish={() => setRequesting(false)} />
			</View>
		</SafeAreaView>
	)
}

export default RequestTrip