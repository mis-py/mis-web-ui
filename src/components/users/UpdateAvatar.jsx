import { useSaveUserPhotoMutation } from "redux/index";
import { toast } from "react-toastify";
import { MdAddAPhoto } from "react-icons/md";

const UpdateAvatar = (props) => {
    const { userRefetch, userId } = props;

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

  return (
    <>
      <input
        id="avatar-upload"
        type="file"
        onChange={handleAvatarChange}
        accept="image/jpeg, image/jpg, image/png, image/gif"
        style={{ display: "none" }}
      />
      <label htmlFor="avatar-upload">
        <MdAddAPhoto className="text-2xl text-gray cursor-pointer absolute bottom-0 right-0 mr-1 mb-1 bg-white rounded-full p-1" />
      </label>
    </>
  );
};

export default UpdateAvatar;
