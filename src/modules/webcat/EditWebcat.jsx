import React from "react";

import PageHeader from "components/common/PageHeader";
const EditWebcat = () => {
  const [formValue, setFormValue] = React.useState({});
  React.useEffect(() => {}, []);
  const handleEditUser = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="py-6 min-h-screen h-full flex flex-col justify-between">
      <div className="flex flex-col">
        <PageHeader
          header="Editing Webcatalog"
        />
        <form className="my-7">
          <label className="flex flex-col gap-1 mb-4" htmlFor="name">
            Name
            <input
              className="bg-blackSecond text-gray rounded px-3 py-2 focus-visible:outline-none border-none"
              type="text"
              id="name"
              autoComplete="off"
              value={formValue.username}
              readOnly
            />
          </label>
          <label className="flex flex-col gap-1 mb-4" htmlFor="offer">
            Offer
            <input
              className="bg-blackSecond text-gray rounded px-3 py-2 focus-visible:outline-none border-none"
              type="text"
              id="offer"
              autoComplete="off"
              value={formValue.password}
              onChange={(e) =>
                setFormValue({ ...formValue, password: e.target.value })
              }
            />
          </label>
        </form>
      </div>
      <div className="flex flex-col gap-3">
        <button onClick={handleEditUser} className="btn-primary">
          Save
        </button>
      </div>
    </div>
  );
};
export default EditWebcat;
