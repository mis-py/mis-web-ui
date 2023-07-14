import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SpinnerLoader from "components/common/SpinnerLoader";

import MainLayout from "layouts/MainLayout";
import LoginLayout from "layouts/LoginLayout";
import Signin from "pages/Signin";
import Home from "pages/Home";

import NotFound from "pages/NotFound";
import { userRoutes } from "routes/users";
import { teamRoutes } from "routes/teams";
import { groupRoutes } from "routes/groups";
import { appRoutes } from "routes/apps";
import { moduleRoutes } from "routes/modules";
import { taskRoutes } from "routes/tasks";

function App() {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (localStorage.getItem("token") === null) {
      localStorage.removeItem("user_id");
      localStorage.removeItem("username");
      navigate("/signin");
    }
  });

  return (
    <div className="relative">
      <ToastContainer theme="dark" />
      <React.Suspense
        fallback={
          <SpinnerLoader
            size={30}
            cssOverride={{
              height: "100vh",
              alignItems: "center",
            }}
          />
        }
      >
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
              {userRoutes
                  .concat(teamRoutes, groupRoutes, appRoutes, moduleRoutes, taskRoutes)
                  .map((route, index) => (
                  <Route
                      key={`${route.path}_${index}`}
                      path={route.path}
                      element={route.element}
                  />
              ))}
          </Route>
          <Route path="/signin" element={<LoginLayout />}>
            <Route index element={<Signin />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </React.Suspense>
    </div>
  );
}

export default App;
// {userRoutes
//     .concat(teamRoutes, groupRoutes, appRoutes, moduleRoutes, taskRoutes)
//     .map((route, index) => (

//     ))}