import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserLogoutMutation } from "redux/index";
import { FiUser, FiLogOut, FiBell } from "react-icons/fi";
import MisButton from "components/MisButton";

const TopBar = () => {
    const navigate = useNavigate();
    const [userLogout] = useUserLogoutMutation();
    const [isPopupOpen, setIsPopupOpen] = React.useState(false);

    const handleLogOut = async (e) => {
        await userLogout().then(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user_id");
          localStorage.removeItem("username");
          window.location.reload();
        });
      };

    const topBar = [
        { icon: <FiBell />, title: "Notifications" , clickEvent: () => setIsPopupOpen(!isPopupOpen) },
        { icon: <FiUser />, title: "Profile", clickEvent: () => navigate(`/profile/${localStorage.getItem('user_id')}`) },
        { icon: <FiLogOut />, title: "Logout", clickEvent: handleLogOut },
    ];

    return (
        <div className="relatie flex py-3 flex-row gap-[10px] place-items-end">
            {topBar.map((item, index) => (
                <MisButton key={item.title} clickEvent={item.clickEvent} isFirst={index===0} icon={item.icon}></MisButton>
            ))}
        </div>
  );
};

export default TopBar;


