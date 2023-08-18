import React from "react";

import MainLayout from "layouts/MainLayout";
import LoginLayout from "layouts/LoginLayout";
import Signin from "pages/Signin";
import Home from "pages/Home";

import { userRoutes } from "routes/users";
import { teamRoutes } from "routes/teams";
import { groupRoutes } from "routes/groups";
import { appRoutes } from "routes/apps";
import useModuleRoutes from "routes/modules";
import { taskRoutes } from "routes/tasks";
import { consumersRoutes } from "routes/consumers";

import NotFound from "pages/NotFound";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "index.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const modulesList = useModuleRoutes();

  const router = createBrowserRouter([
    {
      element: <LoginLayout />,
      children: [
        { index: true, path: '/signin', element: <Signin />}
      ]
    },
    {
      element: <MainLayout />,
      children: [
        { index: true, path: '/', element: <Home />},
        ...userRoutes
            .concat(teamRoutes, groupRoutes, appRoutes, modulesList, taskRoutes, consumersRoutes)
            .map((route, index) => (
            {
                key: `${route.path}_${index}`,
                path: route.path,
                element: route.element
            }
        )),
        { path: '*', element: <NotFound />},
      ]
    }
  ]);

  return (
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
  );

    // <div className="relative">
    //   {isLoading && <LoadingOverlay />}
    //   <ToastContainer theme="dark" />
    //   <React.Suspense
    //     fallback={
    //       <SpinnerLoader
    //         size={30}
    //         cssOverride={{
    //           height: "100vh",
    //           alignItems: "center",
    //         }}
    //       />
    //     }
    //   >
      // </React.Suspense>
    // </div>
  // );
}

export default App;
