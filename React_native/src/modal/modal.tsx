import {Modal, View, Text, Pressable} from 'react-native';
import React from 'react';


export default function CustomModal({visible, onClose, title, message}) {
	return (
		<Modal	
			animationType="fade"
			transparent={true}
			visible={visible}
			onRequestClose={onClose}
		>
			<View className="flex-1 items-center justify-center bg-black bg-opacity-50">
				<View className="bg-white rounded-lg p-4">
					<Text className="text-lg font-bold">{title}</Text>
					<Text className="text-gray-600 mt-2">{message}</Text>
					<Pressable onPress={onClose} className="mt-4 bg-blue-500 rounded-lg py-2 px-4">
						<Text className="text-white text-center">اغلاق</Text>
					</Pressable>
				</View>
			</View>
		</Modal>
	);
}