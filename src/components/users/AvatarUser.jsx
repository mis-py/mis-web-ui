import React from "react";
// import { useSaveUserPhotoMutation } from "redux/index";
// import { toast } from "react-toastify";
// import { MdAddAPhoto } from "react-icons/md";
import { baseUrl } from "config/variables";
import USER from "../../assets/img/user.png";
import UserLogo from "./LogoUser";

const AvatarUser = (props) => {
    const { userData, userRefetch, userId, icon } = props;
    let {width, height} = props;

    if (width === undefined) {
        width = 64;
    }

    if (height === undefined) {
        height = 64;
    }

  let user_bg = "";
  if (
    userData === undefined ||
    userData.photo_path === undefined ||
    userData.photo_path === null ||
    userData.photo_path.length === 0
  ) {
    user_bg = USER;
  } else {
    user_bg = `${baseUrl}/${userData.photo_path}`;
  }

  return (
    <div className={`relative w-[${width}px] h-[${width}px] overflow-hidden`}>
      <img
        className="absolute rounded-full w-full h-full object-cover object-center"
        src={user_bg}
        alt="User"
      />
      {icon && <UserLogo
        userId={userId}
        userRefetch={userRefetch}
      />}
    </div>
  );
};

export default AvatarUser;
