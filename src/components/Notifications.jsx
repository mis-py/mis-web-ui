import React, {useEffect, useState} from "react";

function Notifications({isPopupOpen, setIsPopupOpen, notificationsCount, setNotificationsCount}){
    const notifications =[
        {id: 1, text: 'Уведомление 1'},
        {id: 2, text: 'Уведомление 2'},
        {id: 3, text: 'Уведомление 3'},
    ];

    const handleButtonClick = () => {
        setIsPopupOpen(!isPopupOpen);
        setNotificationsCount(0);
    };

    return (
        <div>
          <button onClick={handleButtonClick}>
            Уведомления {notificationsCount > 0 && `(${notificationsCount})`}
          </button>
          {isPopupOpen && (
            <div>
              <ul>
                {notifications.map(notification => (
                  <li key={notification.id}>{notification.text}</li>
                ))}
              </ul>
              <button onClick={handleButtonClick}>Закрыть</button>
            </div>
          )}
        </div>
    )
}

export default Notifications;