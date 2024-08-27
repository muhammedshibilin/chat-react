import { useContext, useState } from "react";
import { AuthContext } from "/src/context/AuthContext.jsx";
import { ChatContext } from "/src/context/ChatContext.jsx";
import { unreadNotification } from "/src/utils/unReadNotifiaction";
import moment from "moment";

const Notification = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useContext(AuthContext);
    const { notification, userChats, allUsers } = useContext(ChatContext);

    console.log('notiii',notification);

    const notificationsArray = notification || [];

    // Calculate unread notifications
    const unReadNotifications = unreadNotification(notificationsArray) || [];
    
    // Map through notifications to add sender names
    const modifiedNotification = notificationsArray.map((n) => {
        const sender = allUsers ? allUsers.find(user => user._id === n.senderId) : null;
    
        return {
            ...n,
            senderName: sender ? sender.name : 'Unknown',
        };
    });

    // Toggle notification box visibility
    const toggleNotification = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="notifications" onClick={toggleNotification}>
            <div className="notifications-icon">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chat-left-fill"
                    viewBox="0 0 16 16"
                >
                    <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
                </svg>
                {unReadNotifications.length > 0 && (
                    <span className="notification-count">
                        <span>{unReadNotifications.length}</span>
                    </span>
                )}
            </div>
            {isOpen && (
                <div className="notification-box">
                    <div className="notification-header">
                        <h3>Notifications</h3>
                        <div className="mark-as-read">Mark all as read</div>
                    </div>
                    {modifiedNotification && modifiedNotification.map((n, index) => (
                        <div key={index} className={n.isRead ? 'notification' : 'notification not-read'}>
                            <span className="notification-time">{moment(n.date).calendar()}</span>
                            <span className="notification-sender">{n.senderName}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Notification;
