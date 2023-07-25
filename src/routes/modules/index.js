import React from "react";
import { useGetModulesQuery } from "redux/index";

const Webcat = React.lazy(() => import("modules/webcat"));
const EditWebcat = React.lazy(() => import("modules/webcat/EditWebcat"));

const Consumers = React.lazy(() => import("modules/consumers"));
const Timer = React.lazy(() => import("modules/timer"));

const useModuleRoutes = () => {
  const { data: getModules = [], isLoading } = useGetModulesQuery();
  const [moduleRouteList, setModuleRouteList] = React.useState([]);

  React.useEffect(() => {
    const modules = [];
    getModules.map(item => {
      let obj = {
        path: `/${item.name}`,
      };

      if (item.name === 'webcat') {
        obj.element = <Webcat />;
      } else if (item.name === 'EditWebcat') {
        obj.element = <EditWebcat />;
      }

      modules.push(obj);
    });

    setModuleRouteList(modules);

  }, [isLoading]);

  return moduleRouteList;
};

export default useModuleRoutes;

// export const moduleRoutes = [
//   {
//     path: `/${module.name}`,
//     element: <Webcat />,
//   },
//   {
//     path: "/webcat/:id",
//     element: <EditWebcat />,
//   },
//   {
//     path: "/consumers",
//     element: <Consumers />,
//   },
//   {
//     path: "/timer",
//     element: <Timer />,
//   },
// ];
