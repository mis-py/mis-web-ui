import React, { useState } from "react";
import Input from "components/common/Input";
import ProxyTypeSelector from "./ProxyTypeSelector";
import ProxyCheck from "./ProxyCheck";

const ProxyForm = ({proxy, onProxyChange}) => {
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
                pattern={`(http|https)\:\/\/`}
            />
            <ProxyTypeSelector
                proxyType={proxy.proxy_type}
                onProxyTypeChange={(newType) => onProxyChange({...proxy, proxy_type: newType})}
            />
            <ProxyCheck address={proxy.address} />
        </>
    );
};

export default ProxyForm;