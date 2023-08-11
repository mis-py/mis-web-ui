import React from "react";
import { baseUrl } from "config/variables";

import UpdateAvatar from "./UpdateAvatar";

import USER from "../../assets/img/user.png";

const AvatarUser = (props) => {
  const { userData, userRefetch, userId, icon } = props;

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
    <div className={("relative overflow-hidden " + props.className).trim()}>
      <img
        className="absolute rounded-full w-full h-full object-cover object-center"
        src={user_bg}
        alt="User"
      />
      {icon && <UpdateAvatar
        userId={userId}
        userRefetch={userRefetch}
      />}
    </div>
  );
};

export default AvatarUser;
