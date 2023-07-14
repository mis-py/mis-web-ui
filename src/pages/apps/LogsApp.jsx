import React from "react";
import PageHeader from "../../components/common/PageHeader";

import { useGetAppLogsQuery } from "redux/index";

import {useParams} from "react-router-dom";

const LogsApp = () => {

  const { id } = useParams();
  const { data: appLogs, refetch: refetchLogs, isLoading: isLogsLoading } = useGetAppLogsQuery({ id });

  const [terminalValue, setTerminalValue] = React.useState("");

  React.useEffect(() => {
    setTerminalValue(appLogs);
  }, [isLogsLoading]);

  return (
    <div className="py-6 min-h-screen h-full flex flex-col justify-between">
      <div className="flex flex-col">
        <PageHeader
          header={`App name logs`}
        />

        <pre>
          {terminalValue}
        </pre>

        {/*<ReactTerminal*/}
        {/*    commands={{}}*/}
        {/*    enableInput={false}*/}
        {/*    showControlBar={false}*/}
        {/*    prompt={terminalValue}*/}
        {/*    theme="dark"*/}
        {/*/>*/}
      </div>
    </div>
  );
};

export default LogsApp;
