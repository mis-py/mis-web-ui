import React from "react";
import { useGetModulesQuery } from "redux/index";
import Statabot from "modules/statabot";

const Webcat = React.lazy(() => import("modules/webcat"));
const EditWebcat = React.lazy(() => import("modules/webcat/EditWebcat"));
const Binom = React.lazy(() => import("modules/binom/index.jsx"))
const AutoAdmin = React.lazy(() => import("modules/auto_admin/index.jsx"))

const useModuleRoutes = () => {
  const { data: getModules = [], isLoading } = useGetModulesQuery(null, {
        skip: window.localStorage.getItem("token") === null,
      });
  const [moduleRouteList, setModuleRouteList] = React.useState([]);

  React.useEffect(() => {
    if (getModules !== undefined && getModules.length) {
      const modules = [];
      getModules.forEach(item => {
        let obj = {
          path: `${item.name}`,
          ...item
        };

        if (item.name === 'webcat') {
          obj.element = <Webcat/>;
        } else if (item.name === 'editwebcat') {
          obj.element = <EditWebcat/>;
        } else if (item.name === 'statabot') {
          obj.element = <Statabot/>;
        } else if (item.name === 'binom_companion') {
          obj.element = <Binom/>;
        } else if (item.name === 'auto_admin') {
          obj.element = <AutoAdmin/>;
        }

        modules.push(obj);
      });

      setModuleRouteList(modules);
    }
  }, [isLoading, getModules]);  

  return moduleRouteList;
};

export default useModuleRoutes;
