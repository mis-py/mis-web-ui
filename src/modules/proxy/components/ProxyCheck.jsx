import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { 
    useProxyCheckMutation,
} from "redux/api/modulesApi/proxyApi";
import {confirmAlert} from "react-confirm-alert";

const ProxyCheck = ({address}) => {
    const [checkProxy, { isLoading }] = useProxyCheckMutation();

    const [checkState, setCheckState] = useState({});

    const handleCheckProxy = async () => {
        if (address == undefined || address.length === 0) {
            toast.error(`Proxy address not specified!`);
            return;
        }
        setCheckState({});

        let response = await checkProxy({proxy_address: address}).unwrap();

        setCheckState(response);
    }

    let renderReport = (response) => {

        return (
            <>
                <div className='card'>
                    <p className={`text-success ${response.text != undefined && response.text.length == 0 ? 'hidden' : ''}`}>Check response: {response.text}</p>
                    <p className={`text-error ${response.exceptions != undefined && response.exceptions.length == 0 ? 'hidden' : ''}`}>{response.exceptions.length} exceptions occurred!</p>
                    <div className={`card-actions justify-end ${response.exceptions != undefined && response.exceptions.length == 0 ? 'hidden' : ''}`}>
                        <button className="btn btn-sm btn-rounded" onClick={() => document.getElementById('exceptions-modal').showModal()}>Show exceptions</button>
                    </div>
                </div>
                <dialog id="exceptions-modal" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                        <h3 className="font-bold text-lg">During check {response.exceptions.length} exceptions occurred!</h3>

                        <div className="overflow-x-auto py-4">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Exception</th>
                                        <th>Text</th>
                                        <th>Retry</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(response.exceptions).map(([key, value], index) => (
                                        <tr key={index}>
                                            <td>{value['exception']}</td>
                                            <td>{value['exception_text']}</td>
                                            <td>{value['retry']}</td>
                                        </tr>
                                    ))}
                                            
                                </tbody>
                            </table>
                        </div>

                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </>
        )
    }

    return (
        <div className="flex flex-col items-center mt-4 gap-1">
            <button className="btn btn-sm btn-rounded" onClick={() => handleCheckProxy()} >
                {isLoading && <span className="loading loading-spinner"></span>}
                {isLoading ? 'Checking...' : 'Check Proxy'}
            </button>

            { Object.keys(checkState).length > 0 && renderReport(checkState) }
        </div>
    );
}

export default ProxyCheck;