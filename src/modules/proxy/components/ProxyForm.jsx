import React, { useState } from "react";
import Input from "components/common/Input";
import ProxyTypeSelector from "./ProxyTypeSelector";

import { 
    useProxyCheckMutation,
 } from "redux/api/modulesApi/proxyApi";

const ProxyForm = ({proxy, onProxyChange}) => {
    const [checkProxy, { isLoading }] = useProxyCheckMutation();

    const [checkState, setCheckState] = useState({});

    const handleCheckProxy = async () => {
        // TODO add proper validation, on backend maybe?
        if (proxy.address == undefined || proxy.address.length === 0) {
            // TODO add toast with error
            return;
        }
        setCheckState({});

        // let response = {};
        let response = await checkProxy({proxy_address: proxy.address}).unwrap();
        // let response = {"result":{"status":200,"text":"89.209.224.243"},"exceptions":{"ValueError":"Wrong URI","TypeError":"WrongType"}};

        setCheckState(response);
    }

    return (
        <>
            <Input
                label="Proxy name"
                type="text"
                id="proxy-name"
                placeholder={"proxy name"}
                value={proxy.name}
                onInputChange={(e) => onProxyChange({...proxy, name: e.target.value})}
            />
            <Input
                label="Proxy address"
                type="text"
                id="proxy-address"
                placeholder={"http:// or socks5://"}
                value={proxy.address}
                onInputChange={(e) => onProxyChange({...proxy, address: e.target.value})}
                pattern={`(socks5|SOCKS5|http|HTTP)\:\/\/`}
            />
            <Input
                label="Proxy change URL"
                type="text"
                id="proxy-change"
                placeholder={"https://"}
                value={proxy.change_url}
                onInputChange={(e) => onProxyChange({...proxy, change_url: e.target.value})}
                pattern={`(socks5|SOCKS5|http|HTTP)\:\/\/`}
            />
            <ProxyTypeSelector
                proxyType={proxy.proxy_type}
                onProxyTypeChange={(newType) => onProxyChange({...proxy, proxy_type: newType})}
            />
            <div className="flex flex-col items-center mt-4 gap-1">
                <button className="btn btn-sm btn-rounded" onClick={() => handleCheckProxy()} >
                    {isLoading && <span className="loading loading-spinner"></span>}
                    {isLoading ? 'Checking...' : 'Check Proxy'}
                </button>
                { checkState && checkState.result && <span>Status: {checkState.result.status} </span>}
                { checkState && checkState.result && <span>Proxy IP: {checkState.result.text} </span>}
                { checkState && checkState.exceptions && Object.keys(checkState.exceptions) > 0 && <span>Exceptions</span>}
                { checkState && checkState.exceptions && Object.entries(checkState.exceptions).map(([key, value], index) => <span key={index}>{key}: {value}</span>) }
            </div>
        </>
    );
};

export default ProxyForm;