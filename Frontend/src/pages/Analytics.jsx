import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Analytics({ leads }) {
  const data = [
    {
      name: "New",
      value: leads.filter(
        (lead) => lead.status === "New"
      ).length,
    },
    {
      name: "Contacted",
      value: leads.filter(
        (lead) => lead.status === "Contacted"
      ).length,
    },
    {
      name: "Closed",
      value: leads.filter(
        (lead) => lead.status === "Closed"
      ).length,
    },
  ];

  const COLORS = [
    "#facc15",
    "#3b82f6",
    "#ef4444",
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">
        Lead Analytics
      </h2>

      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={140}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Analytics;