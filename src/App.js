import React from "react";
import MainLayout from "layouts/MainLayout";
import { Home, NotFound, Signin} from "modules/core";
import { useDispatch } from "react-redux";
import { userRoutes } from "routes/users";
import { teamRoutes } from "routes/teams";
import { groupRoutes } from "routes/groups";
import { appRoutes } from "routes/apps";
import { profileRoutes } from "routes/profile";
import useModuleRoutes from "routes/modules";
import { taskRoutes } from "routes/tasks";
import { notificationsRoutes } from "routes/notifications";

import { useSelector } from 'react-redux';
import LoadingOverlay from "./components/common/LoadingOverlay";
import { consumersRoutes } from "routes/consumers";
import { logout } from "redux/slices/authSlice";

import {createBrowserRouter, RouterProvider, redirect } from "react-router-dom";

import "index.css";
import "react-toastify/dist/ReactToastify.css";



function App() {
  const dispatch = useDispatch();

  const modulesList = useModuleRoutes();

  const router = createBrowserRouter([
    {
      path: '/login', 
      element: <Signin />, 
    },
    {
      element: <MainLayout />,
      path: "/",
      children: [
        { index: true, element: <Home />},
        ...Array()
            .concat(userRoutes, teamRoutes, groupRoutes, appRoutes, modulesList, taskRoutes, consumersRoutes, profileRoutes, notificationsRoutes)
            .map((route, index) => (
            {
                key: `${route.path}_${index}`,
                path: route.path,
                element: route.element,
            }
        ))
      ]
    },
    {
      path: "/logout",
      async loader() {
        dispatch(logout());
        return redirect("/login");
      }
    },
    { 
      path: '*', 
      element: <NotFound />
    },
]);

  return (
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
  );
}

export default App;
