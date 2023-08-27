import React from "react";
import { baseUrl } from "config/variables";
import USER from "../../assets/img/user.png";
import { useSaveUserPhotoMutation } from "redux/index";
import { toast } from "react-toastify";
import { MdAddAPhoto } from "react-icons/md";

const Avatar = (props) => {
  const { itemData, userRefetch, userId, icon } = props;
//   const { userRefetch, userId } = props;

  const [updateUserPhoto] = useSaveUserPhotoMutation();

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

    if (file && allowedTypes.includes(file.type)) {
      let formData = new FormData();
      formData.append("photo", file);

      await updateUserPhoto({ userId, formData }).then((res) => {
        if (res.error === undefined) {
          toast.success("Profile photo updated");
          userRefetch();
        } else {
          toast.error("Profile photo was not updated. Some error occurred");
        }
      });
    } else {
      toast.error("Please choose a .jpeg, .png or .gif file.");
    }
  };

  let user_bg = "";
//   if (
//     userData === undefined ||
//     userData.photo_path === undefined ||
//     userData.photo_path === null ||
//     userData.photo_path.length === 0
//   ) {
    user_bg = USER;
//   } else {
//     user_bg = `${baseUrl}/${userData.photo_path}`;
//   }

  let className = (props.className === undefined ? "w-[64px] h-[64px]" : props.className);

  return (
    <div className={("relative overflow-hidden " + className).trim()}>
      <img
        className="absolute rounded-full w-full h-full object-cover object-center"
        src={user_bg}
        alt="User"
      />
      {icon && (<><input
        id="avatar-upload"
        type="file"
        onChange={handleAvatarChange}
        accept="image/jpeg, image/jpg, image/png, image/gif"
        style={{ display: "none" }}
      />
      <label htmlFor="avatar-upload">
        <MdAddAPhoto className="text-2xl text-gray cursor-pointer absolute bottom-0 right-0 mr-1 mb-1 bg-white rounded-full p-1" />
      </label></>)}
    </div>
  );
};

export default Avatar;
