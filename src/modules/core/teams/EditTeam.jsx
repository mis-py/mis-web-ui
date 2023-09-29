import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEditTeamMutation, useGetTeamIdQuery } from "redux/index";
import { addTeamName, setTeamMembers } from "redux/slices/teamSlice";
import { useDispatch, useSelector } from "react-redux";
import MisButton from "components/common/MisButton";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FiSave } from "react-icons/fi";
// import TeamUsersShortList from "components/teams/TeamUsersShortList";
import PageHeader from "components/common/PageHeader";

const EditTeam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const team = useSelector((state) => state.team);
  const editMode = false;
  const { data: getTeamId = [], isLoading: loadingTeamId } =
    useGetTeamIdQuery(id);
  const [editTeam] = useEditTeamMutation();

  React.useEffect(() => {
    let userIds = [];

    if (!(
        getTeamId === undefined ||
        getTeamId.users === undefined ||
        getTeamId.users.length === 0)
    ) {
      userIds = getTeamId.users.map((user) => user.id);
    }

    dispatch(addTeamName(getTeamId.name));
    dispatch(setTeamMembers(userIds));

    if (userIds.length === 0) {
      return;
    }
  }, [loadingTeamId]);

  const handleEditTeam = async (e) => {
    e.preventDefault();
    await editTeam({
      id,
      name: team.name,
      permissions: team.permissions,
      users_ids: team.members,
      settings: team.settings,
    }).then(() => {
      navigate("/teams");
      toast.success("Team updating");
    });
  };
  const pageHeader = ["Administration", "isBack:Teams", (editMode ? getTeamId.name : "New")];
  const saveButtonTitle = "Save";
  const saveButtonIcon = <FiSave />;
  const saveButtonEvent = (e) => {};
  return (<>
    <div className="flex flex-5 flex-col">
      <div className="flex items-center justify-between">
        <PageHeader pageHeader={pageHeader} />
        <div className="flex flex-row text-lg gap-1">
            <MisButton clickEvent={(e) => saveButtonEvent(e)} title={saveButtonTitle} icon={saveButtonIcon} />
        </div>
        {/* <form className="my-7">
          {getTeamId.users !== undefined && Array.isArray(getTeamId.users) && (
            <TeamUsersShortList users={getTeamId.users} team={team.id} />
          )}
        </form> */}
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center gap-6">
          <Link
            to={`/team/permissions/${id}`}
            className="flex justify-between items-center w-full cursor-pointer text-gray bg-blackSecond px-[10px] py-3 rounded-lg"
          >
            Permissions ({getTeamId.permissions?.length})
            <AiOutlinePlusCircle className="text-xl" />
          </Link>
          <Link
            to={`/team/members/${id}`}
            className="flex justify-between items-center w-full cursor-pointer text-gray bg-blackSecond px-[10px] py-3 rounded-lg"
          >
            Members ({getTeamId.users?.length})
            <AiOutlinePlusCircle className="text-xl" />
          </Link>
        </div>
        <button onClick={handleEditTeam} className="btn-primary">
          Save
        </button>
      </div>
    </div>
    </>
  );
};

export default EditTeam;
