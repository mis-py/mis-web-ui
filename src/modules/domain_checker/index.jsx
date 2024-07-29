import React from "react";
import { useDispatch, useSelector } from "react-redux";
//SLICES
import { addDomain, addDomainProxy } from "redux/slices/domainCheckerSlice";
//COMPONENTS
import Search from "../../components/common/SearchComponent";
import DomainsList from "./components/DomainsList";
import DomainsHeader from "./components/DomainsHeader";
import { FiPause, FiPlay } from "react-icons/fi";
import DomainsStatsList from "./components/DomainsStatsList";
import AddDomain from "./components/AddDomain";
import CurrentDomain from "./components/CurrentDomain";

const DomainChecker = () => {
  const dispatch = useDispatch();
  const [domainTab, setDomainTab] = React.useState("Statistics");
  const newDomain = useSelector((state) => state.domain);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    dispatch(addDomain({ name, value }));
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    const selectedItem = fakeApi.find((item) => item.id === parseInt(value));
    dispatch(
      addDomainProxy({ name: "id", value: selectedItem ? selectedItem.id : "" })
    );
    dispatch(
      addDomainProxy({
        name: "name",
        value: selectedItem ? selectedItem.name : "",
      })
    );
  };

  //FAKE API
  const fakeApi = [
    {
      id: 1,
      name: "UA",
    },
    {
      id: 2,
      name: "TR",
    },
    {
      id: 3,
      name: "KZ",
    },
  ];

  return (
    <>
      <DomainsHeader title={domainTab} setDomainTab={setDomainTab} />
      <div className="grid items-start w-full xl:grid-cols-2 gap-3">
        <div className="card bg-base-300 rounded-box p-3 gap-3">
          <Search />
          <div className="flex items-center gap-2">
            <button className="btn btn-outline btn-xs">
              <FiPlay /> Resume
            </button>
            <button className="btn btn-outline btn-xs">
              <FiPause /> Pause
            </button>
          </div>
          <DomainsList setDomainTab={setDomainTab} />
        </div>

        {domainTab === "Statistics" && <DomainsStatsList />}
        {domainTab === "Add New Monitor" && (
          <AddDomain
            newDomain={newDomain}
            proxyList={fakeApi}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
          />
        )}
        {domainTab === "Current domain" && <CurrentDomain />}
      </div>
    </>
  );
};

export default DomainChecker;
