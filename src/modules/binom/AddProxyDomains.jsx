import { useState } from 'react';
import PageHeader from "../../components/common/PageHeader";
import ServerNameSelect from './components/ServerNameSelect';
import TrackerInstanceSelect from './components/TrackerInstanceSelect';
import Modal from 'components/common/Modal';
import { toast } from 'react-toastify';
import { useAddBulkProxyDomainsMutation } from 'redux/api/modules/binom_companion';
import { useNavigate } from 'react-router-dom';
import { useDomainGenerator } from './hooks/useDomainGenerator';

const domainReg = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;

const AddProxyDomains = () => {
    const navigate = useNavigate();
    const generator = useDomainGenerator();

    const [domainsList, setDomainsList] = useState([]);

    const [serverName, setServerName] = useState();
    const [trackerInstance, setTrackerInstance] = useState();

    const [isAddOpen, setAddIsOpen] = useState(false);

    const [numToGenerate, setTumToGenerate] = useState(20);

    const onDomainsAddClick = () => {
        if (!serverName){
            toast.error("Please specify server name for domains");
            return;
        }
        if (!trackerInstance?.id){
            toast.error("Please specify tracker instance for domains");
            return;
        }
        if (!domainsList.length){
            toast.error("Please specify at least 1 domain");
            return;
        }
        setDomainsList(domainsList.filter(item => item));
        setAddIsOpen(true);
    }

    const onTextAreaChange = (e) => {
        let value = e.target.value.replace(/ /g,"").split("\n");
        setDomainsList(value);
    }

    const onNumToGenerateChange = (e) => {
        let value = Math.min(Math.max(e.target.value, 0), 20);
        setTumToGenerate(value);
    }

    const onGenerateClick = () => {
        let generated_domains = generator(numToGenerate);
        setDomainsList(generated_domains);
    }

    const [addDomains] = useAddBulkProxyDomainsMutation();

    return (
        <>
            <PageHeader pageHeader={["Add new proxy domains"]} />
            <div className="flex overflow-y-auto w-4/12 flex-col gap-2 p-2">
                <ServerNameSelect onServerNameChange={setServerName} />
                <TrackerInstanceSelect onTrackerInstanceChange={setTrackerInstance} />
                <div className="form-control">
                    <div className="flex justify-between">
                        <label className="label">
                            <span className="label-text">Domains list</span>
                        </label>
                        <div className="flex gap-x-1">
                            <button className="btn btn-sm btn-outline" onClick={onGenerateClick}>Generate</button>
                            <input
                                className="w-12 input input-sm input-bordered" 
                                maxLength={2} 
                                value={numToGenerate} 
                                onChange={onNumToGenerateChange} 
                                title="Enter number between 1 and 20"
                            />
                        </div>
                    </div>

                    <textarea
                        value={domainsList.join("\n")}
                        onChange={onTextAreaChange} 
                        rows="25" className="textarea textarea-bordered leading-4" placeholder="Enter domains, each at new row"></textarea>
                </div>
                <div className="flex">
                    <button onClick={onDomainsAddClick} className="btn btn-sm btn-outline btn-wide">Save</button>
                </div>
            </div>

            <Modal
                open={isAddOpen}
                onClose={() => setAddIsOpen(false)}
                id={`add_domains_modal`} 
                header={"Confirm add new proxy domains"} 
                body={
                    <div className="flex flex-col">
                        <span className="font-medium text-sm mt-4">Server name: <span className='text-green-700'>{serverName}</span></span>
                        <span className="font-medium text-sm">Tracker instance: <span className='text-green-700'>{trackerInstance?.name}</span></span>
                        <span className="font-medium text-sm">Domains:</span>
                        <ul className="list-decimal list-inside text-slate-900">
                            {
                                domainsList.map((item, index) => {
                                    const ok = domainReg.exec(item);
                                    return <li key={index} className={ok ? 'text-green-700' : 'text-red-700'}>{item}</li>
                                })
                            }
                        </ul>
                    </div>
                } 
                buttons={[
                    {
                        label: "Yes",
                        onClick: async () => {
                            if (!domainsList.every(item => domainReg.exec(item))){
                                toast.error("Please enter correct domain names");
                                return;
                            }
                            // what if domains exists?
                            await addDomains({ server_name: serverName, tracker_instance_id: trackerInstance.id, domain_names: domainsList }).then(({data, error}) => {
                                if (error){
                                    toast.error(error);
                                } else {
                                    toast.success("Domain added!");
                                    navigate('/domains');
                                }
                            });
                        }
                    }
                ]}
                container_styles=''
            />
        </>
    )
}

export default AddProxyDomains;