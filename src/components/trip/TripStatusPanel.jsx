import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar, faStar, faRoute, faClock, faFlagCheckered } from '@fortawesome/free-solid-svg-icons'

const TripStatusPanel = ({ trip, offers, onAccept, onCancel, onFinish }) => {
  const isPending = trip.status === 'pending'

  return (
    <div
      dir='rtl'
      className='absolute bottom-24 left-3 right-3 z-30 bg-zinc-900 border border-zinc-700/40 rounded-3xl p-4 shadow-2xl flex flex-col gap-3 max-h-[60vh] overflow-y-auto'
    >
      <div className='flex items-center justify-between'>
        <h3 className='text-sm font-bold flex items-center gap-2'>
          {isPending ? (
            <>
              <FontAwesomeIcon icon={faClock} className='text-amber-400 animate-pulse' /> جارِ البحث عن سائق...
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faCar} className='text-emerald-400' /> الرحلة جارية
            </>
          )}
        </h3>
        {trip.route && (
          <span className='text-[11px] text-zinc-400 flex items-center gap-1'>
            <FontAwesomeIcon icon={faRoute} /> {trip.route.distanceKm.toFixed(1)} كم
          </span>
        )}
      </div>

      <div className='flex flex-col gap-1.5 text-xs text-zinc-300 bg-zinc-800/50 rounded-xl p-3'>
        <p className='flex items-center gap-2'>
          <span className='w-2 h-2 rounded-full bg-emerald-400 shrink-0' /> {trip.startPin?.name}
        </p>
        {trip.waypoints?.map((wp, i) => (
          <p key={i} className='flex items-center gap-2 text-zinc-400'>
            <span className='w-2 h-2 rounded-full bg-blue-400 shrink-0' /> {wp.name}
          </p>
        ))}
        <p className='flex items-center gap-2'>
          <span className='w-2 h-2 rounded-full bg-red-400 shrink-0' /> {trip.endPin?.name}
        </p>
      </div>

      {isPending ? (
        <div className='flex flex-col gap-2'>
          {offers.length === 0 ? (
            <p className='text-zinc-500 text-xs text-center py-4'>لا يوجد سائقون متاحون حاليًا</p>
          ) : (
            offers.map((offer) => (
              <div key={offer.id} className='flex items-center justify-between gap-3 bg-zinc-800/60 border border-zinc-700/40 rounded-2xl p-3'>
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-semibold truncate'>{offer.driverName}</p>
                  <p className='text-[11px] text-zinc-400 flex items-center gap-2'>
                    <span className='flex items-center gap-1'>
                      <FontAwesomeIcon icon={faStar} className='text-yellow-400' /> {offer.rate}
                    </span>
                    <span>{offer.car}</span>
                    <span>يصل خلال {offer.timeToReach}</span>
                  </p>
                </div>
                <div className='text-left shrink-0 flex flex-col items-end gap-1.5'>
                  <span className='font-bold text-sm'>{offer.price} ج.م</span>
                  <button
                    onClick={() => onAccept(offer)}
                    className='bg-emerald-600 hover:bg-emerald-500 rounded-lg px-3 py-1.5 text-[11px] font-bold transition-colors'
                  >
                    قبول
                  </button>
                </div>
              </div>
            ))
          )}

          <button onClick={onCancel} className='w-full bg-red-950/40 text-red-400 border border-red-900/40 rounded-2xl py-2.5 text-xs font-bold mt-1 transition-colors'>
            إلغاء الطلب
          </button>
        </div>
      ) : (
        <div className='flex flex-col gap-3'>
          <div className='flex items-center justify-between bg-zinc-800/60 border border-zinc-700/40 rounded-2xl p-3'>
            <div>
              <p className='text-sm font-semibold'>{trip.driverName}</p>
              <p className='text-[11px] text-zinc-400'>{trip.car}</p>
            </div>
            <span className='font-bold'>{trip.price} ج.م</span>
          </div>

          {/* TODO: الزر ده مؤقت للتجربة لحد ما الباكاند يبعت إشعار إنهاء حقيقي من تطبيق السائق */}
          <button
            onClick={onFinish}
            className='w-full bg-emerald-600 hover:bg-emerald-500 rounded-2xl py-2.5 text-xs font-bold flex items-center justify-center gap-2 transition-colors'
          >
            <FontAwesomeIcon icon={faFlagCheckered} /> إنهاء الرحلة (تجريبي)
          </button>
        </div>
      )}
    </div>
  )
}

export default TripStatusPanel
