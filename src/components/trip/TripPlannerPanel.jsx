import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faMapPin, faPlus, faTrash, faSpinner, faRoute, faBookmark, faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';

const PinRow = ({ title, color, icon, pin, placeholder, isEditing, onEdit, onRemove }) => (
  <div className={`flex flex-col gap-1 p-2 rounded-xl transition-all duration-300 ${isEditing ? 'bg-zinc-800/80 border border-emerald-500/50 shadow-inner' : 'bg-transparent'}`}>
    <div className='flex items-center justify-between px-1'>
      <span className={`text-[11px] font-bold ${isEditing ? 'text-emerald-400' : 'text-zinc-500'}`}>{title}</span>
      {onRemove && (
        <button onClick={onRemove} className='text-red-400 hover:text-red-300 bg-red-950/30 w-6 h-6 rounded-full flex items-center justify-center transition-colors'>
          <FontAwesomeIcon icon={faTrash} className='text-[10px]' />
        </button>
      )}
    </div>
    <div dir='ltr' className='flex items-center gap-3'>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${color}`}>
        <FontAwesomeIcon icon={icon} className='text-xs' />
      </div>
      <button onClick={onEdit} className='flex-1 min-w-0 text-right' dir='rtl'>
        <p className={`text-sm truncate ${pin ? 'text-white font-medium' : 'text-zinc-400'} ${isEditing ? 'animate-pulse' : ''}`}>{pin?.name || placeholder}</p>
      </button>
    </div>
  </div>
);

const TripPlannerPanel = ({ trip, pickTarget, onSetPickTarget, onRemoveWaypoint, onConfirm, resolving, requesting, routeOptions, selectedRouteIndex, shortestRouteIndex, showRouteOptions, onSelectRouteOption, proximity, showProximityNote, onProximityNoteChange, savedTrips, onToggleSaveTrip, isTripSaved, onLoadSavedTrip, onRemoveSavedTrip }) => {
  const canConfirm = !!trip.startPin && !!trip.endPin && !resolving && !pickTarget;
  const MAX_DISTANCE = 100;
  const isTooFar = proximity.distanceM !== null && proximity.distanceM > MAX_DISTANCE;

  // 2. حدد هل الزرار المفروض يكون مقفول؟
  // الزرار يتقفل لو (البيانات ناقصة) أو (بيعمل Request) أو (هو بعيد جداً)
  const isButtonDisabled = !canConfirm || requesting || isTooFar;

  

  return (
    // 🌟 نزلنا الديف لتحت (bottom-6) وأخفينا السكرول بار بالكلاسات دي: [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
    <div dir='rtl' className='absolute bottom-6 left-3 right-3 z-30 bg-zinc-900 border border-zinc-700/40 rounded-3xl p-4 shadow-2xl flex flex-col gap-3 max-h-[70vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
      {/* 🌟 بانرات توجيهية مع زراير تأكيد يدوية */}
      {pickTarget === 'start' && (
        <div className='flex flex-col gap-2 mb-1'>
          <div className='bg-emerald-500/10 text-emerald-400 font-bold text-center py-2.5 rounded-xl text-sm border border-emerald-500/30 flex items-center justify-center gap-2'>
            <FontAwesomeIcon icon={faLocationDot} className='animate-bounce' /> حدد نقطة البداية من الخريطة
          </div>
          {trip.startPin && (
            <button onClick={() => onSetPickTarget('end')} className='bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-2.5 text-sm font-bold transition-all shadow-lg flex justify-center items-center gap-2'>
              تأكيد نقطة البداية <FontAwesomeIcon icon={faCheck} />
            </button>
          )}
        </div>
      )}

      {pickTarget === 'end' && (
        <div className='flex flex-col gap-2 mb-1'>
          <div className='bg-red-500/10 text-red-400 font-bold text-center py-2.5 rounded-xl text-sm border border-red-500/30 flex items-center justify-center gap-2'>
            <FontAwesomeIcon icon={faLocationDot} className='animate-bounce' /> حدد نقطة الوصول من الخريطة
          </div>
          {trip.endPin && (
            <button onClick={() => onSetPickTarget(null)} className='bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-2.5 text-sm font-bold transition-all shadow-lg flex justify-center items-center gap-2'>
              تأكيد نقطة الوصول <FontAwesomeIcon icon={faCheck} />
            </button>
          )}
        </div>
      )}

      {pickTarget?.waypoint && (
        <div className='flex flex-col gap-2 mb-1'>
          <div className='bg-blue-500/10 text-blue-400 font-bold text-center py-2.5 rounded-xl text-sm border border-blue-500/30 flex items-center justify-center gap-2'>
            <FontAwesomeIcon icon={faMapPin} className='animate-bounce' /> حدد موقع المحطة من الخريطة
          </div>
          <button onClick={() => onSetPickTarget(null)} className='bg-blue-600 hover:bg-blue-500 text-white rounded-xl py-2.5 text-sm font-bold transition-all shadow-lg flex justify-center items-center gap-2'>
            تأكيد المحطة <FontAwesomeIcon icon={faCheck} />
          </button>
        </div>
      )}

      {/* الرحلات المحفوظة */}
      {savedTrips?.length > 0 && !trip.startPin && !trip.endPin && (
        <div className='flex flex-col gap-1.5'>
          <p className='text-[11px] text-zinc-500 font-medium'>رحلاتي المحفوظة</p>
          <div className='flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
            {savedTrips.map(saved => (
              <div key={saved.id} className='shrink-0 max-w-[200px] bg-zinc-800/70 border border-zinc-700/40 rounded-xl pr-2 pl-1 py-2 flex items-center gap-2'>
                <button
                  onClick={() => {
                    onLoadSavedTrip(saved);
                    onSetPickTarget(null);
                  }}
                  className='text-right min-w-0'>
                  <p className='text-xs font-medium text-white truncate'>{saved.startPin?.name}</p>
                  <p className='text-[10px] text-zinc-400 truncate'>→ {saved.endPin?.name}</p>
                </button>
                <button onClick={() => onRemoveSavedTrip(saved.id)} className='text-zinc-500 hover:text-red-400 shrink-0 w-5 h-5 flex items-center justify-center'>
                  <FontAwesomeIcon icon={faXmark} className='text-[10px]' />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <PinRow title='نقطة البداية' color='bg-emerald-500/15 text-emerald-400' icon={faLocationDot} pin={trip.startPin} placeholder='اضغط هنا لتعديل نقطة البداية' isEditing={pickTarget === 'start'} onEdit={() => onSetPickTarget(pickTarget === 'start' ? null : 'start')} />

      {trip.waypoints?.map((wp, i) => (
        <PinRow key={i} title={`محطة في الطريق ${i + 1}`} color='bg-blue-500/15 text-blue-400' icon={faMapPin} pin={wp} placeholder='حدد المحطة...' isEditing={false} onEdit={() => {}} onRemove={() => onRemoveWaypoint(i)} />
      ))}

      <PinRow title='نقطة النهاية' color='bg-red-500/15 text-red-400' icon={faLocationDot} pin={trip.endPin} placeholder='اضغط هنا لتحديد نقطة الوصول' isEditing={pickTarget === 'end'} onEdit={() => onSetPickTarget(pickTarget === 'end' ? null : 'end')} />

      {!pickTarget?.waypoint && (
        <button onClick={() => onSetPickTarget({ waypoint: true })} className='flex items-center justify-center gap-2 border border-dashed border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 rounded-xl py-2 text-xs font-medium active:scale-[0.99] transition-all mt-1'>
          <FontAwesomeIcon icon={faPlus} className='text-[10px]' /> إضافة محطة في الطريق
        </button>
      )}

      {showRouteOptions && !pickTarget && (
        <div className='flex gap-2 mt-2'>
          <button onClick={() => onSelectRouteOption(0)} className={`flex-1 rounded-xl py-2 text-xs font-bold border transition-colors ${selectedRouteIndex === 0 ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-zinc-800/60 border-zinc-700/40 text-zinc-300'}`}>
            الأسرع
          </button>
          <button onClick={() => onSelectRouteOption(shortestRouteIndex)} className={`flex-1 rounded-xl py-2 text-xs font-bold border transition-colors ${selectedRouteIndex === shortestRouteIndex ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-zinc-800/60 border-zinc-700/40 text-zinc-300'}`}>
            الأقصر
          </button>
        </div>
      )}

      {(resolving || trip.route) && !pickTarget && (
        <div className='flex items-center justify-between bg-zinc-800/70 border border-zinc-700/40 rounded-xl px-4 py-3 text-xs mt-1'>
          {resolving ? (
            <span className='flex items-center gap-2 text-zinc-400'>
              <FontAwesomeIcon icon={faSpinner} className='animate-spin' /> جارٍ حساب أفضل طريق...
            </span>
          ) : (
            <>
              <span className='flex items-center gap-1.5 text-zinc-300'>
                <FontAwesomeIcon icon={faRoute} className='text-emerald-400' /> {trip.route.distanceKm.toFixed(1)} كم · {Math.round(trip.route.durationMin)} دقيقة
              </span>
              <span className='font-bold text-white text-sm'>{trip.route.price} ج.م</span>
            </>
          )}
        </div>
      )}

      {showProximityNote && proximity?.needsNote && !pickTarget && (
        <div className='bg-red-500/10 border border-red-500/30 rounded-xl p-3 flex flex-col gap-2 mt-1 animate-fade-in'>
          <p className='text-[11px] text-red-300 font-medium'>
            {proximity.failed ? 'تعذر تأكيد موقعك الحالي - ' : `يبدو أنك بعيد عن نقطة الانطلاق بحوالي ${Math.round(proximity.distanceM)} متر - `}
            برجاء كتابة سبب ذلك للكابتن لتجنب الإلغاء
          </p>
          <textarea value={proximity.note} onChange={e => onProximityNoteChange(e.target.value)} placeholder='مثال: هكون في المكان كمان ٥ دقايق...' rows={2} className='bg-zinc-800 border border-zinc-700/60 rounded-lg px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-red-500 text-white placeholder:text-zinc-500 resize-none' />
        </div>
      )}

      {/* زراير الطلب والحفظ بنخفيها لو هو لسه بيختار نقط عشان نركز انتباهه على التأكيد */}
      {!pickTarget && (
        <div className='flex flex-col gap-2 mt-1 animate-fade-in'>
          {/* رسالة التنبيه لو هو بعيد (بتظهر فقط لو بعيد) */}
          {isTooFar && <p className='text-[11px] text-red-400 text-center bg-red-950/20 py-1 px-2 rounded-lg border border-red-500/20'>أنت بعيد عن نقطة البداية ({Math.round(proximity.distanceM)} متر). يرجى الاقتراب لطلب الرحلة.</p>}

          <div className='flex gap-2'>
            <button
              onClick={onConfirm}
              disabled={isButtonDisabled} // الزرار هيتقفل هنا
              className={`flex-1 rounded-2xl py-3 text-sm font-bold transition-all shadow-lg 
          ${isButtonDisabled ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700' : 'bg-emerald-600 hover:bg-emerald-500 text-white'}`}>
              {requesting ? 'جارِ إرسال الطلب...' : isTooFar ? 'بعيد عن الموقع' : 'طلب الرحلة'}
            </button>

            {/* زرار الحفظ */}
            {!isTooFar && trip.startPin && trip.endPin && (
              <button
                onClick={onToggleSaveTrip}
                // ... نفس الكود القديم للزرار
              >
                <FontAwesomeIcon icon={faBookmark} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TripPlannerPanel;
