import React, { useEffect, useRef, useState } from 'react';
import { View, Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

const TABS = [
  { name: 'Home', icon: 'home-outline', color: '#22D3EE', bgColor: '#164E63' }, // Cyan غامق
  { name: 'History', icon: 'time-outline', color: '#A3E635', bgColor: '#273515' }, // Lime غامق
  { name: 'Favorites', icon: 'heart-outline', color: '#F472B6', bgColor: '#500724' }, // Pink غامق
  { name: 'Profile', icon: 'person-outline', color: '#FACC15', bgColor: '#422006' }, // Yellow/Amber غامق
];

const ARC_HEIGHT = 22;
const ANIM_DURATION = 400;

const Navigation = ({ state, navigation }) => {
  const tabPositions = useRef([]);
  const [isReady, setIsReady] = useState(false);

  const indicatorX = useSharedValue(0);
  const arcProgress = useSharedValue(0);
  const activeColor = useSharedValue(TABS[0].bgColor);

  useEffect(() => {
    if (isReady && tabPositions.current[state.index] != null) {
      indicatorX.value = tabPositions.current[state.index];
      activeColor.value = TABS[state.index].bgColor;
    }
  }, [isReady]);

  useEffect(() => {
    if (isReady && tabPositions.current[state.index] != null) {
      indicatorX.value = withTiming(tabPositions.current[state.index], {
        duration: ANIM_DURATION,
        easing: Easing.inOut(Easing.quad),
      });
      arcProgress.value = 0;
      arcProgress.value = withTiming(1, { duration: ANIM_DURATION, easing: Easing.linear });
      activeColor.value = TABS[state.index].bgColor;
    }
  }, [state.index, isReady]);

  const handleTabPress = (route, index) => {
    const isFocused = state.index === index;
    const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  const indicatorStyle = useAnimatedStyle(() => {
    const liftY = -Math.sin(arcProgress.value * Math.PI) * ARC_HEIGHT - 9;
    return {
      transform: [{ translateX: indicatorX.value - 24 }, { translateY: liftY }],
      backgroundColor: activeColor.value,
    };
  });

  return (
    <View style={{ position: 'absolute', left: 16, right: 16, bottom: 28 }} className='flex-row bg-zinc-900/95 border border-white/10 rounded-full px-2 py-3 shadow-2xl'>
      <Animated.View pointerEvents='none' style={[{ position: 'absolute', top: -2, right: 0, width: 45, height: 45, borderRadius: 22.5, index: 1, borderWidth: 2 }, indicatorStyle]} className='border-white/30' />

      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const tab = TABS.find(t => t.name === route.name) ?? TABS[index];

        return (
          <Pressable
            key={route.key}
            onPress={() => handleTabPress(route, index)}
            onLayout={e => {
              const { x, width } = e.nativeEvent.layout;
              tabPositions.current[index] = x + width / 2;
              if (!isReady && tabPositions.current.filter(p => p != null).length === TABS.length) {
                setIsReady(true);
              }
            }}
            className='flex-1 items-center justify-center'>
            <Ionicons name={tab.icon} size={28} color={isFocused ? tab.color : 'rgba(255,255,255,0.4)'} className={`${isFocused ? '-translate-y-4' : 'translate-y-0'} transition-transform duration-300 ease-in-out`} />
          </Pressable>
        );
      })}
    </View>
  );
};

export default Navigation;
