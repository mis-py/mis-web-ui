import React from "react";
import { Route, Routes } from "react-router-dom";
import ProxyList from "./ProxyList";
import ProxyEdit from "./ProxyEdit";


const Proxy = () => {
    return (
        <Routes>
            <Route index element={<ProxyList/>} />
            <Route path="/add" element={<ProxyEdit/>} />
            <Route path="/:id" element={<ProxyEdit/>} />
        </Routes>
    );
};

export default Proxy;