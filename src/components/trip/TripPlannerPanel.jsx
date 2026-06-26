import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot, faMapPin, faFlagCheckered } from '@fortawesome/free-solid-svg-icons';

const TripPlannerPanel = ({ trip, pickTarget, onSetPickTarget, onConfirm, requesting, isTripSaved, onToggleSaveTrip }) => {
  const isTripReady = trip.startPin && trip.endPin;
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [scheduleType, setScheduleType] = useState('now'); // 'now' | 'later'
  const [scheduleDay, setScheduleDay] = useState('today'); // 'today' | 'tomorrow'
  const [scheduleTime, setScheduleTime] = useState(''); // HH:MM
  const [customerNote, setCustomerNote] = useState('');
  const [passengerCount, setPassengerCount] = useState(1);

  // دالة ذكية تحدد إيه اللي مكتوب في الإشعار
  const getStatusText = () => {
    if (pickTarget === 'start') return 'يتم تحديد نقطة البداية...';
    if (pickTarget === 'end') return 'يتم تحديد نقطة الوصول...';
    if (pickTarget?.waypoint) return 'يتم تحديد المحطة...';
    return isTripReady ? 'تم تحديد المسار بنجاح' : 'حدد النقاط للبدء';
  };

  return (
    <div className='absolute inset-x-0 top-16 z-30 flex flex-col items-center p-4 gap-4'>
      
      {/* 1. الإشعار الطايف */}
      <div className='bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold border border-white/10 shadow-lg'>
        {getStatusText()}
      </div>

      {/* 2. شريط الأزرار (Controls) - showing selected names when available */}
      <div className='flex gap-2 w-full justify-center'>
        <button onClick={() => onSetPickTarget('start')} className={`p-3 rounded-2xl flex flex-col items-center gap-1 w-28 shadow-lg ${pickTarget === 'start' ? 'bg-emerald-600' : 'bg-zinc-900'}`}>
          <FontAwesomeIcon icon={faCircleDot} />
          <span className='text-[11px] text-center truncate w-20'>{trip.startPin?.name || 'تحديد البداية'}</span>
        </button>
        <button onClick={() => onSetPickTarget({ waypoint: true })} className={`p-3 rounded-2xl flex flex-col items-center gap-1 w-28 shadow-lg ${pickTarget?.waypoint ? 'bg-blue-600' : 'bg-zinc-900'}`}>
          <FontAwesomeIcon icon={faMapPin} />
          <span className='text-[11px] text-center truncate w-20'>{/* waypoint label - show generic */}محطة</span>
        </button>
        <button onClick={() => onSetPickTarget('end')} className={`p-3 rounded-2xl flex flex-col items-center gap-1 w-28 shadow-lg ${pickTarget === 'end' ? 'bg-red-600' : 'bg-zinc-900'}`}>
          <FontAwesomeIcon icon={faFlagCheckered} />
          <span className='text-[11px] text-center truncate w-20'>{trip.endPin?.name || 'تحديد الوصول'}</span>
        </button>
      </div>

      {/* 3. كارت تفاصيل الرحلة (يظهر فقط لو فيه بداية ونهاية) */}
      {isTripReady && (
        <>
          <div className='w-full flex justify-center'>
            <button onClick={() => setShowInfoModal(true)} className='mt-2 bg-zinc-800 text-emerald-400 px-4 py-2 rounded-lg border border-zinc-700'>تفاصيل الرحلة</button>
          </div>

          {showInfoModal && (
            <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
              <div className='absolute inset-0 bg-black/60' onClick={() => setShowInfoModal(false)} />
              <div className='relative bg-zinc-900 border border-zinc-700/40 rounded-2xl w-full max-w-lg p-6 shadow-xl' dir='rtl'>
                <div className='flex items-center justify-between mb-3'>
                  <h3 className='text-lg font-bold'>تفاصيل الرحلة</h3>
                  <button onClick={() => setShowInfoModal(false)} className='text-zinc-400 hover:text-white'>إغلاق</button>
                </div>

                <div className='flex flex-col gap-2 text-sm text-zinc-300 mb-3'>
                  <div className='flex justify-between'><span>المسافة</span><span className='font-bold text-white'>{trip.route ? `${trip.route.distanceKm.toFixed(1)} كم` : '-'}</span></div>
                  <div className='flex justify-between'><span>المدة</span><span className='font-bold text-white'>{trip.route ? `${Math.round(trip.route.durationMin)} دقيقة` : '-'}</span></div>
                  <div className='flex justify-between'><span>السعر تقريبا</span><span className='font-bold text-white'>{trip.route ? `${trip.route.price} ج.م` : '-'}</span></div>
                </div>

                <div className='mb-3'>
                  <p className='text-sm text-zinc-400 mb-2'>موعد الرحلة</p>
                  <div className='flex items-center gap-4'>
                    <label className='flex items-center gap-2'><input type='radio' name='schedule' checked={scheduleType === 'now'} onChange={() => setScheduleType('now')} /> الآن</label>
                    <label className='flex items-center gap-2'><input type='radio' name='schedule' checked={scheduleType === 'later'} onChange={() => setScheduleType('later')} /> لاحقًا</label>
                  </div>
                  {scheduleType === 'later' && (
                    <div className='mt-2 grid grid-cols-2 gap-2'>
                      <select value={scheduleDay} onChange={e => setScheduleDay(e.target.value)} className='bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white'>
                        <option value='today'>اليوم</option>
                        <option value='tomorrow'>غدًا</option>
                      </select>
                      <input value={scheduleTime} onChange={e => setScheduleTime(e.target.value)} type='time' className='bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white' />
                    </div>
                  )}
                </div>

                <div className='mb-3'>
                  <p className='text-sm text-zinc-400 mb-2'>عدد الركاب</p>
                  <input value={passengerCount} onChange={e => setPassengerCount(Math.max(1, Math.min(6, Number(e.target.value || 1))))} type='number' min={1} max={6} className='w-24 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white' />
                </div>

                <div className='mb-3'>
                  <p className='text-sm text-zinc-400 mb-2'>ملاحظات للسائق (اختياري)</p>
                  <textarea value={customerNote} onChange={e => setCustomerNote(e.target.value)} rows={3} className='w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white resize-none' placeholder='مثال: سأحمل شنطة كبيرة' />
                </div>

                <div className='flex gap-2'>
                  <button onClick={() => {
                    // compose ISO datetime limited to today/tomorrow
                    let scheduledTime = null;
                    if (scheduleType === 'later' && scheduleTime) {
                      const dayOffset = scheduleDay === 'tomorrow' ? 1 : 0;
                      const d = new Date();
                      d.setDate(d.getDate() + dayOffset);
                      const [hh, mm] = scheduleTime.split(':');
                      d.setHours(Number(hh || 0), Number(mm || 0), 0, 0);
                      scheduledTime = d.toISOString();
                    }
                    setShowInfoModal(false);
                    onConfirm && onConfirm({ scheduledTime, customerNote, passengerCount });
                  }} className='flex-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-2'>تأكيد واطلب</button>
                  <button onClick={() => setShowInfoModal(false)} className='flex-1 bg-zinc-800 text-zinc-300 rounded-xl py-2'>إغلاق</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default TripPlannerPanel;
