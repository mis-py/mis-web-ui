import React, { useState, useMemo } from "react";
import ItemsList from "components/ItemsList";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetModulesQuery, filterModulesByStringSelector } from "redux/index";
import { FiEdit, FiXCircle, FiPlus} from "react-icons/fi";
import ListItem from 'components/ListItem';

const AppsList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState("");

    const modulesSearchRresult = useMemo(filterModulesByStringSelector, []);

    const {
      data,
      isLoading,
      isSuccess,
      error,
      searchFiltered,
    } = useGetModulesQuery(undefined, {
      selectFromResult: (result) => ({
        ...result,
        searchFiltered: modulesSearchRresult(result, searchValue)
      })
    });

    const apps = searchFiltered.map((item)=> {
      let manifest = item?.manifest;
      let visible_name = manifest != undefined ? manifest?.display_name : item.name;
      return {
          ...item,
          badge: item.id,
          title: visible_name, 
          paragraphs: [
            manifest?.description, 
            "Version: " + (manifest?.version ?? ''),
            "Author: " + (manifest?.author ?? ''),
            "Category: " + (manifest?.category ?? ''),
            "Status: " + (item.enabled ? "ENABLED" : "DISABLED"),
            "State: " + item.state
          ], 
          avatar: require("assets/img/app.png")
      }
      });

    return (
        <ItemsList 
          routes={[]} 
          pageHeader={["Administration", "Modules"]} 
          getItems={apps} 
          isLoading={isLoading} 
          buttonOptions={[]}
          searchParams={{
            key: "AppsList",
            value: searchValue,
            placeholder: "Module name...",
            showSearch: false,
            onSearch: setSearchValue
          }}
          headerButtons={[]
            // [
            //   {
            //     route: '/apps/install',
            //     icon: <FiPlus />
            //   }
            // ]
          }
          items={
            apps.map((item, index) => (
              <ListItem
                key={index}
                item={item}
                buttonOptions={[
                  {
                    title: "Configure",
                    onClick: (app) => navigate(`/modules/${app.id}`),
                    icon: <FiEdit />,
                  }
                ]}
              />
            ))
          }
        />
    );
}

export default AppsList;