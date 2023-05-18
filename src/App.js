import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";

import MainLayout from "layouts/MainLayout";
import LoginLayout from "layouts/LoginLayout";
import Signin from "pages/Signin";
import Home from "pages/Home";
import Users from "pages/users/index";
import AddUser from "pages/users/AddUser";
import AddUserPermissions from "pages/users/AddUserPermissions";
import AddUserSettings from "pages/users/AddUserSettings";
import EditUser from "pages/users/EditUser";
import EditUserPermissions from "pages/users/EditUserPermissions";
import ProfileUser from "pages/users/ProfileUser";
import SettingsUser from "pages/users/SettingsUser";
import EditUserSettings from "pages/users/EditUserSettings";
import Teams from "pages/teams/index";
import AddTeam from "pages/teams/AddTeam";
import EditTeam from "pages/teams/EditTeam";
import EditTeamPermissions from "pages/teams/EditTeamPermissions";
import EditTeamMembers from "pages/teams/EditTeamMembers";
import AddTeamMembers from "pages/teams/AddTeamMembers";
import AddTeamPermissions from "pages/teams/AddTeamPermissions";
import SettingsTeam from "pages/teams/SettingsTeam";
import Groups from "pages/groups/index";
import AddGroup from "pages/groups/AddGroup";
import EditMembersGroup from "pages/groups/EditMembersGroup";
import EditObjectsGroup from "pages/groups/EditObjectsGroup";
import Apps from "pages/apps/index";
import CloneApp from "pages/apps/CloneApp";
import LogsApp from "pages/apps/LogsApp";
import SettingsApp from "pages/apps/SettingsApp";
import ManageGroupApp from "pages/apps/ManageGroupApp";
import ManageMembersApp from "pages/apps/ManageMembersApp";
import NotFoundLayout from "layouts/NotFoundLayout";
import NotFound from "pages/NotFound";

// MODULES
const Webcat = React.lazy(() => import("modules/webcat"));
const EditWebcat = React.lazy(() => import("modules/webcat/EditWebcat"));
const Tasks = React.lazy(() => import("modules/tasks"));
const Consumers = React.lazy(() => import("modules/consumers"));
const Timer = React.lazy(() => import("modules/timer"));

function App() {
  // const { data: getModules = [] } = useGetModulesQuery();

  return (
    <div className="relative">
      <ToastContainer theme="dark" />
      <React.Suspense
        fallback={
          <PulseLoader
            size={30}
            cssOverride={{
              height: "100vh",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            color="#757575"
          />
        }
      >
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route
              path="/add-user/permissions"
              element={<AddUserPermissions />}
            />
            <Route path="/users/:id" element={<EditUser />} />
            <Route
              path="/user/permissions/:id"
              element={<EditUserPermissions />}
            />
            <Route path="/add-user/settings" element={<AddUserSettings />} />
            <Route path="/user/settings/:id" element={<EditUserSettings />} />
            <Route path="/profile/:id" element={<ProfileUser />} />
            <Route path="/settings/:id" element={<SettingsUser />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/add-team" element={<AddTeam />} />
            <Route path="/teams/:id" element={<EditTeam />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/add-group" element={<AddGroup />} />
            <Route path="/group/members/:id" element={<EditMembersGroup />} />
            <Route path="/group/objects/:id" element={<EditObjectsGroup />} />
            <Route
              path="/team/permissions/:id"
              element={<EditTeamPermissions />}
            />
            <Route path="/team/members/:id" element={<EditTeamMembers />} />
            <Route path="/add-team/members" element={<AddTeamMembers />} />
            <Route
              path="/add-team/permissions"
              element={<AddTeamPermissions />}
            />
            <Route path="/team/settings/:id" element={<SettingsTeam />} />
            <Route path="/apps" element={<Apps />} />
            <Route path="/apps/clone" element={<CloneApp />} />
            <Route path="/apps/logs/:id" element={<LogsApp />} />
            <Route path="/apps/settings/:id" element={<SettingsApp />} />
            <Route
              path="/apps/settings/manage/:id"
              element={<ManageGroupApp />}
            />
            <Route
              path="/apps/settings/manage/members/:id"
              element={<ManageMembersApp />}
            />
            <Route path="/webcat" element={<Webcat />} />
            <Route path="/webcat/:id" element={<EditWebcat />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/consumers" element={<Consumers />} />
            <Route path="/timer" element={<Timer />} />
          </Route>
          <Route path="/signin" element={<LoginLayout />}>
            <Route index element={<Signin />} />
          </Route>
          <Route element={<NotFoundLayout />}>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </React.Suspense>
    </div>
  );
}

export default App;
