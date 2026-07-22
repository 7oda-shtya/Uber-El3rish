import React from 'react'
import { Text, View } from 'react-native'

const COLOR_STYLES = {
  blue: 'text-blue-300 bg-blue-500/15 border-blue-400/40 shadow-blue-500/30',
  green: 'text-emerald-300 bg-emerald-500/15 border-emerald-400/40 shadow-emerald-500/30',
  red: 'text-red-300 bg-red-500/15 border-red-400/40 shadow-red-500/30',
  amber: 'text-amber-300 bg-amber-500/15 border-amber-400/40 shadow-amber-500/30',
}

const Tag = ({ children, icon, color = 'blue', pulse = false, className = '' }) => (
  <View
    className={`inline-flex items-center gap-1.5 text-[11px] font-bold leading-none px-2.5 py-1 rounded-full border backdrop-blur-sm shadow-[0_0_10px_-2px] ${COLOR_STYLES[color]} ${pulse ? 'animate-pulse' : ''} ${className}`}
  >
    <View className='flex-row items-center gap-1.5'>
      <Text className='text-[11px] font-bold leading-none'>{children}</Text>
    </View>
  </View>
)

export default Tag
