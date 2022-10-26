import React, { useEffect, useState } from 'react'

// Styles
import styles from './NotificationCenter.module.scss'

// Components
import NotificationItem from './components/NotificationItem'

function NotificationCenter({ notifications, setNotifications }) {

    // Set unread notifications number
    const [unreadNotif, setUnreadNotif] = useState(0)

    function countUnread() {
        var unread = 0

        // Loop through all notification and check if notification has read = false
        // if read = false, then add to the variable declared before (var unread)
        notifications.forEach(currNotif => {
            !currNotif.read && unread++
        });

        // This code only runs after .forEach() is finished
        // so we can safely presume that this number is equal to what the .forEach() loop "returned"
        setUnreadNotif(unread)
    }

    // This will make sure that the function countUnread()
    // will rerun everytime the state 'notifications' change
    // In this case, everytime the 'read' property inside each 'notification' change
    // it will recount the number of notifications unread
    useEffect(() => {
        countUnread()
    }, [notifications])

    // This function handles the onClick event of the 'Mark all as read' button
    // It simply loops through 'notifications' prevstate and change each 'notification''s 'read' property to true
    // Since this is inside 'setNotifications', at the end it returns the 'newState' has the 'setNotifications' parameter
    function handleMarkAllRead() {
        setNotifications(prevState => {
            const newState = prevState.map(currnot => {
                return { ...currnot, read: true };
            });

            return newState;
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <h1>Notifications</h1>
                    <div className={styles.unreadCounterWrapper}>
                        <span>{unreadNotif}</span>
                    </div>
                </div>

                <button
                    className={styles.markallread}
                    // if unread notifications is equal to 0 then disable the button
                    disabled={unreadNotif == 0 ? true : false}
                    onClick={handleMarkAllRead}>
                    Mark all as read
                </button>
            </div>
            <div className={styles.notificationWrapper}>
                {
                    // Loop through all notifications and pass the properties to component
                    notifications.map((notification, i) => (
                        <NotificationItem key={i} id={i} notification={notification} notifications={notifications} setNotifications={setNotifications} />
                    ))
                }
            </div>
        </div>
    )
}

export default NotificationCenter