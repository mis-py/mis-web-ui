import React from "react";
import MisButton from "./common/MisButton";
import Avatar from "components/common/Avatar";

const ListItem = ({ item, buttonOptions }) => {
  const title = item.title;
  const paragraphs = item.paragraphs ?? [];
  const badge = item.badge;
  return (
    <div className="card flex-g w-full bg-base-100 shadow-mis-1 rounded-lg p-4">
      <div className="card-body flex-col md:flex-row justify-between items-start p-0">
        <div className="lg:flex lg:items-center ">
          <div className="flex flex-col">
            <div className="flex items-center gap-4">
              {/* { avatar ? <Avatar icon={item.avatar} /> : '' } */}
              <div className="flex flex-col">
                <h2 className="card-title text-sm md:text-md">{ badge ? <span className="badge badge-outline">{badge}</span> : ''}{ title }</h2>
                { paragraphs.map((paragraph, index) => <p className="text-xs pt-1" key={index}>{paragraph}</p>) }
              </div>
            </div>
          </div>
        </div>
        <div className="card-actions">
          { 
            buttonOptions.map((option_item, index) => (
              <MisButton key={index} clickEvent={() => option_item.onClick(item)} title={option_item.title} icon={option_item.icon} border={true} />
            )) 
          }
        </div>
      </div>

    </div>
  );
};

export default ListItem;
