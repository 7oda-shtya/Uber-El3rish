import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faX } from '@fortawesome/free-solid-svg-icons'

const Setting = ({ isOpen, onClose }) => {
  return (
    <div 
      className={`fixed top-0 bottom-0 left-0 w-[80%] bg-zinc-900 border-r border-zinc-800 p-6 pt-6 z-50 transform transition-transform duration-500 ease-in-out rounded-r-2xl flex flex-col justify-between overflow-hidden
        ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}
    >
      
      <div>
        <div className='flex items-center justify-between mb-8'>
          <h1 className='text-2xl font-bold text-white flex items-center gap-2'>
            <FontAwesomeIcon icon={faGear} className='text-zinc-400' />
            <span className='text-xl font-semibold'>الإعدادات</span>
          </h1>
          <button 
            onClick={onClose}
            className='text-zinc-400 hover:text-white bg-zinc-800/60 rounded-full w-10 h-10 flex items-center justify-center active:scale-95 transition-all'
          >
            <FontAwesomeIcon icon={faX} className='text-sm' />
          </button>
        </div>

        <div className='flex flex-col gap-3'>
          <button className='w-full p-4 bg-zinc-800/40 hover:bg-zinc-800 border border-zinc-800/30 text-right rounded-xl flex justify-between items-center transition-all active:scale-[0.99]'>
            <span className='font-medium'>اللغة</span>
            <span className='text-zinc-500 text-sm'>العربية ❯</span>
          </button>
          <button className='w-full p-4 bg-zinc-800/40 hover:bg-zinc-800 border border-zinc-800/30 text-right rounded-xl flex justify-between items-center transition-all active:scale-[0.99]'>
            <span className='font-medium'>الوضع الداكن</span>
            <span className='text-green-500 text-sm'>مفعل ❯</span>
          </button>
          <button className='w-full p-4 bg-zinc-800/40 hover:bg-zinc-800 border border-zinc-800/30 text-right rounded-xl flex justify-between items-center transition-all active:scale-[0.99]'>
            <span className='font-medium'>التنببهات</span>
            <span className='text-zinc-500'>❯</span>
          </button>
          <button className='w-full p-4 bg-zinc-800/40 hover:bg-zinc-800 border border-zinc-800/30 text-right rounded-xl flex justify-between items-center transition-all active:scale-[0.99]'>
            <span className='font-medium'>تغيير كلمة المرور</span>
            <span className='text-zinc-500'>❯</span>
          </button>
          <button className='w-full p-4 bg-zinc-800/40 hover:bg-zinc-800 border border-zinc-800/30 text-right rounded-xl flex justify-between items-center transition-all active:scale-[0.99]'>
            <span className='font-medium'>مساعدة ودعم</span>
            <span className='text-zinc-500'>❯</span>
          </button>
        </div>
      </div>

      {/* الجزء السفلي: أزرار تسجيل الخروج وحذف الحساب مع الفيرجن */}
      <div className='flex flex-col gap-4 items-center w-full'>
        <div className='flex justify-between items-center w-full gap-4 text-sm'>
          <button className='flex-1 p-3 bg-zinc-800 border border-zinc-700 text-red-500 font-medium rounded-xl active:scale-95 transition-all text-center'>
            تسجيل الخروج
          </button>
          <button className='flex-1 p-3 bg-red-950/30 border border-red-900/40 text-red-400 font-medium rounded-xl active:scale-95 transition-all text-center text-xs'>
            حذف الحساب
          </button>
        </div>
        
        <span className='text-xs text-zinc-600 font-mono tracking-wider'>
          نسخة 1.0.0
        </span>
      </div>

    </div>
  )
}

export default Setting