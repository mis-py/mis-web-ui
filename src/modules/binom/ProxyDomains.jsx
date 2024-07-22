import { useState, useMemo, useEffect } from 'react';
import { FiPlus } from "react-icons/fi";
import { FiRotateCw } from "react-icons/fi";
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
import Select from "react-select";
import ServerNameSelect from './components/ServerNameSelect';
import TrackerInstanceSelect from './components/TrackerInstanceSelect';

const ProxyDomains = () => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    const [serverNameValue, setServerNameValue] = useState("");
    const [trackerInstanceValue, setTrackerInstanceValue] = useState("");
    const [allReady, setAllReady] = useState(undefined);
    const [allInvalid, setAllInvalid] = useState(undefined);
    const proxySearchRresult = useMemo(filterProxyByStringSelector, []);
    const [selectedRows, setSelectedRows] = useState([]);
    const [pageSize, setPageSize] = useState(500);

    const { 
        data, 
        error, 
        isSuccess, 
        isError, 
        isFetching, 
        isLoading,
        searchFiltered,
        refetch,
    } = useGetProxyDomainsQuery({ size: pageSize }, {
        selectFromResult: (result) => ({
            ...result,
            searchFiltered: proxySearchRresult(
                result, 
                searchValue, 
                serverNameValue, 
                trackerInstanceValue,
                allReady,
                allInvalid
            )
          })
    });

    let searchElement = <Search searchParams={{
        value: searchValue,
        placeholder: "Domain",
        showSearch: false,
        onSearch: setSearchValue
    }}/>

    let tableItems = searchFiltered?.map((item) => ({
        ...item,
        date: new Date(item.date_added).toLocaleString(),
        minutes: `${Math.round(Math.abs((new Date().getTime() - new Date(item.date_added).getTime()) / 1000) / 60)}m ago`,
        date_title: new Date(item.date_added).toString(),
        tracker_name: item.tracker_instances.map(elem => elem.id).join(', ')
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
    
    let updateDomainsList = async () => {
        await refetch().then(({data, error}) => {
            // if (error){
            //     toast.error(`Domains not updated: ${error}`);
            // } else {
            //     toast.success("Domains updated!");
            // }
        });

    }

    let additionalControl = [
        {
            title: "Update",
            onClick: () => updateDomainsList(),
            icon: <FiRotateCw  />
        }
    ].map((item, index) => (<button key={index} className="btn btn-outline btn-square btn-sm" onClick={item.onClick} title={item.title}>{item.icon}</button>));

    useEffect(()=>{
        updateDomainsList();
    }, [pageSize])

    const onSelect = (selectedItems) => {
        setSelectedRows(selectedItems);
    }

    return (
        <>
            <div className="flex flex-none justify-between">
                <PageHeader pageHeader={["Proxy Domains"]} />
                <div className="flex flex-row text-lg gap-1 items-center">
                    {buttons.length ? <>{buttons}</>: null}
                    {additionalControl}
                    {links} 
                    {searchElement}
                    <ServerNameSelect 
                        onServerNameChange={(serverName) => setServerNameValue(serverName ?? "")} 
                        showTitle={false}
                        placeholder={"Server"}
                    />
                    <TrackerInstanceSelect 
                        onTrackerInstanceChange={(tracker) => setTrackerInstanceValue(tracker.name ?? "")} 
                        showTitle={false} 
                        placeholder={"Tracker"}
                    />
                    <div className="form-control">
                        <label className="label cursor-pointer gap-1">
                            <span className="label-text">Ready</span> 
                            <input type="checkbox" className="checkbox" value={allReady} onChange={(e) => setAllReady(e.target.checked ? e.target.checked : undefined)} />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer gap-1">
                            <span className="label-text">Invalid</span> 
                            <input type="checkbox" className="checkbox" value={allInvalid} onChange={(e) => setAllInvalid(e.target.checked ? e.target.checked : undefined)} />
                        </label>
                    </div>
                </div>
            </div>


            {/* <div className="flex-grow overflow-y-auto max-h-screen p-2"> */}
            <ProxyDomainsTable tableItems={tableItems} onSelect={onSelect} />
            {/* </div> */}

            <div className='flex flex-none justify-between p-2 items-center'> 
                <div className='flex items-center justify-center gap-2'>
                    <span>All: {tableItems.length}</span>
                    <span>Ready: {tableItems.filter(item => item.is_ready).length}</span>
                    <span>Invalid: {tableItems.filter(item => item.is_invalid).length}</span>
                    <span>Selected: {selectedRows.length}</span>
                </div>

                <div className='flex items-center justify-center gap-2'>
                    <span>Items per page: </span>
                    <Select
                        menuPlacement='top'
                        value={{ value: pageSize, label: pageSize }} 
                        onChange={(item) => setPageSize(item.value)}
                        options={[
                            { value: 500, label: 500 },
                            { value: 1000, label: 1000 },
                            { value: 1500, label: 1500 } 
                        ]}
                        classNames={{
                            control: (state) => (
                                'input-bordered'
                            ),
                        }}
                        styles={{
                            control: (baseStyles, state) => ({
                                WebkitAlignItems: 'center',
                                WebkitBoxAlign: 'center',
                                msFlexAlign: 'center',
                                alignItems: 'center',
                                cursor: 'default',
                                display: '-webkit-box',
                                display: '-webkit-flex',
                                display: '-ms-flexbox',
                                display: 'flex',
                                WebkitBoxFlexWrap: 'wrap',
                                WebkitFlexWrap: 'wrap',
                                msFlexWrap: 'wrap',
                                flexWrap: 'wrap',
                                WebkitBoxPack: 'justify',
                                WebkitJustifyContent: 'space-between',
                                justifyContent: 'space-between',
                                minHeight: '38px',
                                position: 'relative',
                                WebkitTransition: 'all 100ms',
                                transition: 'all 100ms',
                                borderStyle: 'solid',
                                borderWidth: '1px',
                                boxSizing: 'border-box',
                                '--tw-bg-opacity': '1',
                                borderRadius: '0.5rem',
                                backgroundColor: 'hsl(var(--b1) / var(--tw-bg-opacity))',
                                borderColor: 'hsl(var(--bc) / var(--tw-border-opacity))',
                                ':focus': {
                                    outlineStyle: 'solid',
                                    outlineWidth: '2px',
                                    outlineOffset: '2px',
                                    outlineColor: 'hsl(var(--bc) / 0.2)',
                                },
                                ':hover': {
                                    borderColor: 'hsl(var(--bc) / var(--tw-border-opacity))'
                                }
                            }),
                            menu: (baseStyles, state) => ({
                                ...baseStyles,
                                zIndex: 11,
                                '--tw-bg-opacity': '1',
                                backgroundColor: 'hsl(var(--b1) / var(--tw-bg-opacity))',
                            }),
                            valueContainer: (baseStyles, state) => ({
                                ...baseStyles,
                                paddingLeft: '0.5rem',
                                paddingRight: '0.75rem',
                                paddingTop: '0.05rem',
                                paddingBottom: '0.05rem'
                            }),
                            singleValue: (baseStyles, state) => ({
                                ...baseStyles,
                                color: 'hsl(var(--bc) / var(--tw-text-opacity, 1))'
                            }),
                            option: (baseStyles, state) => ({
                                ...baseStyles,
                                backgroundColor: 'transparent',
                                color: 'hsl(var(--bc) / var(--tw-text-opacity))',
                                ':hover': {
                                    cursor: 'pointer',
                                    backgroundColor: 'hsl(var(--bc) / 0.1)',
                                    '--tw-text-opacity': '1',
                                    color: 'hsl(var(--bc) / var(--tw-text-opacity))',
                                    outline: '2px solid transparent',
                                    outlineOffset: '2px'
                                }
                            })
                        }}
                    />
                </div>
            </div>
        </>
    )
}

export default ProxyDomains;