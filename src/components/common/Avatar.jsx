import React from "react";
// import { baseUrl } from "config/variables";

const AvatarUser = (props) => {
  // const { userData, userRefetch, userId, icon } = props;

  // let user_bg = "";
  // if (
  //   userData === undefined ||
  //   userData.photo_path === undefined ||
  //   userData.photo_path === null ||
  //   userData.photo_path.length === 0
  // ) {
  //   user_bg = USER;
  // } else {
  //   user_bg = `${baseUrl}/${userData.photo_path}`;
  // }

  // let className = (props.className === undefined ? "w-[64px] h-[64px]" : props.className);

  return (
    <div className="relative overflow-hidden w-[64px] h-[64px]">
      <img
        className="absolute rounded-full w-full h-full object-cover object-center"
        src={props.icon}
        alt="User"
      />
    </div>
  );
};

export default AvatarUser;
