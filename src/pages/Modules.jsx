import React from "react";
import { useGetModulesQuery } from "../redux";

const Modules = () => {
  const { data: getModules } = useGetModulesQuery();

  return (
    <>
      <div className="w-full h-full">
        {getModules?.map(
          (item) =>
            item.front_bundle_path !== null && (
              <iframe
                className="w-full h-full min-h-screen"
                key={item.id}
                src={`http://crm.ng.lan/api${item.front_bundle_path}`}
              ></iframe>
            )
        )}
      </div>
    </>
  );
};

export default Modules;
