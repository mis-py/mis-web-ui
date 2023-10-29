import React from "react";
import { 
    useGetProxiesQuery, 
    useDeleteProxyMutation,
    useProxyChangeIPMutation,
    useProxyCheckMutation,
    useToggleStatusMutation
} from "redux/api/modulesApi/proxyApi";
import ItemsList from "components/ItemsList";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FiEdit, FiXCircle, FiPlus, FiRotateCcw, FiHelpCircle, FiPower } from "react-icons/fi";
import { confirmAlert } from "react-confirm-alert";
import { useNavigate } from "react-router-dom";
import UserImg from "assets/img/user.png";
import { resetUser } from "redux/slices/userSlice";

const ProxyList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        data: getProxy = [],
        isLoading: loadingProxy,
        error: errorProxy,
    } = useGetProxiesQuery();

    const searchValue = useSelector((state) => "ProxyList" in state.search.searchData ? state.search.searchData["ProxyList"] : "");

    React.useEffect(() => {
        dispatch(resetUser());
    }, [loadingProxy, searchValue]);

    const filteredProxies = getProxy.filter((el) => el.name.toLowerCase().includes(searchValue.toLowerCase().trim())).map((item)=> (
        {
            ...item,
            title: `[${item.proxy_type}] ${item.name}`,
            badge: item.id,
            paragraphs: [
                item.last_known_ip !== null ? `Last known IP: ${item.last_known_ip}` : null,
                `Enabled: ${item.is_enabled}`,
                `Online: ${item.is_online}`,
            ],
            // avatar: UserImg
        }
    ))

    const [checkProxy, { isLoading }] = useProxyCheckMutation();
    const [deleteProxy] = useDeleteProxyMutation();
    const [changeProxyIP] = useProxyChangeIPMutation();
    const [toggleStatus] = useToggleStatusMutation();
    
    const handleToggleStatus = async (id) => {
        let response = await toggleStatus(id).unwrap();
        toast.info(`Status changed`);
    }

    const handleChangeProxyIP = async (id) => {
        let response = await changeProxyIP(id).unwrap();
        
        if (response.status === 200){
            toast.success(`${response.status}: ${response.text}`);
        }
        if (Object.keys(response.exceptions).length > 0){
            toast.warning(`Occured ${Object.keys(response.exceptions).length} exceptions! Use edit menu for detailed descriptions.`);
        }
    }
  
    const handleDeleteProxy = async (id) => {
        confirmAlert({
            title: "Delete proxy",
            message: "Are you sure you want to delete this proxy?",
            buttons: [
                {
                label: "Yes",
                onClick: async () => {
                    await deleteProxy(id);
                    navigate("/proxy");
                    toast.success("Proxy deleted");
                },
                },
                {
                    label: "No",
                },
            ],
            overlayClassName: "bg-blackSecond/70",
        });
    };

    const handleCheckProxy = async (id) => {
        let response = await checkProxy({id: id}).unwrap();

        toast.success(`${response.status}: ${response.text}`);
    }

    const buttonOptions = [
        {
            title: "Toggle status",
            onClick: (item) => handleToggleStatus(item.id),
            icon: <FiPower />
        },
        {
            title: "Check availablity",
            onClick: (item) => handleCheckProxy(item.id),
            icon: <FiHelpCircle />
        },
        {
            title: "Change IP",
            onClick: (item) => handleChangeProxyIP(item.id),
            icon: <FiRotateCcw />
        },
        {
            title: "Edit",
            onClick: (item) => navigate(`/proxy/${ item.id }`),
            icon: <FiEdit />
        },
        {
            title: "Remove",
            onClick: (item) => handleDeleteProxy(item.id),
            icon: <FiXCircle />
        }
    ]

    return (
      <ItemsList 
        routes={[
            {
              route: '/proxy/add',
              icon: <FiPlus />
            }
        ]} 
        pageHeader={["Proxy"]}
        getItems={filteredProxies} 
        isLoading={loadingProxy} 
        buttonOptions={buttonOptions}
        searchParams={{
          key: "ProxyList",
          value: searchValue,
          placeholder: "Enter proxy name to search...",
          showSearch: false
        }}
      />
    );
};

export default ProxyList;