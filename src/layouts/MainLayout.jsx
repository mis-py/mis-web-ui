import React from "react";
import { Outlet } from "react-router-dom";

import Drawer, {
  DrawerContainer,
  MainContentContainer,
} from "react-swipeable-drawer";

import SidebarDesktop from "components/SidebarDesktop";
import Sidebar from "components/Sidebar";

const MainLayout = () => {

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
