import React from "react";
// import { initiateWebSocket } from "utils/WebSocket";

function Notifications({isPopupOpen, setIsPopupOpen, notificationsCount, setNotificationsCount}){
    const [notifications, setNotifications] = React.useState([]);
    // const webSocket = initiateWebSocket();

    // if (webSocket !== undefined) {
    //     webSocket.onmessage = function (message) {
    //         const _notifications = notifications;
    //         const data = JSON.parse(message.data);

    //         if (data.action !== "notifications") {
    //             return
    //         }

    //         _notifications.push({
    //             header: data.data.key_verbose || data.data.key || null,
    //             body: data.data.body_verbose || JSON.stringify(data.data.message.body),
    //             date: data.time,
    //         });

    //         setNotifications(_notifications);
    //         setNotificationsCount(_notifications.length);
    //     }
    // }

    const handleButtonClick = () => {
        setIsPopupOpen(!isPopupOpen);
        setNotificationsCount(0);
    };

    return (
        <div className="w-[220px]">
            <div className="mt-2 px-5 pb-4 text-xl font-semibold" onClick={handleButtonClick}>
              Notifications{notificationsCount > 0 && ` (${notificationsCount})`}
            </div>
            <div className="max-h-[330px] overflow-auto">
              <ul>
                {notifications.map((notification, index) => (
                  <li
                      className={`px-5 ${index + 1 !== notifications.length ? "pb-2" : ""}`}
                      key={notification.date + notification.header}
                  >
                      <div className="pb-1 leading-none font-medium">{notification.header}</div>
                      <div>{notification.body}</div>
                  </li>
                ))}
              </ul>
            </div>
            <button className="btn-primary mt-4 w-full" onClick={handleButtonClick}>Close</button>
        </div>
    )
}

export default Notifications;