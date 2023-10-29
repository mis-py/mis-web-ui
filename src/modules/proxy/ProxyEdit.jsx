import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import { 
    useGetProxyQuery,
    useEditProxyMutation,
    useAddProxyMutation,
 } from "redux/api/modulesApi/proxyApi";

import EditItem from "modules/core/components/EditItemComponent";
import ProxyForm from "modules/proxy/components/ProxyForm";

const ProxyEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const editMode = id !== undefined;

    const { 
      data: getProxy = {}, 
      isLoading: loadingProxy 
    } = useGetProxyQuery(id, {
        skip: editMode === false,
    });

    const [proxy, setProxy] = useState(getProxy);

    // fill current user with data
    useEffect(() => {
        setProxy(getProxy);
    }, [loadingProxy]);
  
    const [editProxy] = useEditProxyMutation();
    const [addProxy] = useAddProxyMutation();


    // handle save all data
    const handleSave = async (e) => {
        e.preventDefault();
        
        let callMethod = editMode ? editProxy : addProxy;

        let response = await callMethod({
            ...proxy
        }).unwrap();

        toast.success(`${ editMode ? 'Updated' : 'Created' } proxy ${response.id}`);

        navigate(`/proxy`);
    }

    return <EditItem 
        pageHeader={["Proxy", (editMode ? proxy.name ?? '' : "New")]}
        saveButtonEvent={handleSave}
        formName={"Proxy"}
        sections={[
            {
                name: "Proxy",
                element: <ProxyForm proxy={proxy} onProxyChange={(proxy) => setProxy(proxy)} />
            },
        ]}
    />;
  };
  
  export default ProxyEdit;