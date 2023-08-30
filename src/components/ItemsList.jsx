import React from "react";
import SpinnerLoader from "components/common/SpinnerLoader";
import ListItem from "./ListItem";
import PageHeader from "components/common/PageHeader";
import { Link } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";
import Search from "components/common/SearchComponent";

const ItemsList = ({ routes, pageHeader, getItems, isLoading, hasDots, buttonOptions, ...props }) => {

  const links = routes?.map((item, index) => (
    <Link
            key={index}
            to={item}
            className="btn btn-outline btn-square btn-sm"
        >
        <FiUserPlus />
    </Link>
  ));
  const searchElement = props.searchParams !== undefined && <Search searchParams={props.searchParams} />;

  return isLoading ? (
    <SpinnerLoader />
  ) : (
  <div className="flex flex-5 flex-col flex-grow overflow-y-auto">
      <div className="flex items-center justify-between">
        <PageHeader pageHeader={pageHeader} />
        <div className="flex flex-row text-lg gap-1">
          {links} {searchElement}
        </div>
      </div>

      <div className="flex flex-col gap-4 p-2 overflow-y-auto">
        {getItems.map((item, index) => (
            <ListItem
              key={index}
              item_id={item.id}
              primary_name={item.username}
              secondary_name={item.team === null ? "No team" : item.team.name}
              additional_name={item.position === null ? "Position name none" : item.position}
              buttonOptions={buttonOptions}
            />
          ))
        }
      </div>
    </div>
  );
};

export default ItemsList;