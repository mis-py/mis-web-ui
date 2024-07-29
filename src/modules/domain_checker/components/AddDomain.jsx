import React from "react";

import Input from "../../../components/common/Input";
import Select from "../../../components/common/Select";

const AddDomain = ({
  newDomain,
  proxyList,
  handleInputChange,
  handleSelectChange,
}) => {
  return (
    <>
      <div className="bg-base-300 rounded-box p-3">
        <Input
          label={`New domain`}
          type="text"
          name="name"
          value={newDomain.name}
          onInputChange={handleInputChange}
        />
        <Select
          label="Add proxy"
          name="id"
          list={proxyList}
          handleSelectChange={handleSelectChange}
        />
        <Input
          label={`Polling frequency (Check every ${newDomain.interval} seconds)`}
          type="number"
          name="interval"
          value={newDomain.interval}
          onInputChange={handleInputChange}
        />
      </div>
    </>
  );
};

export default AddDomain;
