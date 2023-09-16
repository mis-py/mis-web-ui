import React from "react";
import MainLayout from "layouts/MainLayout";
import Signin from "layouts/Signin";
import NotFound from "layouts/NotFound";
import { useDispatch } from "react-redux";
import { profileRoutes } from "routes/profile";
import { notificationsRoutes } from "routes/notifications";

// import { useSelector } from 'react-redux';
// import LoadingOverlay from "./components/common/LoadingOverlay";
import { logout } from "redux/slices/authSlice";

import {createBrowserRouter, RouterProvider, redirect } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";



function App() {
  const dispatch = useDispatch();

  const router = createBrowserRouter([
    {
      path: '/login', 
      element: <Signin />, 
    },
    {
      element: <MainLayout />,
      path: "/*",
      // children: [
      //   { index: true, element: <Home />},
      //   ...[]
      //       .concat(profileRoutes, notificationsRoutes)
      //       .map((route, index) => (
      //       {
      //           key: `${route.path}_${index}`,
      //           path: route.path,
      //           element: route.element,
      //       }
      //   ))
      // ]
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
