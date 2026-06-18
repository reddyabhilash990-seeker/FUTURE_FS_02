import { useEffect, useState } from "react";
import { saveAs } from "file-saver";

function LeadList() {
    const [leads, setLeads] = useState([]);
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [selectedLead, setSelectedLead] = useState(null);
    const loadData = async () => {
        const response = await fetch("https://crm-backend-ta5h.onrender.com/");
        const data = await response.json();
        setLeads(data);
    };
    const exportCSV = () => {
        const headers = [
            "ID",
            "Name",
            "Email",
            "Phone",
            "Status",
            "Notes",
        ];

        const rows = leads.map((lead) => [
            lead.id,
            lead.name,
            lead.email,
            lead.phone,
            lead.status,
            lead.notes,
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map((row) => row.join(",")),
        ].join("\n");

        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });

        saveAs(blob, "crm-leads.csv");
    };

    useEffect(() => {
        loadData();
    }, []);



    return (
        <div>

            <button
                onClick={exportCSV}
                className="bg-green-600 text-white px-4 py-2 rounded-lg mb-4 hover:bg-green-500 mr-2"
            >
                📄 Export CSV
            </button>
            <input
                type="text"
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border p-3 rounded-lg mb-4 w-full"
            />
            <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border p-3 rounded-lg mb-4 ml-2"
            >
                <option value="All">All Status</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Closed">Closed</option>
            </select>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white shadow rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 text-left">ID</th>
                            <th className="p-4 text-left">Name</th>
                            <th className="p-4 text-left">Email</th>
                            <th className="p-4 text-left">Phone</th>
                            <th className="p-4 text-left">Created</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {leads.filter((lead) =>
                            lead.name.toLowerCase().includes(search.toLowerCase())
                        )
                            .filter((lead) =>
                                filterStatus === "All"
                                    ? true
                                    : lead.status === filterStatus
                            )
                            .map((lead) => (
                                <tr
                                    key={lead.id}
                                    className="border-t hover:bg-gray-50"
                                >
                                    <td className="p-4">{lead.id}</td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => setSelectedLead(lead)}
                                            className="text-blue-600 hover:underline cursor-pointer"
                                        >
                                            {lead.name}
                                        </button>
                                    </td>
                                    <td className="p-4">{lead.email}</td>
                                    <td className="p-4">{lead.phone}</td>
                                    <td className="p-4">
                                        {new Date(
                                            lead.created_at
                                        ).toLocaleDateString()}
                                    </td>
                                    <td>
                                        <select
                                            value={lead.status}
                                            className={
                                                lead.status === "New"
                                                    ? "bg-yellow-100 rounded px-2 py-1"
                                                    : lead.status === "Contacted"
                                                        ? "bg-blue-100 rounded px-2 py-1"
                                                        : lead.status === "Qualified"
                                                            ? "bg-green-100 rounded px-2 py-1"
                                                            : "bg-red-100 rounded px-2 py-1"
                                            }
                                            onChange={async (e) => {
                                                await fetch(
                                                    `"https://crm-backend-ta5h.onrender.com/"${lead.id}`,
                                                    {
                                                        method: "PUT",
                                                        headers: {
                                                            "Content-Type": "application/json"
                                                        },
                                                        body: JSON.stringify({
                                                            name: lead.name,
                                                            email: lead.email,
                                                            phone: lead.phone,
                                                            status: e.target.value
                                                        })
                                                    }
                                                );

                                                window.location.reload();
                                            }}
                                        >
                                            <option value="New">New</option>
                                            <option value="Contacted">Contacted</option>
                                            <option value="Qualified">Qualified</option>
                                            <option value="Closed">Closed</option>
                                        </select>
                                    </td>

                                    <td>
                                        <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2
                                hover:bg-yellow-400
                                active:bg-yellow-600
                                cursor-pointer
                                transition"
                                            onClick={async () => {
                                                const newName = prompt(
                                                    "Enter new name",
                                                    lead.name
                                                );

                                                if (!newName) return;

                                                await fetch(
                                                    `"https://crm-backend-ta5h.onrender.com/"/${lead.id}`,
                                                    {
                                                        method: "PUT",
                                                        headers: {
                                                            "Content-Type": "application/json"
                                                        },
                                                        body: JSON.stringify({
                                                            name: newName,
                                                            email: lead.email,
                                                            phone: lead.phone,
                                                            status: lead.status
                                                        })
                                                    }
                                                );

                                                window.location.reload();
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button className="bg-red-500 text-white px-3 py-1 rounded
                                hover:bg-red-400
                                active:bg-red-600
                                cursor-pointer
                                transition"
                                            onClick={async () => {
                                                const confirmDelete = window.confirm(
                                                    "Delete this lead?"
                                                );

                                                if (!confirmDelete) return;

                                                await fetch(
                                                    `"https://crm-backend-ta5h.onrender.com/"${lead.id}`,
                                                    {
                                                        method: "DELETE"
                                                    }
                                                );

                                                window.location.reload();
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            {selectedLead && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-96">
                        <h2 className="text-2xl font-bold mb-4">
                            Lead Details
                        </h2>

                        <p>
                            <strong>Name:</strong> {selectedLead.name}
                        </p>

                        <p>
                            <strong>Email:</strong> {selectedLead.email}
                        </p>

                        <p>
                            <strong>Phone:</strong> {selectedLead.phone}
                        </p>

                        <p>
                            <strong>Status:</strong> {selectedLead.status}
                        </p>
                        <p className="mt-2">
                            <strong>Notes:</strong>
                        </p>

                        <div className="bg-gray-100 p-3 rounded mt-1">
                            {selectedLead.notes || "No notes available"}
                        </div>

                        <button
                            onClick={() => setSelectedLead(null)}
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LeadList;