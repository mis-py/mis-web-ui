import React from "react";
import { toast } from "react-toastify";
import { resetTeam } from "redux/slices/teamSlice";
import { useDispatch } from "react-redux";

import SpinnerLoader from "components/common/SpinnerLoader";
import TeamItem from "./TeamItem";

const TeamList = ({ getTeams, loadingGetTeams, errorGetTeams, serchValue }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(resetTeam());
    if (errorGetTeams) {
      toast.error("Teams not found");
    }
  }, [errorGetTeams, dispatch]);

  return loadingGetTeams ? (
    <SpinnerLoader />
  ) : (
    <div className="flex flex-col gap-4">
      <TeamItem getTeams={getTeams} serchValue={serchValue} />
    </div>
  );
};

export default TeamList;
