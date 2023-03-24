<<<<<<< HEAD
import React from 'react'
// import PulseLoader from "react-spinners/PulseLoader";
import { useLeadEdpointMutation } from 'redux/index';
=======
import React from "react";
import { useTimerLeadMutation } from "redux/index";
import { toast } from "react-toastify";
>>>>>>> 47e2534a4d687cadee5c3c14655564b1129a535a

const Timer = () => {
  const [timerLead] = useLeadEdpointMutation();

  const [timerValues, setTimerValues] = React.useState({
    id: "",
    name: "",
    last: "",
    phone: "",
    ip: "",
    ua: "",
    country: "",
    us: "",
    uc: "",
    un: "",
    ut: "",
    um: "",
    subid: "",
    flow_id: "",
    offer_id: "",
    landing: "",
    email: "",
    old_email: "",
    aflw: "",
    referer: "",
    cookie: "",
    origin: "",
    time: "",
    status: "",
    pin: "",
  });

  const handleTimerLead = async (e) => {
    e.preventDefault();
    await timerLead({ ...timerValues }).unwrap();
    toast.success("Create new lead")
  };

  return (
    <>
      <div className="mb-6">
        <label
          htmlFor="id"
          className="block mb-2 mt-10 text-lg font-medium text-d-900 dark:text-white"
        >
          ID
        </label>
        <input
          type="text"
          id="id"
          name="id"
          value={timerValues.id}
          onChange={(e) =>
            setTimerValues({ ...timerValues, id: e.target.value })
          }
          className="block w-full p-4 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="name"
          className="block mb-2 mt-10 text-lg font-medium text-d-900 dark:text-white"
        >
          NAME
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={timerValues.name}
          onChange={(e) =>
            setTimerValues({ ...timerValues, name: e.target.value })
          }
          className="block w-full p-4 text-black border border-primary rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="last"
          className="block mb-2 mt-10 text-lg font-medium text-d-900 dark:text-white"
        >
          LAST
        </label>
        <input
          type="text"
          id="last"
          name="last"
          value={timerValues.last}
          onChange={(e) =>
            setTimerValues({ ...timerValues, last: e.target.value })
          }
          className="block w-full p-4 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="phone"
          className="block mb-2 mt-10 text-lg font-medium text-d-900 dark:text-white"
        >
          PHONE
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={timerValues.phone}
          onChange={(e) =>
            setTimerValues({ ...timerValues, phone: e.target.value })
          }
          className="block w-full p-4 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="ip"
          className="block mb-2 mt-10 text-lg font-medium text-d-900 dark:text-white"
        >
          IP
        </label>
        <input
          type="text"
          id="ip"
          name="ip"
          value={timerValues.ip}
          onChange={(e) =>
            setTimerValues({ ...timerValues, ip: e.target.value })
          }
          className="block w-full p-4 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="ua"
          className="block mb-2 mt-10 text-lg font-medium text-d-900 dark:text-white"
        >
          UA
        </label>
        <input
          type="text"
          id="ua"
          name="ua"
          value={timerValues.ua}
          onChange={(e) =>
            setTimerValues({ ...timerValues, ua: e.target.value })
          }
          className="block w-full p-4 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="country"
          className="block mb-2 mt-10 text-lg font-medium text-d-900 dark:text-white"
        >
          COUNTRY
        </label>
        <input
          type="text"
          id="country"
          name="country"
          value={timerValues.country}
          onChange={(e) =>
            setTimerValues({ ...timerValues, country: e.target.value })
          }
          className="block w-full p-4 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="us"
          className="block mb-2 mt-10 text-lg font-medium text-d-900 dark:text-white"
        >
          US
        </label>
        <input
          type="text"
          id="us"
          name="us"
          value={timerValues.us}
          onChange={(e) =>
            setTimerValues({ ...timerValues, us: e.target.value })
          }
          className="block w-full p-4 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="uc"
          className="block mb-2 mt-10 text-lg font-medium text-d-900 dark:text-white"
        >
          UC
        </label>
        <input
          type="text"
          id="uc"
          name="uc"
          value={timerValues.uc}
          onChange={(e) =>
            setTimerValues({ ...timerValues, uc: e.target.value })
          }
          className="block w-full p-4 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="un"
          className="block mb-2 mt-10 text-lg font-medium text-d-900 dark:text-white"
        >
          UN
        </label>
        <input
          type="text"
          id="un"
          name="un"
          value={timerValues.un}
          onChange={(e) =>
            setTimerValues({ ...timerValues, un: e.target.value })
          }
          className="block w-full p-4 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="ut"
          className="block mb-2 mt-10 text-lg font-medium text-d-900 dark:text-white"
        >
          UT
        </label>
        <input
          type="text"
          id="ut"
          name="ut"
          value={timerValues.ut}
          onChange={(e) =>
            setTimerValues({ ...timerValues, ut: e.target.value })
          }
          className="block w-full p-4 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="um"
          className="block mb-2 mt-10 text-lg font-medium text-d-900 dark:text-white"
        >
          UM
        </label>
        <input
          type="text"
          id="um"
          name="um"
          value={timerValues.um}
          onChange={(e) =>
            setTimerValues({ ...timerValues, um: e.target.value })
          }
          className="block w-full p-4 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="subid"
          className="block mb-2 mt-10 text-lg font-medium text-d-900 dark:text-white"
        >
          SUBID
        </label>
        <input
          type="text"
          id="subid"
          name="subid"
          value={timerValues.subid}
          onChange={(e) =>
            setTimerValues({ ...timerValues, subid: e.target.value })
          }
          className="block w-full p-4 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="flow_id"
          className="block mb-2 mt-10 text-lg font-medium text-d-900 dark:text-white"
        >
          FLOW_ID
        </label>
        <input
          type="text"
          id="flow_id"
          name="flow_id"
          value={timerValues.flow_id}
          onChange={(e) =>
            setTimerValues({ ...timerValues, flow_id: e.target.value })
          }
          className="block w-full p-4 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="offer_id"
          className="block mb-2 mt-10 text-lg font-medium text-d-900 dark:text-white"
        >
          OFFER_ID
        </label>
        <input
          type="text"
          id="offer_id"
          name="offer_id"
          value={timerValues.offer_id}
          onChange={(e) =>
            setTimerValues({ ...timerValues, offer_id: e.target.value })
          }
          className="block w-full p-4 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="landing"
          className="block mb-2 mt-10 text-lg font-medium text-d-900 dark:text-white"
        >
          LANDING
        </label>
        <input
          type="text"
          id="landing"
          name="landing"
          value={timerValues.landing}
          onChange={(e) =>
            setTimerValues({ ...timerValues, landing: e.target.value })
          }
          className="block w-full p-4 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 mt-10 text-lg font-medium text-d-900 dark:text-white"
        >
          EMAIL
        </label>
        <input
          type="text"
          id="email"
          name="email"
          value={timerValues.email}
          onChange={(e) =>
            setTimerValues({ ...timerValues, email: e.target.value })
          }
          className="block w-full p-4 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="old_email"
          className="block mb-2 mt-10 text-lg font-medium text-d-900 dark:text-white"
        >
          OLD_EMAIL
        </label>
        <input
          type="text"
          id="old_email"
          name="old_email"
          value={timerValues.old_email}
          onChange={(e) =>
            setTimerValues({ ...timerValues, old_email: e.target.value })
          }
          className="block w-full p-4 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="aflw"
          className="block mb-2 mt-10 text-lg font-medium text-d-900 dark:text-white"
        >
          AFLW
        </label>
        <input
          type="text"
          id="aflw"
          name="aflw"
          value={timerValues.aflw}
          onChange={(e) =>
            setTimerValues({ ...timerValues, aflw: e.target.value })
          }
          className="block w-full p-4 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="referer"
          className="block mb-2 mt-10 text-lg font-medium text-d-900 dark:text-white"
        >
          REFERER
        </label>
        <input
          type="text"
          id="referer"
          name="referer"
          value={timerValues.referer}
          onChange={(e) =>
            setTimerValues({ ...timerValues, referer: e.target.value })
          }
          className="block w-full p-4 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="cookie"
          className="block mb-2 mt-10 text-lg font-medium text-d-900 dark:text-white"
        >
          COOKIE
        </label>
        <input
          type="text"
          id="cookie"
          name="cookie"
          value={timerValues.cookie}
          onChange={(e) =>
            setTimerValues({ ...timerValues, cookie: e.target.value })
          }
          className="block w-full p-4 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="origin"
          className="block mb-2 mt-10 text-lg font-medium text-d-900 dark:text-white"
        >
          ORIGIN
        </label>
        <input
          type="text"
          id="origin"
          name="origin"
          value={timerValues.origin}
          onChange={(e) =>
            setTimerValues({ ...timerValues, origin: e.target.value })
          }
          className="block w-full p-4 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="time"
          className="block mb-2 mt-10 text-lg font-medium text-d-900 dark:text-white"
        >
          TIME
        </label>
        <input
          type="text"
          id="time"
          name="time"
          value={timerValues.time}
          onChange={(e) =>
            setTimerValues({ ...timerValues, time: e.target.value })
          }
          className="block w-full p-4 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="status"
          className="block mb-2 mt-10 text-lg font-medium text-d-900 dark:text-white"
        >
          STATUS
        </label>
        <input
          type="text"
          id="status"
          name="status"
          value={timerValues.status}
          onChange={(e) =>
            setTimerValues({ ...timerValues, status: e.target.value })
          }
          className="block w-full p-4 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="pin"
          className="block mb-2 mt-10 text-lg font-medium text-d-900 dark:text-white"
        >
          PIN
        </label>
        <input
          type="text"
          id="pin"
          name="pin"
          value={timerValues.pin}
          onChange={(e) =>
            setTimerValues({ ...timerValues, pin: e.target.value })
          }
          className="block w-full p-4 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

<<<<<<< HEAD

      {/* <div className="w-full left-0 bottom-0 pb-6 pt-14 bg-backGround lg:w-[1025px] lg:max-w-[-webkit-fill-available] lg:left-[345px]">
        <button onClick={SaveSettings} className="btn-primary">Save</button>
      </div> */}
=======
      <div className="w-full left-0 bottom-0 pb-6 pt-14 bg-backGround lg:w-[1025px] lg:max-w-[-webkit-fill-available] lg:left-[345px]">
        <button onClick={handleTimerLead} className="btn-primary">
          Save
        </button>
      </div>
>>>>>>> 47e2534a4d687cadee5c3c14655564b1129a535a
    </>
  );
};

export default Timer;
