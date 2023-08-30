import React from "react";
// import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import SpinnerLoader from "components/common/SpinnerLoader";
// import { Provider } from "react-redux";
// import { store } from "redux";
// import MainLayout from "layouts/MainLayout";
// import LoginLayout from "layouts/LoginLayout";
// import Signin from "modules/core/Signin";

// import NotFound from "modules/core/NotFound";
// import { userRoutes } from "routes/users";
// import { teamRoutes } from "routes/teams";
// import { groupRoutes } from "routes/groups";
// import { appRoutes } from "routes/apps";
// import useModuleRoutes from "routes/modules";
// import { taskRoutes } from "routes/tasks";

// import { useSelector } from 'react-redux';
// import LoadingOverlay from "components/common/LoadingOverlay";
// import { consumersRoutes } from "routes/consumers";
// import { initiateWebSocket } from "config/WebSocketConnection";
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";

// import "index.css";
// import "react-toastify/dist/ReactToastify.css";
// import { FiSearch } from "react-icons/fi";

const Home = () => {
  // const navigate = useNavigate();
  // const location = useLocation();

  // React.useEffect(() => {
  //   if (localStorage.getItem("token") === null) {
  //       localStorage.removeItem("user_id");
  //       localStorage.removeItem("username");

  //       if (location.pathname !== '/signin') {
  //           setTimeout(() => {
  //               navigate("/signin");
  //           }, 200);
  //       }
  //   }
  // }, [location.pathname, navigate]);

  // const webSocket = initiateWebSocket();

  // if (webSocket !== undefined) {
  //     webSocket.onopen = function (e) {
  //         webSocket.send('{"subscribe": "notifications"}');
  //     }
  // }

  // const isLoading = useSelector(state => state.loading);
  // const modulesList = useModuleRoutes();


  return (
    <div className="h-screen py-6">
      <div className="flex flex-col h-full">
        {/* <div className="flex items-center bg-blackSecond rounded w-full pl-3">
          <FiSearch className="text-lg text-gray" />
          <input
            className="bg-transparent border-none border-0 text-xs text-gray placeholder:text-gray duration-300 w-full focus:!shadow-none focus:ring-0"
            type="search"
            placeholder="Search..."
          />
        </div> */}
        <h2 className="text-center h-full h3 text-gray flex items-center justify-center">
          Nothing here <br /> for now
        </h2>
      </div>
    </div>
  );
};

export default Home;
