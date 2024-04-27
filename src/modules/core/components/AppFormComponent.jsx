import { React, useEffect, useState } from "react";
import Input from "components/common/Input";
import { confirmAlert } from "react-confirm-alert";

const AppForm = ({app, onAppStateChange, onAppLoadStateChange}) => {
    const [checked, setChecked] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        if (app){
            setChecked(app.enabled);
            setName(app.name);
        }
    }, [app])

    const onChange = (e) => {
        let enable = e.target.checked;

        let message = "Confirm " + (enable ? `enabling '${app.name}'` : `disabling '${app.name}'`)
        confirmAlert({
            // title: title,
            message: message,
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => {
                        setChecked(enable);
                        onAppStateChange(enable);
                    },
                },
                {
                    label: "No",
                },
            ],
            overlayClassName: "bg-blackSecond/70",
        });

    }
    // TODO make then loadable
    const handleLoadApp = () => {onAppLoadStateChange(true)}
    const handleUnloadApp = () => {onAppLoadStateChange(false)}

    return (<>
        <p>{app.manifest.display_name} {app.manifest.version}</p>
        <p>{app.manifest.description}</p>
        <p>Enabled: {app.enabled.toString()}</p>
        <p>State: {app.state}</p>
        <div className="form-control">
            <label className="label">
                <span className="label-text">Enable app</span>
            </label>
            <input 
                type="checkbox" 
                className="toggle toggle-success" 
                checked={checked}
                onChange={onChange}
                value={checked}
            />
        </div>
        
        <Input
            label="App name"
            type="text"
            id="name"
            autoComplete="off"
            value={name}
            readOnly={true}
        />
        <Input
            label="Author"
            type="text"
            id="author"
            autoComplete="off"
            value={app.manifest.author}
            readOnly={true}
        />
        <Input
            label="Category"
            type="text"
            id="category"
            autoComplete="off"
            value={app.manifest.category}
            readOnly={true}
        />
        <Input
            label="Dependencies"
            type="text"
            id="dependencies"
            autoComplete="off"
            value={app.manifest.dependencies.join(', ')}
            readOnly={true}
        />


        <div className="flex-row form-control pt-4 gap-2">
          <button
            onClick={handleLoadApp}
            className="btn btn-outline btn-sm flex-1"
          >Init</button>

        <button
            onClick={handleUnloadApp}
            className="btn btn-outline btn-sm flex-1"
          >Shutdown</button>
        </div>
    </>
    );
}

export default AppForm;