'use client';
import React from 'react'
import { useNotifs } from '@/context/NotificationContext';
import {AnimatePresence, motion} from 'framer-motion'

const Notifications = () => {
  const {notifications, removeNotification} = useNotifs();
  const getBgColor = (type: string) => {
    switch (type) {
      case 'error':
        return'red'
      case'success':
        return 'green'
      case 'warning':
        return 'yellow'
      default:
        return 'orange'
    }
  }
  return (
    <div className='absolute bottom-10 right-5 flex flex-col gap-3'>
        {notifications.map((notification, i) => (
            <AnimatePresence key={i+100}>
                <motion.div key={i} className='px-5 py-3 relative text-white' initial={{x: -100}} animate={{x: 0}} exit={{x: 1000}} style={{backgroundColor: getBgColor(notification.type)}}>
                    <p>{notification.content}</p>
                    <button className='absolute top-1 right-2 text-sm' onClick={() => {removeNotification(i)}}>X</button>
                </motion.div>
            </AnimatePresence>
        ))}
    </div>
  )
}

export default Notifications