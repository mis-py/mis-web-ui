import React from "react";
import { useGetModulesQuery } from "redux/index";
import Statabot from "modules/statabot";

const Webcat = React.lazy(() => import("modules/webcat"));
const EditWebcat = React.lazy(() => import("modules/webcat/EditWebcat"));
const Binom = React.lazy(() => import("modules/binom/index.jsx"))

const useModuleRoutes = () => {
  const { data: getModules = [], isLoading } = useGetModulesQuery(null, {
        skip: window.localStorage.getItem("token") === null,
      });
  const [moduleRouteList, setModuleRouteList] = React.useState([]);

  React.useEffect(() => {
    const modules = [];
    getModules.map(item => {
      let obj = {
        path: `/${item.name}`,
      };

      if (item.name === 'webcat') {
        obj.element = <Webcat />;
      } else if (item.name === 'editwebcat') {
        obj.element = <EditWebcat />;
      } else if (item.name === 'statabot') {
        obj.element = <Statabot />;
      } else if (item.name === 'binom_companation') {
        obj.element = <Binom />;
      }

      modules.push(obj);
    });

    setModuleRouteList(modules);

  }, [isLoading]);

  return moduleRouteList;
};

export default useModuleRoutes;
