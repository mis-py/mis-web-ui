import React from "react";
import AvatarUser from "./users/AvatarUser";
import MisButton from "./common/MisButton";
import Avatar from "components/common/Avatar";

const ListItem = ({ item_id, primary_name, secondary_name, additional_name, buttonOptions }) => {
  return (
    <div className="card flex-g w-full bg-base-100 shadow-mis-1 rounded-lg p-4">
      <div className="card-body flex-row justify-between items-center p-0">
        <div className="lg:flex lg:items-center">
          <div className="flex flex-col">
            <div className="flex items-center gap-4">
              <Avatar icon={false} />
              <div className="flex flex-col">
                <h2 className="card-title">{primary_name}</h2>
                <p className="">{secondary_name}</p>
                <p className="">{additional_name}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card-actions">
        { buttonOptions?.map((option_item, option_index) => (
            <MisButton key={option_index} clickEvent={() => option_item.callback(item_id)} title={option_item.title} icon={option_item.icon} border={true} />
        )) }
        </div>
      </div>

    </div>
  );
};

export default ListItem;
