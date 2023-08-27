import React from "react";

import GroupItem from "./GroupItem";
import SpinnerLoader from "components/common/SpinnerLoader";


const GroupList = ({ getGroups, loadingGroup, searchValue }) => {
  return loadingGroup ? (
    <SpinnerLoader />
  ) : (
    <div className="flex flex-col gap-4">
      {getGroups
        ?.filter((el) =>
          el.name.toLowerCase().includes(searchValue.toLowerCase().trim())
        )
        .map((group, index) => (
          <GroupItem key={group.id} group={group} index={index} />
        ))}
    </div>
  );
};

export default GroupList;
