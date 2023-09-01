import React from "react";
import SpinnerLoader from "components/common/SpinnerLoader";
import ListItem from "./ListItem";
import PageHeader from "components/common/PageHeader";
import { Link } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";
import Search from "components/common/SearchComponent";

const ItemsList = ({ routes, pageHeader, getItems, isLoading, hasDots, buttonOptions, ...props }) => {
  return isLoading ? (
    <SpinnerLoader />
  ) : (<>
    <PageHeader
        header={pageHeader}
        showBack={false}
    />
    <div className="flex flex-row justify-between gap-[10px] py-1">
    {
        routes?.map((item, index) => (
            <Link
                    key={index}
                    to={item}
                    className="flex justify-center items-center w-[32px] h-[32px] rounded bg-blackSecond"
                >
                <FiUserPlus />
            </Link>
        ))
    }
    {props.searchParams !== undefined && <Search searchParams={props.searchParams} /> }
    </div>
    <div className="flex flex-col gap-4">
      {getItems.map((item, index) => (
          <ListItem
            key={index}
            item_id={item.id}
            primary_name={item.primary_name}
            secondary_name={item.secondary_name}
            additional_name={item.additional_name}
            buttonOptions={buttonOptions}
          />
        ))
      }
    </div></>
  );
};

export default ItemsList;