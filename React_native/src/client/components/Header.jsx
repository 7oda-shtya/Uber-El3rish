import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Setting from './Setting';

const Header = () => {
  const [settingsVisible, setSettingsVisible] = useState(false);

  const handleSettingsPress = () => {
    setSettingsVisible(!settingsVisible);
  };

  return (
    <SafeAreaView edges={['top']} className='flex-row justify-between px-4 pb-4 items-center z-50'>
      <Pressable 
        onPress={handleSettingsPress} 
        className='bg-zinc-800 rounded-full h-12 w-12 items-center justify-center'
      >
        <FontAwesome name='gear' size={18} color='white' />
      </Pressable>

      <Pressable className='bg-zinc-800 rounded-full px-4 h-12 flex-row items-center justify-center gap-2 shadow-lg'>
        <FontAwesome name='money' size={16} color='#4ade80' />
        <Text className='font-semibold text-white'>$100</Text>
      </Pressable>

      <Setting isOpen={settingsVisible} onClose={() => setSettingsVisible(false)} />
    </SafeAreaView>
  );
};

export default Header;
