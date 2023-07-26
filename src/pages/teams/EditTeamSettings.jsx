import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";
import {
    useGetSettingsTeamIdQuery,
    useGetTeamIdQuery,
    useGetSettingsQuery,
    useSettingsTeamSetMutation
} from "../../redux";

import PageHeader from "components/common/PageHeader";
import { FiSearch } from "react-icons/fi";
import Input from "../../components/Input";

const EditTeamSettings = () => {
  const { id } = useParams();

  const { data: teamData } = useGetTeamIdQuery(id);
  const { data: teamSettings, isLoading: teamSettingsLoading } = useGetSettingsTeamIdQuery(id);
  const { data: allSettings, isLoading: allSettingsLoading } = useGetSettingsQuery();

  const [searchValue, setSearchValue] = React.useState("");
  const [formValues, setFormValues] = React.useState([]);

  const [editTeamSettingsSet] = useSettingsTeamSetMutation();

  React.useEffect(() => {
      if (teamSettings !== undefined && allSettings !== undefined) {
          const _formValue = [];

          allSettings.map(allSettingsItem => {
              if (allSettingsItem.is_global === true) {
                return;
              }

              const teamSetting = teamSettings.find(
                  (teamSetting) => teamSetting.setting.id === allSettingsItem.id
              );

              _formValue.push({ ...allSettingsItem, value: teamSetting === undefined ? "" : teamSetting.value});
          });

          setFormValues(_formValue);
      }
  }, [teamSettingsLoading, allSettingsLoading]);

    const handleInputChange = (value, item) => {
        const _formValue = [];

        formValues.map(formValue => {
            if (formValue.id === item.id) {
                _formValue.push({ ...formValue, value: value });
            } else {
                _formValue.push({ ...formValue });
            }
        });

        setFormValues(_formValue);
    };

    const HandleSaveTeamSettings = async (e) => {
        e.preventDefault();
        const updateValues = [];

        formValues.map((formValue) => {
            const teamSetting = teamSettings.find(
                (teamSetting) => teamSetting.setting.id === formValue.id
            );

            // Проверка, что formValue и formValue.value не являются undefined
            if (formValue !== undefined && formValue.value.length === 0
                && (!teamSetting || !teamSetting.value) // Проверка, что teamSetting и teamSetting.value не являются undefined
                || (teamSetting && teamSetting.value === formValue.value)
            ) {
                return;
            }

            updateValues.push({
                setting_id: formValue.id,
                new_value: formValue.value,
            });
        });

        if (updateValues.length === 0) {
            toast.error("No changes found");
            return;
        }

        await editTeamSettingsSet({
            id,
            settings: updateValues,
        }).then((res) => {
            if (res.data === null) {
                toast.success("Team settings were updated");
            } else {
                toast.error(res.error.data.message);
            }
        });
    };

  return (
    <div className="py-6 min-h-screen h-full flex flex-col justify-between">
      <div className="flex flex-col">
        <PageHeader
          header={`${teamData === undefined ? "Team name" : teamData.name} settings`}
        />

          <form className="my-4 pb-[50px]">
              <label
                  className="flex justify-between items-center bg-blackSecond rounded text-sm text-gray mb-7"
                  htmlFor="search"
              >
                  <input
                      className="w-full bg-transparent border-none focus:shadow-none focus:ring-0"
                      type="search"
                      placeholder="Enter setting name to search..."
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <FiSearch className="w-12 text-gray" />
              </label>

              {formValues
                  ?.filter((el) =>
                      el.key.toLowerCase().includes(searchValue.toLowerCase().trim())
                  )?.map(formItem => (
                  <Input
                      key={formItem.id}
                      label={`${formItem.key} ( ${formItem.app.name} )`}
                      id={`${formItem.key}-${formItem.app.name}`.toLowerCase()}
                      type="text"
                      autoComplete="off"
                      value={formItem.value}
                      name={formItem.key}
                      hasDefault={formItem.default_value !== null && formItem.default_value.length}
                      changeValue={(e) => handleInputChange(e.target.value, formItem)}
                      setDefault={() => handleInputChange(formItem.default_value, formItem)}
                  />
              ))}
          </form>
      </div>

      <div className="flex flex-col gap-4">
        <button onClick={HandleSaveTeamSettings} className="btn-primary">Save</button>
      </div>
    </div>
  );
};

export default EditTeamSettings;
