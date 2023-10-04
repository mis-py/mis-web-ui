import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useInstallAppByUrlMutation, 
  useInstallAppByNameMutation 
} from "redux/index";
import PageHeader from "components/common/PageHeader";

const InstallApp = () => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = React.useState({
    url: "",
    branch: "",
    name: "",
  });

  const [installAppByName] = useInstallAppByNameMutation();
  const [installAppByUrl] = useInstallAppByUrlMutation();

  const handleCloneApp = async (e) => {
    e.preventDefault();
    // TODO add some popup with progress here

    if (formValue.url !== "") {
      await installAppByUrl({
        ...formValue,
      }).unwrap();

    } else if (formValue.path !== ""){
      await installAppByName({
        ...formValue,
      }).unwrap();
    }

    navigate("/apps");
    toast.success("Added new app");
  };

  return (
    <div className="flex flex-5 flex-col h-screen overflow-y-auto">
      <div className="flex items-center justify-between">
        <PageHeader pageHeader={["Administration","isBack:Apps","Install new app"]}/>
      </div>
      <div className="flex flex-col h-screen overflow-y-auto p-2">
        <div className="form-control">
            <label className="label" htmlFor="url">
              <span className="label-name">Git Url</span>
            </label>
            <input
              className="input input-bordered input-sm w-full"
              type="text"
              id="url"
              autoComplete="off"
              placeholder="Enter link to app"
              value={formValue.url}
              onChange={(e) =>
                setFormValue({ ...formValue, name: "", url: e.target.value })
              }
            />
        </div>
        <div className="form-control">
          <label className="label" htmlFor="branch">
              <span className="label-name">Branch name</span>
          </label>
          <input
            className="input input-bordered input-sm w-full"
            type="text"
            id="branch"
            autoComplete="off"
            placeholder="Enter branch name (default main)"
            value={formValue.branch}
            onChange={(e) =>
              setFormValue({ ...formValue, name: "", branch: e.target.value })
            }
          />
        </div>
        <div class="divider">OR</div>

        <div className="form-control">
          <label className="label" htmlFor="path">
              <span className="label-name">Local path</span>
          </label>
          <input
            className="input input-bordered input-sm w-full"
            type="text"
            id="path"
            autoComplete="off"
            placeholder="Enter path relative to 'modules/' directory"
            value={formValue.path}
            onChange={(e) =>
              setFormValue({ url: "", branch: "", name: e.target.value })
            }
          />
        </div>  

        <div className="form-control pt-4">
          <button
            onClick={handleCloneApp}
            className="btn btn-outline btn-sm"
          >Install</button>
        </div>
      </div>
    </div>
  );
};

export default InstallApp;
