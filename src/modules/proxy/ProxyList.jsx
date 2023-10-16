import React from "react";
import { 
    useGetProxiesQuery, 
    useDeleteProxyMutation,
    useProxyChangeIPMutation
} from "redux/api/modulesApi/proxyApi";
import ItemsList from "components/ItemsList";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FiEdit, FiXCircle, FiPlus, FiRotateCcw, FiCheck } from "react-icons/fi";
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
            ],
            // avatar: UserImg
        }
    ))

    const [deleteProxy] = useDeleteProxyMutation();
    const [changeProxyIP] = useProxyChangeIPMutation();

    const handleChangeProxyIP = async (proxy_id) => {
        // let response = await changeProxyIP(proxy_id).unwrap();
        let response = {"result":{"status":200,"text":"89.209.224.243"}, "exceptions": {"ValueError":"Wrong URI","TypeError":"WrongType"}}
        
        if (response.result.status === 200){
            toast.success(`${response.result.status}: ${response.result.text}`);
        }
        if (Object.keys(response.exceptions) > 0){
            console.log('except');
            Object.entries(response.exceptions).map(([key, value]) => toast.warning(`${key}: ${value}`));
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

    const buttonOptions = [
        {
            title: "Check availablity",
            onClick: () => {},
            icon: <FiCheck />
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

    const routes = [
      {
        route: '/proxy/add',
        icon: <FiPlus />
      }
    ];

    return (
      <ItemsList 
        routes={routes} 
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