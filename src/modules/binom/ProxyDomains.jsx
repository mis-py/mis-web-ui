import { useState, useMemo } from 'react';
import { FaCheck } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import Search from "components/common/SearchComponent";
import { 
    useGetProxyDomainsQuery,
    filterProxyByStringSelector,
    useEditBulkProxyDomainsMutation,
} from 'redux/api/modules/binom_companion';
import { toast } from 'react-toastify';
import { ProxyDomainsTable } from './components/ProxyDomainsTable';
import { useNavigate } from 'react-router-dom';

const ProxyDomains = () => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    const proxySearchRresult = useMemo(filterProxyByStringSelector, []);
    const [selectedRows, setSelectedRows] = useState([]);

    const { 
        data, 
        error, 
        isSuccess, 
        isError, 
        isFetching, 
        isLoading,
        searchFiltered
    } = useGetProxyDomainsQuery(undefined, {
        selectFromResult: (result) => ({
            ...result,
            searchFiltered: proxySearchRresult(result, searchValue)
          })
    });

    let searchElement = <Search searchParams={{
        value: searchValue,
        placeholder: "domain, server, tracker...",
        showSearch: false,
        onSearch: setSearchValue
    }}/>

    let tableItems = searchFiltered?.map((item) => ({
        ...item,
        date: new Date(item.date_added).toLocaleString(),
        minutes: `${Math.round(Math.abs((new Date().getTime() - new Date(item.date_added).getTime()) / 1000) / 60)}m ago`,
        is_ready_check: item.is_ready ? <FaCheck className="inline-block" /> : null,
        is_invalid_check: item.is_invalid  ? <FaCheck className="inline-block" /> : null,
        date_title: new Date(item.date_added).toString(),
        tracker_name: item.tracker_instance.name
    }));

    const links = [
        {
          title: "Add domains",
          route: '/domains/add',
          icon: <FiPlus />
        },
    ].map((item, index) => (
        <Link
                key={index}
                to={item.route}
                className="btn btn-outline btn-square btn-sm"
                title={item.title}
            >
            {item.icon}
        </Link>
    ));

    const [updateBulkProxyDomains] = useEditBulkProxyDomainsMutation();

    const updateBulk = async (status_to_assign) => {
        let proxy_domains = selectedRows.map((item) => ({
            id: item,
            ...status_to_assign
        }))
        await updateBulkProxyDomains({proxy_domains}).then(({data, error}) => {
            if (error){
                toast.error(error);
            } else {
                toast.success("Domains updated!");
                navigate('/domains');
            }
        });
    }

    const buttons = (selectedRows.length ? [
        {
            title: "Set Ready",
            onClick: async () => await updateBulk({is_ready: true})
        },
        {
            title: "Unset Ready",
            onClick: async () => await updateBulk({is_ready: false})
        },
        {
            title: "Set Invalid",
            onClick: async () => await updateBulk({is_invalid: true})
        },
        {
            title: "Unset Invalid",
            onClick: async () => await updateBulk({is_invalid: false})
        },
    ] : []).map((item, index) => (
        <button key={index} className="btn btn-outline btn-sm" onClick={item.onClick}>{item.title}</button>
    ));

    const onSelect = (selectedItems) => {
        setSelectedRows(selectedItems);
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <PageHeader pageHeader={["Proxy Domains"]} />
                <div className="flex flex-row text-lg gap-1">
                {buttons.length ? <>{buttons}</>: null}
                {links} 
                {searchElement}
                </div>
            </div>


            <div className="overflow-y-auto max-h-screen p-2">
                <ProxyDomainsTable tableItems={tableItems} onSelect={onSelect} />
            </div>
        </>
    )
}

export default ProxyDomains;