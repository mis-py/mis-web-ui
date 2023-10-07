import React from 'react';
import {
    useGetNotificationsQuery,
    // useKeySubscribeMutation,
 } from 'redux/index';
import SpinnerLoader from "../../../components/common/SpinnerLoader";
import ListItemWrapper from "../../../components/common/ListItemWrapper";
import PageHeader from 'components/common/PageHeader';
import { toast } from "react-toastify";

const NotificationsList = () => {
    const { data: getNotifications, isLoading: loadingGetNotifications } = useGetNotificationsQuery();
    const [checkedCheckboxes, setCheckedCheckboxes] = React.useState({});

    React.useEffect(() => {
        if (getNotifications !== undefined) {
            const _checkedCheckboxes = {};

            Object.values(getNotifications).forEach(notificationItem => {
                _checkedCheckboxes[notificationItem.id] = notificationItem.is_subscribed !== undefined && notificationItem.is_subscribed === true;
            });

            setCheckedCheckboxes(_checkedCheckboxes);
        }
    }, [getNotifications]);

    // const [keySubscribe] = useKeySubscribeMutation();

    const handleCheckboxChange = (e) => {
        const _checkedCheckboxes = JSON.parse(JSON.stringify(checkedCheckboxes));
        const notifId = e.target.getAttribute("name").split("-")[1];
        _checkedCheckboxes[notifId] = !_checkedCheckboxes[notifId];
        setCheckedCheckboxes(_checkedCheckboxes);
    };

  const handleKeySubscribe = async (e) => {
    e.preventDefault();
    const checkedNotifications = [];

    Object.entries(checkedCheckboxes).forEach(([key, val]) => {
        if (val === true) {
            checkedNotifications.push(parseInt(key));
        }
    });
    // await keySubscribe({
    //     body: checkedNotifications,
    //   }).then((data) => {
    //     if (
    //       data.error !== undefined &&
    //       (data.error.data.message !== undefined ||
    //         data.error.data.detail !== undefined)
    //     ) {
    //       console.error(
    //         data.error.data.message === undefined
    //           ? data.error.data.detail
    //           : data.error.data.message
    //       );
    //       toast.error("Notifications settings were not saved");
    //     } else {
    //       toast.success("Notifications settings were saved");
    //     }
    //   });
  };

  return (<>
    <span style={{color: 'red'}}>STILL IN WIP!</span>
    <form onSubmit={handleKeySubscribe} className="flex flex-col gap-4 pb-16 overflow-y-auto">
      {getNotifications !== undefined && getNotifications.map((item) => (
        <ListItemWrapper
          key={item.id}
        >
            <div className="flex justify-between pb-3 border-b border-backGround">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <div className="text-gray text-xs">
                        Notification key:
                        </div>
                        <h4>{item.key}</h4>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-gray text-xs">
                        App name:
                        </div>
                        <h4>{item.app.name}</h4>
                    </div>
                </div>
                <div className="flex flex-col divide-y-2 divide-gray-100">
                    {/* <input
                        name={`notifications-${item.id}`}
                        type="checkbox"
                        checked={checkedCheckboxes[item.id]}
                        onChange={handleCheckboxChange}
                        className="bg-transparent cursor-pointer
                        w-5 h-5 border border-primary focus:ring-offset-0 
                        !shadow-none focus:!outline-none focus:!ring-0 focus:!shadow-none active:!outline-none focus-visible:!outline-none rounded"
                    /> */}
                </div>
            </div>
            
        </ListItemWrapper>
        ))}

        <div className="flex lg:max-w-[-webkit-fill-available]">
            <button onClick={handleKeySubscribe} className="btn">
                Save notification settings
            </button>
        </div>
    </form>
    </>
  )
}


export default NotificationsList;
