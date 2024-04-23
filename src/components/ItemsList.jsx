import React from "react";
import SpinnerLoader from "components/common/SpinnerLoader";

import PageHeader from "components/common/PageHeader";
import { Link } from "react-router-dom";
import Search from "components/common/SearchComponent";

const ItemsList = ({ routes, pageHeader, getItems, isLoading, hasDots, buttonOptions, headerButtons, itemButtons, items, ...props }) => {

  const links = headerButtons?.map((item, index) => (
    <Link
            key={index}
            to={item.route}
            className="btn btn-outline btn-square btn-sm"
            title={item.title}
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
        {items}
      </div>
    </>
};

export default ItemsList;