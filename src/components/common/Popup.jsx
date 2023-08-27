import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";


// CAREFUL: Popup not ready yet. is spawns at wrong position for now

/*
  const [showEdit, setShowEdit] = React.useState(false);
  const [indexEditing, setIndexEditing] = React.useState(null);
  const navigate = useNavigate();
  const [deleteUser] = useDeleteUserMutation();

  hasDots = true;

  const onOutsideClick = () => {
    if (showEdit === true){
      setShowEdit(false);
      setIndexEditing(null);
    }
  };

  const refPopup = useOutsideClick(onOutsideClick);

  const onDotsClick = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    setShowEdit(true);
    console.log("onDotsClick " + index);
  }
*/

const Popup = ({ listOptions, innerRef }) => {
    console.log(listOptions);
    return (
        <div ref={innerRef} className='duration-300 absolute top-1 w-[175px] z-10 right-1 bg-backGround shadow lg:top-3'>
            {listOptions.map((item, index) => (
                <div
                    key={index}
                    onClick={item.callback}
                    className="px-7 py-2 block text-gray duration-300 cursor-pointer hover:bg-blackSecond hover:text-primary"
                >
                    {item.title}
                </div>
            ))}
    </div>
    );
};

export default Popup;