'use client';
import { useContext, useState, useEffect, createContext } from "react";

type Notification = {
    content: string,
    type: 'error' | 'info' |'success' | 'warning'
}

const NotificationContext = createContext({
    notifications: [{content: '', type: ''}],
    addNotification: ({content, type}: Notification) => {},
    removeNotification: (i: number) => {}
})

export const useNotifs = () => {
    return useContext(NotificationContext);
}

export const NotificationProvider = ({ children }: {
    children: React.ReactNode
}) => {

    useEffect(() => {
        const interval = setInterval(() => {
            removeNotifications(0);
        }, 3000);
        return () => clearInterval(interval);
    })

    const [notifications, setNotifications] = useState<Notification[]>([]);

    const addNotifications = (notification: Notification) => {
        setNotifications([...notifications, notification]);
    }

    const removeNotifications = (index: number) => {
        const notifs = notifications.filter((n, i) => i !== index);
        setNotifications(notifs);
    }

    return(
        <NotificationContext.Provider value={{
            notifications,
            addNotification: addNotifications,
            removeNotification: removeNotifications
        }}>
            {children}
        </NotificationContext.Provider>
    )
}