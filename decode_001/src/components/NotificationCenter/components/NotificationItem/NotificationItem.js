import React, { useEffect, useRef } from 'react'

import moment from 'moment'

// Styles
import styles from './NotificationItem.module.scss'

function NotificationItem({ id, notification, notifications, setNotifications }) {

    // ~similar thought process to the parent component~
    // This function handles the onClick event when clicking a notification
    // It simply loops through 'notifications's prevstate and check if the id is equal to the index in the 'notifications's array
    // Since this is inside 'setNotifications', at the end it returns the 'newState' has the 'setNotifications' parameter
    function handleClick() {
        setNotifications(prevState => {
            const newState = prevState.map(currnot => {

                // I feel that there must be a better approach to this
                // because if there was an option to delete a notification
                // this would be problematic because then it would exist mismatch id and indexesOf'
                // I might comeback to this on a later date
                if (prevState.indexOf(currnot) === id) {
                    return { ...currnot, read: true };
                }

                return currnot;
            });

            return newState;
        })
    }

    // This function returns the elements that builds each notifications type
    // Which text should be put inside the notification title? "reacted to post" or "left group"?
    // This functions handles that by checking the type of notification
    function renderMessage(currentNotification, isAlt) {

        // This 'isAlt' parameter checks if the type of notification is normal
        // (normal being just text)
        // or if the notification has other elements attached, such as images or message, which require a different layout 
        if (!isAlt) {
            switch (currentNotification.state.name) {
                case "reactedPost":
                    return (
                        <span className={`${styles.state} ${styles.reactedPost}`}>{` ${currentNotification.post.title}`}</span>
                    )
                case "joinedGroup":
                    return (
                        <span className={`${styles.state} ${styles.joinedGroup}`}>{` ${currentNotification.group_name}`}</span>
                    )
                case "leftGroup":
                    return (
                        <span className={`${styles.state} ${styles.leftGroup}`}>{` ${currentNotification.group_name}`}</span>
                    )

                default:
                    break;
            }
        } else {
            switch (currentNotification.state.name) {
                case "sentMessage":
                    return (
                        <span className={`${styles.state} ${styles.sentMessage}`}>{` ${currentNotification.message_received}`}</span>
                    )
                case "commentedPicture":
                    return (
                        <span className={`${styles.state} ${styles.commentedPicture}`}>
                            <img src={currentNotification.post.picture} alt={currentNotification.post.title} />
                        </span>
                    )

                default:
                    break;
            }
        }

    }

    // Using momentjs it's pretty easy to do this "time" calculations
    // Basically this function receives a date and returns a string saying how long ago it was 
    function renderTime(currentNotificationTime) {
        return moment(currentNotificationTime).fromNow()
    }

    return (
        <div id={id} className={`${styles.container} ${!notification.read ? styles.unread : ""}`} onClick={handleClick}>
            <img className={styles.avatar} src={notification.user.photo} alt={`${notification.user.name}'s avatar`} />
            <div className={`${styles.content} ${notification.state.name == "sentMessage" ? styles.alt : ""}`}>
                <div className={styles.titleWrapper}>
                    <p className={styles.title}>
                        <span className={styles.userName}>{notification.user.name} </span>
                        {notification.state.message}
                        {renderMessage(notification, false)}
                    </p>
                    <span className={styles.time}>{renderTime(notification.timestamp)}</span>
                </div>
                {renderMessage(notification, true)}
            </div>
        </div>
    )
}

export default NotificationItem