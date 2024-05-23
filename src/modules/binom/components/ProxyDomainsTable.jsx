import React from 'react';
import TableSelect from './TableSelect/TableSelect';

export const ProxyDomainsTable = ({ tableItems }) => {

    const columns = [
        { label: "ID", accessor: "id", sortable: true, sortbyOrder: "desc" },
        { label: "Domain", accessor: "name", sortable: true },
        { label: "Server", accessor: "server_name", sortable: true },
        { label: "Tracker", accessor: "tracker_name", sortable: false },
        { label: "Add date", accessor: "date", title_accessor: "date_title", sortable: true },
        { label: "Minutes", accessor: "minutes", sortable: true },
        { label: "Is Ready", accessor: "is_ready_check", sortable: true },
        { label: "Is Invalid", accessor: "is_invalid_check", sortable: true },
    ];

    return (
        <div className="overflow-x-auto py-4">
            <TableSelect columns={columns} tableItems={tableItems} is_body_horizontal={false} />
        </div>
    )
}