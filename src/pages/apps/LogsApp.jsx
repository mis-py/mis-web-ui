import React from "react";
import PageHeader from "../../components/common/PageHeader";

import { useGetAppLogsQuery, useGetAppByIdQuery } from "redux/index";

import {useParams} from "react-router-dom";

import LogItem from "components/logs/LogItem";

const LogsApp = () => {

  const { id } = useParams();
  const { data: appLogs, refetch: refetchLogs, isLoading: isLogsLoading } = useGetAppLogsQuery({ id });
  const { data: applicationData, isLoading: isAppDataLoading } = useGetAppByIdQuery(id);

  const [terminalValue, setTerminalValue] = React.useState("");

  const [appData, setAppData] = React.useState({});

  React.useEffect(() => {
    setTerminalValue(appLogs);
    setAppData(applicationData);
  }, [isLogsLoading, isAppDataLoading]);

  return (
    <div className="py-6 min-h-screen h-full flex flex-col justify-between">
      <div className="flex flex-col">
        <PageHeader
          header={`${appData === undefined || appData.name === undefined ? "" : appData.name} logs`}
          headerClass="capitalize-first"
        />

        <button onClick={() => {refetchLogs()}}>Reload</button>

        <pre className="whitespace-break-spaces">
        {terminalValue !== undefined && terminalValue.split("\n").reverse().map(item => {
          if (item.trim().length === 0) {
            return;
          }

          try {
          const data = JSON.parse(item);

          return <LogItem
                    key={`log-item-${data.record.line}-${data.record.level.name}-${data.record.elapsed.seconds}-${data.record.message.replace(" ", "-")}`}
                    logData={data}
                  />;
          } catch(e) {
            const rand = Math.random();
            return (<p className="mb-2" key={`log-item-text-${rand}`}>{item}</p>);
          }
        })}
        </pre>
      </div>
    </div>
  );
};

export default LogsApp;
