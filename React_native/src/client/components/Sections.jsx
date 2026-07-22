import React from 'react'
import { Pressable, Text, View, Linking } from 'react-native'
import Tag from './Tag'

export const SentRates = ({ rates }) => {
  if (!rates || rates.length === 0) {
    return <Text className='text-zinc-400 text-sm text-center py-8 font-light'>لا توجد تقييمات مرسلة حتى الآن</Text>
  }

  return (
    <View className='space-y-3.5 w-full animate-fade-in'>
      {rates.map((rate) => (
        <View key={rate.id} className='w-full bg-zinc-700/30 border border-zinc-700/40 p-4 rounded-2xl flex flex-col gap-2 shadow-sm'>
          <View className='flex-row justify-between items-center border-b border-zinc-700/40 pb-2'>
            <Tag color='blue'>تقييم مرسل</Tag>
            <View className='flex-row text-yellow-400 text-xs gap-0.5 bg-yellow-500/5 px-2 py-0.5 rounded-lg'>
              {[...Array(Number(rate.value || 5))].map((_, i) => (
                <Text key={i}>★</Text>
              ))}
            </View>
          </View>

          <View className='grid grid-cols-2 gap-2 text-xs text-zinc-400 mt-1'>
            <Text className='flex-row items-center gap-1.5 text-zinc-400'>👤 <Text className='text-zinc-200 font-medium'>السائق:</Text> {rate.driverName || rate.driverId || '-'}</Text>
            <Text className='flex-row items-center gap-1.5 justify-end text-zinc-400'># <Text className='text-zinc-200 font-medium'>الرحلة:</Text> {rate.tripId || '-'}</Text>
          </View>

          {rate.comment && (
            <Text className='text-zinc-300 text-xs bg-zinc-900/40 p-3 rounded-xl border border-zinc-800/60 mt-1 text-right font-light leading-relaxed relative'>
              {rate.comment}
            </Text>
          )}
        </View>
      ))}
    </View>
  )
}

export const ReceivedRates = ({ rates }) => {
  if (!rates || rates.length === 0) {
    return <Text className='text-zinc-400 text-sm text-center py-8 font-light'>لا توجد تقييمات مستلمة حتى الآن</Text>
  }

  return (
    <View className='space-y-3.5 w-full animate-fade-in'>
      {rates.map((rate) => (
        <View key={rate.id} className='w-full bg-zinc-700/30 border border-zinc-700/40 p-4 rounded-2xl flex flex-col gap-2 shadow-sm'>
          <View className='flex-row justify-between items-center border-b border-zinc-700/40 pb-2'>
            <Tag color='green'>تقييم مستلم</Tag>
            <View className='flex-row text-yellow-400 text-xs gap-0.5 bg-yellow-500/5 px-2 py-0.5 rounded-lg'>
              {[...Array(Number(rate.value || 5))].map((_, i) => (
                <Text key={i}>★</Text>
              ))}
            </View>
          </View>

          <View className='grid grid-cols-2 gap-2 text-xs text-zinc-400 mt-1'>
            <Text className='flex-row items-center gap-1.5 text-zinc-400'>👤 <Text className='text-zinc-200 font-medium'>الكابتن:</Text> {rate.driverName || rate.driverId || '-'}</Text>
            <Text className='flex-row items-center gap-1.5 justify-end text-zinc-400'># <Text className='text-zinc-200 font-medium'>الرحلة:</Text> {rate.tripId || '-'}</Text>
          </View>

          {rate.comment && (
            <Text className='text-zinc-300 text-xs bg-zinc-900/40 p-3 rounded-xl border border-zinc-800/60 mt-1 text-right font-light leading-relaxed'>
              {rate.comment}
            </Text>
          )}
        </View>
      ))}
    </View>
  )
}

export const SentReports = ({ reports }) => {
  if (!reports || reports.length === 0) {
    return <Text className='text-zinc-400 text-sm text-center py-8 font-light'>لا توجد بلاغات مرسلة حتى الآن</Text>
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'accepted':
      case 'resolved':
        return <Tag color='green'>تم الحل</Tag>
      case 'rejected':
        return <Tag color='red'>مرفوض</Tag>
      default:
        return <Tag color='blue' pulse>قيد المراجعة</Tag>
    }
  }

  return (
    <View className='space-y-3.5 w-full animate-fade-in'>
      {reports.map((report) => (
        <View key={report.id} className='w-full bg-zinc-700/30 border border-zinc-700/40 p-4 rounded-2xl flex flex-col gap-2 shadow-sm'>
          <View className='flex-row justify-between items-center border-b border-zinc-700/40 pb-2'>
            <Tag color='amber'>بلاغ مرسل منك</Tag>
            {getStatusBadge(report.status)}
          </View>

          <Text className='text-zinc-100 text-sm font-semibold mt-1 text-right'>السبب: <Text className='text-zinc-300 font-normal'>{report.reason}</Text></Text>

          <View className='grid grid-cols-2 gap-2 text-[11px] text-zinc-400 border-t border-zinc-800/30 pt-2 mt-1'>
            <Text className='flex-row items-center gap-1.5 text-zinc-400'>👤 ضد السائق: {report.driverName || report.driverId || '-'}</Text>
            <Text className='flex-row items-center gap-1.5 justify-end text-zinc-400'># الرحلة: {report.tripId || '-'}</Text>
          </View>

          <View className='flex-row justify-between items-center mt-1 text-[10px] text-zinc-500 font-mono'>
            <Text>{report.time || '-'}</Text>
            {report.attachment && (
              <Pressable onPress={() => Linking.openURL(report.attachment)}>
                <Text className='text-blue-400 font-sans font-medium text-xs'>🔗 عرض المرفق</Text>
              </Pressable>
            )}
          </View>
        </View>
      ))}
    </View>
  )
}

export const ReceivedReports = ({ reports }) => {
  if (!reports || reports.length === 0) {
    return <Text className='text-zinc-400 text-sm text-center py-8 font-light'>لا توجد بلاغات مستلمة حتى الآن</Text>
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'accepted':
      case 'resolved':
        return <Tag color='green'>تم الفصل فيه</Tag>
      case 'rejected':
        return <Tag color='red'>ملغي / مرفوض</Tag>
      default:
        return <Tag color='blue' pulse>تحت التحقيق</Tag>
    }
  }

  return (
    <View className='space-y-3.5 w-full animate-fade-in'>
      {reports.map((report) => (
        <View key={report.id} className='w-full bg-zinc-700/30 border border-zinc-700/40 p-4 rounded-2xl flex flex-col gap-2 shadow-sm'>
          <View className='flex-row justify-between items-center border-b border-zinc-700/40 pb-2'>
            <Tag color='red'>شكوى مقدمة ضدك</Tag>
            {getStatusBadge(report.status)}
          </View>

          <Text className='text-zinc-100 text-sm font-semibold mt-1 text-right'>موضوع الشكوى: <Text className='text-zinc-300 font-normal'>{report.reason}</Text></Text>

          <View className='grid grid-cols-2 gap-2 text-[11px] text-zinc-400 border-t border-zinc-800/30 pt-2 mt-1'>
            <Text className='flex-row items-center gap-1.5 text-zinc-400'>👤 صاحب البلاغ: {report.senderName || report.sender || 'سائق مبهم'}</Text>
            <Text className='flex-row items-center gap-1.5 justify-end text-zinc-400'># الرحلة: {report.tripId || '-'}</Text>
          </View>

          <View className='flex-row justify-between items-center mt-1 text-[10px] text-zinc-500 font-mono'>
            <Text>{report.time || '-'}</Text>
            {report.attachment && (
              <Pressable onPress={() => Linking.openURL(report.attachment)}>
                <Text className='text-blue-400 font-sans font-medium text-xs'>🔗 المستندات المرفقة</Text>
              </Pressable>
            )}
          </View>
        </View>
      ))}
    </View>
  )
}