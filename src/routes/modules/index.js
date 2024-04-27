import React from "react";
import { useGetModulesQuery } from "redux/index";

const StataBot = React.lazy(() => import("modules/statabot"));
const Webcat = React.lazy(() => import("modules/webcat"));
const EditWebcat = React.lazy(() => import("modules/webcat/EditWebcat"));
const Binom = React.lazy(() => import("modules/binom/index.jsx"));
const AutoAdmin = React.lazy(() => import("modules/auto_admin/index.jsx"));

const Proxy = React.lazy(() => import("modules/proxy/Proxy"));

const useModuleRoutes = (isAuthenticated) => {
  const { data: getModules = [], isLoading } = useGetModulesQuery(undefined, {
        skip: !isAuthenticated,
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
          obj.element = <StataBot/>;
        } else if (item.name === 'binom_companion') {
          obj.element = <Binom/>;
          obj.name = "Binom Companion";
        } else if (item.name === 'auto_admin') {
          obj.element = <AutoAdmin/>;
        } else if (item.name === 'proxy') {
          obj.element = <Proxy/>;
          obj.name = "Proxy Manager";
        }

        modules.push(obj);
      });

      setModuleRouteList(modules);
    }
  }, [isLoading, getModules]);  

  return moduleRouteList;
};

export default useModuleRoutes;
