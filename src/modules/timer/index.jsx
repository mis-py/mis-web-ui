import React from "react";
import { useTimerLeadMutation } from "redux/index";
import { toast } from "react-toastify";

import { firstUppercase } from "config/functions";
import PageHeader from "../../components/common/PageHeader";

const Timer = () => {
  const [timerLead] = useTimerLeadMutation();

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
    if (
      timerValues.name === "" &&
      timerValues.last === "" &&
      timerValues.phone === ""
    ) {
      toast.error("Error new lead");
    } else {
      await timerLead(timerValues).unwrap();
      toast.success("Create new lead");
    }
  };

  return (
    <>
      <div className="py-6 min-h-screen h-full flex flex-col justify-between">
        <div className="flex flex-col">
          <PageHeader
            header="Timer"
          />
          <form className="my-4 pb-[50px]">
            {Object.entries(timerValues).map(([key, value]) => (
              <label
                key={key}
                className={`flex flex-col gap-1 mb-4 relative`}
                htmlFor="id"
              >
                {firstUppercase(key)}
                <input
                  autoComplete="off"
                  type="text"
                  className={`bg-blackSecond  rounded px-3 py-2 focus-visible:outline-none border-none`}
                  name={key}
                  id={key}
                  value={value}
                  onChange={(e) =>
                    setTimerValues({ ...timerValues, [key]: e.target.value })
                  }
                />
              </label>
            ))}

            {/* <label
              className={`flex flex-col gap-1 mb-4 relative`}
              htmlFor="name"
            >
              Name
              <input
                autoComplete="off"
                type="text"
                className={`bg-blackSecond  rounded px-3 py-2 focus-visible:outline-none border-none`}
                name="name"
                id="name"
              />
            </label>
            <label
              className={`flex flex-col gap-1 mb-4 relative`}
              htmlFor="last"
            >
              Last
              <input
                autoComplete="off"
                type="text"
                className={`bg-blackSecond  rounded px-3 py-2 focus-visible:outline-none border-none`}
                name="last"
                id="last"
              />
            </label>
            <label
              className={`flex flex-col gap-1 mb-4 relative`}
              htmlFor="phone"
            >
              Phone
              <input
                autoComplete="off"
                type="text"
                className={`bg-blackSecond  rounded px-3 py-2 focus-visible:outline-none border-none`}
                name="phone"
                id="phone"
              />
            </label>
            <label className={`flex flex-col gap-1 mb-4 relative`} htmlFor="ip">
              Ip
              <input
                autoComplete="off"
                type="text"
                className={`bg-blackSecond  rounded px-3 py-2 focus-visible:outline-none border-none`}
                name="ip"
                id="ip"
              />
            </label> */}
          </form>
        </div>

        <div className="fixed w-full left-0 bottom-0 px-5 pb-6 bg-backGround lg:w-[1025px] lg:max-w-[-webkit-fill-available] lg:left-[345px]">
          <button onClick={handleTimerLead} className="btn-primary">
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default Timer;
