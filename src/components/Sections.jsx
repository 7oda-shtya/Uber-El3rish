import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faTriangleExclamation, faCircleInfo, faHashtag, faUser, faClock, faCheckCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'

export const SentRates = ({ rates }) => {
  if (!rates || rates.length === 0) {
    return <p className='text-zinc-400 text-sm text-center py-8 font-light'>لا توجد تقييمات مرسلة حتى الآن</p>
  }

  return (
    <div className='space-y-3.5 w-full animate-fade-in'>
      {rates.map((rate) => (
        <div key={rate.id} className='w-full bg-zinc-700/30 border border-zinc-700/40 p-4 rounded-2xl flex flex-col gap-2 shadow-sm'>
          <div className='flex justify-between items-center border-b border-zinc-700/40 pb-2'>
            <span className='text-[11px] font-medium text-blue-400 bg-blue-950/40 px-2.5 py-0.5 rounded-full'>تقييم مرسل</span>
            <div className='flex text-yellow-400 text-xs gap-0.5 bg-yellow-500/5 px-2 py-0.5 rounded-lg'>
              {[...Array(Number(rate.value || 5))].map((_, i) => (
                <FontAwesomeIcon key={i} icon={faStar} />
              ))}
            </div>
          </div>
          
          <div className='grid grid-cols-2 gap-2 text-xs text-zinc-400 mt-1'>
            <p className='flex items-center gap-1.5'><FontAwesomeIcon icon={faUser} className='text-zinc-500 text-[10px]' /> <span className='text-zinc-200 font-medium'>السائق:</span> {rate.driverName || rate.driverId || '-'}</p>
            <p className='flex items-center gap-1.5 justify-end'><FontAwesomeIcon icon={faHashtag} className='text-zinc-500 text-[10px]' /> <span className='text-zinc-200 font-medium'>الرحلة:</span> {rate.tripId || '-'}</p>
          </div>

          {rate.comment && (
            <p className='text-zinc-300 text-xs bg-zinc-900/40 p-3 rounded-xl border border-zinc-800/60 mt-1 text-right font-light leading-relaxed relative before:content-["“"] before:text-zinc-600 before:text-lg before:ml-1'>
              {rate.comment}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

export const ReceivedRates = ({ rates }) => {
  if (!rates || rates.length === 0) {
    return <p className='text-zinc-400 text-sm text-center py-8 font-light'>لا توجد تقييمات مستلمة حتى الآن</p>
  }

  return (
    <div className='space-y-3.5 w-full animate-fade-in'>
      {rates.map((rate) => (
        <div key={rate.id} className='w-full bg-zinc-700/30 border border-zinc-700/40 p-4 rounded-2xl flex flex-col gap-2 shadow-sm'>
          <div className='flex justify-between items-center border-b border-zinc-700/40 pb-2'>
            <span className='text-[11px] font-medium text-green-400 bg-green-950/40 px-2.5 py-0.5 rounded-full'>تقييم مستلم</span>
            <div className='flex text-yellow-400 text-xs gap-0.5 bg-yellow-500/5 px-2 py-0.5 rounded-lg'>
              {[...Array(Number(rate.value || 5))].map((_, i) => (
                <FontAwesomeIcon key={i} icon={faStar} />
              ))}
            </div>
          </div>

          <div className='grid grid-cols-2 gap-2 text-xs text-zinc-400 mt-1'>
            <p className='flex items-center gap-1.5'><FontAwesomeIcon icon={faUser} className='text-zinc-500 text-[10px]' /> <span className='text-zinc-200 font-medium'>الكابتن:</span> {rate.driverName || rate.driverId || '-'}</p>
            <p className='flex items-center gap-1.5 justify-end'><FontAwesomeIcon icon={faHashtag} className='text-zinc-500 text-[10px]' /> <span className='text-zinc-200 font-medium'>الرحلة:</span> {rate.tripId || '-'}</p>
          </div>

          {rate.comment && (
            <p className='text-zinc-300 text-xs bg-zinc-900/40 p-3 rounded-xl border border-zinc-800/60 mt-1 text-right font-light leading-relaxed'>
              {rate.comment}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

export const SentReports = ({ reports }) => {
  if (!reports || reports.length === 0) {
    return <p className='text-zinc-400 text-sm text-center py-8 font-light'>لا توجد بلاغات مرسلة حتى الآن</p>
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'accepted':
      case 'resolved':
        return <span className='text-[10px] font-bold text-green-400 bg-green-950/50 border border-green-900/50 px-2 py-0.5 rounded-md flex items-center gap-1'><FontAwesomeIcon icon={faCheckCircle} /> تم الحل</span>
      case 'rejected':
        return <span className='text-[10px] font-bold text-red-400 bg-red-950/50 border border-red-900/50 px-2 py-0.5 rounded-md flex items-center gap-1'><FontAwesomeIcon icon={faXmarkCircle} /> مرفوض</span>
      default:
        return <span className='text-[10px] font-bold text-blue-400 bg-blue-950/50 border border-blue-900/50 px-2 py-0.5 rounded-md flex items-center gap-1'><FontAwesomeIcon icon={faClock} /> قيد المراجعة</span>
    }
  }

  return (
    <div className='space-y-3.5 w-full animate-fade-in'>
      {reports.map((report) => (
        <div key={report.id} className='w-full bg-zinc-700/30 border border-zinc-700/40 p-4 rounded-2xl flex flex-col gap-2 shadow-sm'>
          <div className='flex justify-between items-center border-b border-zinc-700/40 pb-2'>
            <span className='text-[11px] font-medium text-amber-400 bg-amber-950/40 px-2.5 py-0.5 rounded-full flex items-center gap-1'>
              <FontAwesomeIcon icon={faTriangleExclamation} className='text-[10px]' /> بلاغ مرسل منك
            </span>
            {getStatusBadge(report.status)} 
          </div>

          <p className='text-zinc-100 text-sm font-semibold mt-1 text-right'>السبب: <span className='text-zinc-300 font-normal'>{report.reason}</span></p>
          
          <div className='grid grid-cols-2 gap-2 text-[11px] text-zinc-400 border-t border-zinc-800/30 pt-2 mt-1'>
            <p className='flex items-center gap-1.5'><FontAwesomeIcon icon={faUser} className='text-zinc-500' /> ضد السائق: {report.driverName || report.driverId || '-'}</p>
            <p className='flex items-center gap-1.5 justify-end'><FontAwesomeIcon icon={faHashtag} className='text-zinc-500' /> الرحلة: {report.tripId || '-'}</p>
          </div>

          <div className='flex justify-between items-center mt-1 text-[10px] text-zinc-500 font-mono'>
            <span>{report.time || '-'}</span>
            {report.attachment && (
              <a href={report.attachment} target="_blank" rel="noreferrer" className='text-blue-400 hover:underline font-sans font-medium text-xs'>🔗 عرض المرفق</a>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export const ReceivedReports = ({ reports }) => {
  if (!reports || reports.length === 0) {
    return <p className='text-zinc-400 text-sm text-center py-8 font-light'>لا توجد بلاغات مستلمة حتى الآن</p>
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'accepted':
      case 'resolved':
        return <span className='text-[10px] font-bold text-green-400 bg-green-950/50 border border-green-900/50 px-2 py-0.5 rounded-md flex items-center gap-1'><FontAwesomeIcon icon={faCheckCircle} /> تم الفصل فيه</span>
      case 'rejected':
        return <span className='text-[10px] font-bold text-red-400 bg-red-950/50 border border-red-900/50 px-2 py-0.5 rounded-md flex items-center gap-1'><FontAwesomeIcon icon={faXmarkCircle} /> ملغي / مرفوض</span>
      default:
        return <span className='text-[10px] font-bold text-blue-400 bg-blue-950/50 border border-blue-900/50 px-2 py-0.5 rounded-md flex items-center gap-1'><FontAwesomeIcon icon={faClock} /> تحت التحقيق</span>
    }
  }

  return (
    <div className='space-y-3.5 w-full animate-fade-in'>
      {reports.map((report) => (
        <div key={report.id} className='w-full bg-zinc-700/30 border border-zinc-700/40 p-4 rounded-2xl flex flex-col gap-2 shadow-sm'>
          <div className='flex justify-between items-center border-b border-zinc-700/40 pb-2'>
            <span className='text-[11px] font-medium text-red-400 bg-red-950/40 px-2.5 py-0.5 rounded-full flex items-center gap-1'>
              <FontAwesomeIcon icon={faCircleInfo} className='text-[10px]' /> شكوى مقدمة ضدك
            </span>
            {getStatusBadge(report.status)}
          </div>

          <p className='text-zinc-100 text-sm font-semibold mt-1 text-right'>موضوع الشكوى: <span className='text-zinc-300 font-normal'>{report.reason}</span></p>
          
          <div className='grid grid-cols-2 gap-2 text-[11px] text-zinc-400 border-t border-zinc-800/30 pt-2 mt-1'>
            <p className='flex items-center gap-1.5'><FontAwesomeIcon icon={faUser} className='text-zinc-500' /> صاحب البلاغ: {report.senderName || report.sender || 'سائق مبهم'}</p>
            <p className='flex items-center gap-1.5 justify-end'><FontAwesomeIcon icon={faHashtag} className='text-zinc-500' /> الرحلة: {report.tripId || '-'}</p>
          </div>

          <div className='flex justify-between items-center mt-1 text-[10px] text-zinc-500 font-mono'>
            <span>{report.time || '-'}</span>
            {report.attachment && (
              <a href={report.attachment} target="_blank" rel="noreferrer" className='text-blue-400 hover:underline font-sans font-medium text-xs'>🔗 المستندات المرفقة</a>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}