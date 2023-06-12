import React from "react";
import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import Drawer, {
  DrawerContainer,
  MainContentContainer,
} from "react-swipeable-drawer";

import { useGetPermissionsUserIdQuery } from "redux/index";

import SidebarDesktop from "components/SidebarDesktop";
import Sidebar from "components/Sidebar";

import { currentUserId } from "config/variables";

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data: getPermissionsUser = [], isLoading: loadingPermissionsUser } =
    useGetPermissionsUserIdQuery(localStorage.getItem("user_id"));

  // React.useEffect(() => {
  //   const linksAdmin = [
  //     "/add-user",
  //     "/add-team",
  //     "/add-team/permissions",
  //     "/add-team/members",
  //     "/add-group",
  //     "/apps/clone",
  //   ];

  //   if (
  //     localStorage.getItem("my-token") === null &&
  //     location.pathname !== "/signin"
  //   ) {
  //     navigate("/signin");
  //   }

  //   if (
  //     getPermissionsUser?.length === 0 &&
  //     linksAdmin.includes(location.pathname)
  //   ) {
  //     navigate("/");
  //   }
  // }, [location, loadingPermissionsUser]);
  return (
    <>
      <SidebarDesktop />
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
              <div className="container">
                <div className="lg:ml-[345px]">
                  <Outlet />
                </div>
              </div>
            </MainContentContainer>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default MainLayout;
