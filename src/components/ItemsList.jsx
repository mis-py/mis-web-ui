import React from "react";
import SpinnerLoader from "components/common/SpinnerLoader";
import ListItem from "./ListItem";
import PageHeader from "components/common/PageHeader";
import { Link } from "react-router-dom";
import Search from "components/common/SearchComponent";

const ItemsList = ({ routes, pageHeader, getItems, isLoading, hasDots, buttonOptions, ...props }) => {

  const links = routes?.map((item, index) => (
    <Link
            key={index}
            to={item.route}
            className="btn btn-outline btn-square btn-sm"
        >
        {item.icon}
    </Link>
  ));
  const searchElement = props.searchParams !== undefined && <Search searchParams={props.searchParams} />;

  return <>
      <div className="flex items-center justify-between">
        <PageHeader pageHeader={pageHeader} />
        <div className="flex flex-row text-lg gap-1">
          {links} {searchElement}
        </div>
      </div>

      <div className="flex flex-col gap-4 p-2 overflow-y-auto h-screen">
      {getItems.map((item, index) => (
          <ListItem
            key={index}
            item={item}
            buttonOptions={buttonOptions.filter((button) => 'isDisplay' in button ? button.isDisplay(item) : true)}
          />
        ))
      }
      </div>
    </>
};

export default ItemsList;