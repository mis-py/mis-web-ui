import React from "react";
import ItemsList from "components/ItemsList";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetLoadedModulesQuery } from "redux/index";
import { FiEdit, FiXCircle, FiPlus} from "react-icons/fi";

const AppsList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        data: getLoadedModules = [],
        isLoading: loadingModules,
        error: errorModules,
    } = useGetLoadedModulesQuery();

    const searchValue = useSelector((state) => "AppsList" in state.search.searchData ? state.search.searchData["AppsList"] : "");

    const filteredApps = getLoadedModules.filter((el) => el.name.toLowerCase().includes(searchValue.toLowerCase().trim())).map((item)=> (
        {
          ...item, 
          title: `${item.display_name} - v${item.version} - ${item.author}`, 
          paragraphs: [
            item.description, 
            "Category: " + item.category + " State: " + (item.enabled ? "ENABLED" : "DISABLED")
          ], 
          avatar: require("assets/img/app.png")
        }
      ));

    const buttonOptions = [
        {
            title: "Settings",
            onClick: (app) => navigate(`/apps/${app.id}`),
            icon: <FiEdit />,
        }
    ];

    const routes = [
        {
          route: '/apps/install',
          icon: <FiPlus />
        }
    ];

    return (
        <ItemsList 
          routes={routes} 
          pageHeader={["Administration", "Apps"]} 
          getItems={filteredApps} 
          isLoading={loadingModules} 
          buttonOptions={buttonOptions}
          searchParams={{
            key: "AppsList",
            value: searchValue,
            placeholder: "Enter app name to search...",
            showSearch: false
          }}
        />
    );
}

export default AppsList;