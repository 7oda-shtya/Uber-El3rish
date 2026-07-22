import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Modal, Pressable, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Setting = ({ isOpen, onClose }) => {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [isVisible, setIsVisible] = useState(isOpen);
  const translateX = useRef(new Animated.Value(width)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      translateX.setValue(width);
      backdropOpacity.setValue(0);

      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: 380,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: width,
          duration: 280,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (finished) setIsVisible(false);
      });
    }
  }, [backdropOpacity, isOpen, translateX, width]);

  if (!isVisible) return null;

  return (
    <Modal transparent visible={isVisible} animationType='none' statusBarTranslucent onRequestClose={onClose}>
      <View>
        <Animated.View style={{ opacity: backdropOpacity }}>
          <Pressable onPress={onClose} />
        </Animated.View>

        <Animated.View
          className='w-[82%] bg-zinc-900 border-l border-zinc-800 px-6 rounded-l-2xl flex flex-col justify-between overflow-hidden'
          style={[
            {
              paddingTop: insets.top + 24,
              paddingBottom: Math.max(insets.bottom, 24),
              transform: [{ translateX: -translateX }],
            },
          ]}>
          <View>
            <View className='flex-row items-center justify-between mb-8'>
              <Text className='text-2xl font-bold text-white'>الإعدادات</Text>
              <Pressable onPress={onClose} className='text-zinc-400 hover:text-white bg-zinc-800/60 rounded-full w-10 h-10 flex items-center justify-center active:scale-95 transition-all'>
                <FontAwesome name='times' size={14} color='#d4d4d8' />
              </Pressable>
            </View>

            <View className='flex flex-col gap-3'>
              <Pressable className='w-full p-4 bg-zinc-800/40 border border-zinc-800/30 text-right rounded-xl flex-row justify-between items-center transition-all active:scale-[0.99]'>
                <Text className='font-medium'>اللغة</Text>
                <Text className='text-zinc-500 text-sm'>العربية</Text>
              </Pressable>
              <Pressable className='w-full p-4 bg-zinc-800/40 border border-zinc-800/30 text-right rounded-xl flex-row justify-between items-center transition-all active:scale-[0.99]'>
                <Text className='font-medium'>الوضع الداكن</Text>
                <Text className='text-green-500 text-sm'>مفعل</Text>
              </Pressable>
              <Pressable className='w-full p-4 bg-zinc-800/40 border border-zinc-800/30 text-right rounded-xl flex-row justify-between items-center transition-all active:scale-[0.99]'>
                <Text className='font-medium'>التنببهات</Text>
                <Text className='text-zinc-500'>›</Text>
              </Pressable>
              <Pressable className='w-full p-4 bg-zinc-800/40 border border-zinc-800/30 text-right rounded-xl flex-row justify-between items-center transition-all active:scale-[0.99]'>
                <Text className='font-medium'>تغيير كلمة المرور</Text>
                <Text className='text-zinc-500'>›</Text>
              </Pressable>
              <Pressable className='w-full p-4 bg-zinc-800/40 border border-zinc-800/30 text-right rounded-xl flex-row justify-between items-center transition-all active:scale-[0.99]'>
                <Text className='font-medium'>مساعدة ودعم</Text>
                <Text className='text-zinc-500'>›</Text>
              </Pressable>
            </View>
          </View>

          <View className='flex flex-col gap-4 items-center w-full'>
            <View className='flex-row justify-between items-center w-full gap-4 text-sm'>
              <Pressable className='flex-1 p-3 bg-zinc-800 border border-zinc-700 text-red-500 font-medium rounded-xl active:scale-95 transition-all text-center'>
                <Text className='text-red-500 font-medium text-center'>تسجيل الخروج</Text>
              </Pressable>
              <Pressable className='flex-1 p-3 bg-red-950/30 border border-red-900/40 text-red-400 font-medium rounded-xl active:scale-95 transition-all text-center text-xs'>
                <Text className='text-red-400 font-medium text-center text-xs'>حذف الحساب</Text>
              </Pressable>
            </View>

            <Text className='text-xs text-zinc-600 font-mono tracking-wider'>نسخة 1.0.0</Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default Setting;
