import React from "react";
import AvatarUser from "./users/AvatarUser";
import MisButton from "./common/MisButton";
import Avatar from "components/common/Avatar";

const ListItem = ({ item_id, primary_name, secondary_name, additional_name, buttonOptions }) => {
  return (
    <div className="flex flex-col relative bg-blackSecond px-4 py-[10px] rounded lg:p-6">
      <div className="flex justify-between items-center">
        <div className="lg:flex lg:items-center">
          <div className="flex flex-col">
            <div className="flex items-center gap-4">
              <Avatar icon={false} />
              <div className="flex flex-col">
                <div className="text-white mb-[10px]">{primary_name}</div>
                <div className="text-gray text-xs mb-[6px]">{secondary_name}</div>
                <div className="text-gray text-xs">{additional_name}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-[10px] place-items-end p-1">
        { buttonOptions?.map((option_item, option_index) => (
            <MisButton key={option_index} clickEvent={() => option_item.callback(item_id)} title={option_item.title} icon={option_item.icon} border={true} />
        )) }
        </div>
      </div>
    </div>
  );
};

export default ListItem;
