import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiUser, FiLogOut, FiSun, FiMoon } from "react-icons/fi";
// import MisButton from "components/common/MisButton";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from 'redux/slices/profileSlice';
import { useGetMeQuery } from "redux/index";
import USER from "assets/img/user.png";
// import { icons } from "react-icons/lib/esm";

const TopBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const {
        data: getUserId = [],
        isLoading: loadingUserId,
        refetch: refetchProfileData,
      } = useGetMeQuery();

    const currentTheme = useSelector((state) => state.profile.theme);

        // // initially set the theme and "listen" for changes to apply them to the HTML tag
        // React.useEffect(() => {
        //   document.querySelector('html').setAttribute('data-theme', theme);
        // }, [theme]);

    // const topBar = [
    //     // { icon: <FiBell />, title: "Notifications" , clickEvent: () => setIsPopupOpen(!isPopupOpen) },
    //     { icon: <FiUser />, title: "Profile", clickEvent: () => navigate(`/profile/${localStorage.getItem('user_id')}`) },
    //     { icon: <FiLogOut />, title: "Logout", clickEvent: () => navigate("/logout") },
    // ];

    // const buttons = topBar.map((item, index) => (
    //     <MisButton key={item.title} clickEvent={item.clickEvent} isFirst={index===0} icon={item.icon}></MisButton>
    // ))
    
    const handleClick = (e) => {
        const elem = e.target;//document.activeElement;
        if(elem){
            elem?.blur();
        }
    };

    const ahrefs = [
        { title: "Profile", path: `/profile/${getUserId.id}`, icon: <FiUser />},
        { title: "Logout", path: "/logout", icon: <FiLogOut /> }
    ].map((item, index)=>(
        <li key={index} onClick={(e) => {
            // e.preventDefault();
            // setIsPopupOpen(false)
            handleClick(e)
            }
            }>
            <NavLink key={index} className={({ isActive, isPending }) => isPending ? "" : isActive ? "" : ""
                } to={item.path}>
                {item.title}
                <span className="badge">{item.icon}</span>
            </NavLink>
        </li>
    ));

    const onThemeChange = () => {
        dispatch(setTheme(currentTheme === 'dark' ? 'light' : 'dark'));
    }

    return (
    <>
        <div className="flex items-center justify-between px-2 py-2">
            <p className="text-sm">Welcome, {getUserId.username}!</p>

            <div className="flex flex-row text-lg gap-4">
                <div className="flex tooltip tooltip-bottom" data-tip={`Switch to ${currentTheme==='light'?'dark':'light'}`}>
                    <label className="swap swap-rotate w-8 h-8">
                    <input type="checkbox" onChange={onThemeChange} checked={currentTheme==='light'} />
                    <FiSun className="swap-on fill-current w-8 h-8" />
                    <FiMoon className="swap-off fill-current w-8 h-8" />
                    </label>
                </div>

                <div className="flex dropdown dropdown-end">
                    <label tabIndex="0" className="btn btn-sm btn-ghost btn-circle avatar w-8 h-8">
                        <div className="rounded-full">
                            <img src={USER} />
                        </div>
                    </label>
                    <ul tabIndex="0" className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                        {ahrefs}
                    </ul>
                </div>
            </div>
        </div>
    </>
  );
};

export default TopBar;


