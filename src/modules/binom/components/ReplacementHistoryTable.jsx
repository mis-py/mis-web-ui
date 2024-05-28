import React from 'react';

export const ReplacementHistoryTable = ({items}) => {
    let rows = items.map((item, index) => {
        const latestDate = new Date(item.date_changed ?? "") ?? "unknown";
    
        const minutesPassed = Math.round(Math.abs((new Date().getTime() - latestDate.getTime()) / 1000) / 60);

        return (
            <tr key={index} className={index == 0 ? 'text-green-700' : null}>
                <th>{item.id}</th>
                <td>{item.to_domain.id} {item.to_domain.name}</td>
                <td>{item.replaced_by.username}</td>
                <td title={latestDate.toString()}>{latestDate.toLocaleString()}</td>
                <td>{minutesPassed}m ago</td>
                <td>{item.reason}</td>
            </tr>
        )
    });

    return (
        <div className="overflow-x-auto py-4">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Domain</th>
                        <th>User</th>
                        <th>Date</th>
                        <th>Minutes</th>
                        <th>Reason</th>
                    </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
        </div>
    )
}