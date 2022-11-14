import React from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Drawer, {
  DrawerContainer,
  MainContentContainer,
} from "react-swipeable-drawer";

import MainLayout from "./layouts/MainLayout";
import LoginLayout from "./layouts/LoginLayout";
import Sidebar from "./components/Sidebar";
import Singin from "./pages/Singin";
import Home from "./pages/Home";
import Users from "./pages/users/index";
import AddUser from "./pages/users/AddUser";
import AddUserPermissions from "./pages/users/AddUserPermissions";
import EditUser from "./pages/users/EditUser";
import ProfileUser from "./pages/users/ProfileUser";
import SettingsUser from "./pages/users/SettingsUser";
import Teams from "./pages/teams/index";
import AddTeam from "./pages/teams/AddTeam";
import EditTeam from "./pages/teams/EditTeam";
import Applications from "./pages/applications/index";
import UsingApplications from "./pages/usingApplications/index";
import Webcatalog from "./pages/webcatalog/index";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (
      localStorage.getItem("my-token") === null &&
      location.pathname !== "/singin"
    ) {
      navigate("/singin");
    }
  }, [location]);
  return (
    <div className="relative">
      <ToastContainer theme="dark" />
      <Drawer position="left" size={80}>
        {({
          position,
          swiping,
          translation,
          mainContentScroll,
          toggleDrawer,
          handleTouchStart,
          handleTouchMove,
          handleTouchEnd,
        }) => (
          <div>
            <DrawerContainer
              position={position}
              size={100}
              swiping={swiping}
              translation={translation}
              toggleDrawer={toggleDrawer}
              handleTouchStart={handleTouchStart}
              handleTouchMove={handleTouchMove}
              handleTouchEnd={handleTouchEnd}
              drawerContent={<Sidebar toggleDrawer={toggleDrawer} />}
            />
            <MainContentContainer
              translation={translation}
              mainContentScroll={mainContentScroll}
            >
              <Routes>
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<Home />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/add-user" element={<AddUser />} />
                  <Route
                    path="/manage-permissions"
                    element={<AddUserPermissions />}
                  />
                  <Route path="/users/:id" element={<EditUser />} />
                  <Route path="/profile/:id" element={<ProfileUser />} />
                  <Route path="/settings/:id" element={<SettingsUser />} />
                  <Route path="/teams" element={<Teams />} />
                  <Route path="/add-team" element={<AddTeam />} />
                  <Route path="/teams/:id" element={<EditTeam />} />
                  <Route path="/applications" element={<Applications />} />
                  <Route
                    path="/using-applications"
                    element={<UsingApplications />}
                  />
                  <Route path="/webcatalog" element={<Webcatalog />} />
                </Route>
                <Route path="/singin" element={<LoginLayout />}>
                  <Route index element={<Singin />} />
                </Route>
              </Routes>
            </MainContentContainer>
          </div>
        )}
      </Drawer>
    </div>
  );
}

export default App;
