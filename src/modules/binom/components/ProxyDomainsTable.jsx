import React from 'react';
import TableSelect from './TableSelect/TableSelect';

export const ProxyDomainsTable = ({ tableItems, onSelect }) => {

    const columns = [
        { label: "ID", accessor: "id", sortable: true, sortbyOrder: "desc" },
        { label: "Domain", accessor: "name", sortable: true, w0: true },
        { label: "", accessor: "name", sortable: false, is_href: true },
        { label: "Server", accessor: "server_name", sortable: true, text_center: true },
        { label: "Tracker", accessor: "tracker_name", sortable: false, text_center: true },
        { label: "Add date", accessor: "date", title_accessor: "date_title", sortable: true, text_center: true },
        { label: "Minutes", accessor: "minutes", sortable: true },
        { label: "Ready", accessor: "is_ready", sortable: true, is_checked: true, text_center: true},
        { label: "Invalid", accessor: "is_invalid", sortable: true, is_checked: true, text_center: true },
    ];

    return (
        <div className="overflow-x-auto">
            <TableSelect columns={columns} tableItems={tableItems} is_body_horizontal={false} onSelect={onSelect} />
        </div>
    )
}