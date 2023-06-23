import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";

import MainLayout from "layouts/MainLayout";
import LoginLayout from "layouts/LoginLayout";
import Signin from "pages/Signin";
import Home from "pages/Home";
import NotFoundLayout from "layouts/NotFoundLayout";
import NotFound from "pages/NotFound";
import { userRoutes } from "routes/users";
import { teamRoutes } from "routes/teams";
import { groupRoutes } from "routes/groups";
import { appRoutes } from "routes/apps";
import { moduleRoutes } from "routes/modules";

function App() {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (localStorage.getItem("token") === null) {
      localStorage.removeItem("user_id");
      localStorage.removeItem("username");
      navigate("/signin");
    }
  }, []);

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
            {userRoutes.map((route, index) => (
              <Route
                key={`${route.path}_${index}`}
                path={route.path}
                element={route.element}
              />
            ))}
            {teamRoutes.map((route, index) => (
              <Route
                key={`${route.path}_${index}`}
                path={route.path}
                element={route.element}
              />
            ))}
            {groupRoutes.map((route, index) => (
              <Route
                key={`${route.path}_${index}`}
                path={route.path}
                element={route.element}
              />
            ))}
            {appRoutes.map((route, index) => (
              <Route
                key={`${route.path}_${index}`}
                path={route.path}
                element={route.element}
              />
            ))}
            {moduleRoutes.map((route, index) => (
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
          <Route element={<NotFoundLayout />}>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </React.Suspense>
    </div>
  );
}

export default App;
