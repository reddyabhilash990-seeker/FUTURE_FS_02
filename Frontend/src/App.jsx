import { useEffect, useState } from "react";
import LeadForm from "./components/LeadForm";
import LeadList from "./components/LeadList";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import Analytics from "./pages/Analytics";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("crmLoggedIn") === "true"
  );
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [leads, setLeads] = useState([]);
  const loadData = async () => {
    const response = await fetch("https://crm-backend-ta5h.onrender.com/");
    const data = await response.json();
    setLeads(data);
  };
  useEffect(() => {
    loadData();
  }, []);


  const totalLeads = leads.length;

  const newLeads = leads.filter(
    (lead) => lead.status === "New"
  ).length;

  const contactedLeads = leads.filter(
    (lead) => lead.status === "Contacted"
  ).length;

  const closedLeads = leads.filter(
    (lead) => lead.status === "Closed"
  ).length;
  if (!isLoggedIn) {
    return (

      <Login
        onLogin={() => {
          localStorage.setItem("crmLoggedIn", "true");
          setIsLoggedIn(true);
        }}
      />
    );
  }

  return (

    <div
      className="flex min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100"
    >
      <>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-3xl absolute top-4 left-4 z-50"
        >
          ☰
        </button>

        {sidebarOpen && (
          <Sidebar
            setActivePage={setActivePage}
            onLogout={() => {
              localStorage.removeItem("crmLoggedIn");
              setIsLoggedIn(false);
            }}
          />
        )}
      </>

      <div className="flex-1 p-10">
        <h1 className="text-2xl md:text-4xl font-bold text-blue-600 mb-6">
          CRM Dashboard
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

          <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow w-full">
            <h3 className="text-sm">Total Leads</h3>
            <p className="text-3xl font-bold">{totalLeads}</p>
          </div>

          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-xl shadow w-full">
            <h3 className="text-sm">New Leads</h3>
            <p className="text-3xl font-bold">{newLeads}</p>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-emerald-700 text-white p-6 rounded-xl shadow w-full">
            <h3 className="text-sm">Contacted</h3>
            <p className="text-3xl font-bold">{contactedLeads}</p>
          </div>

          <div className="bg-gradient-to-r from-red-500 to-pink-700 text-white p-6 rounded-xl shadow w-full">
            <h3 className="text-sm">Closed</h3>
            <p className="text-3xl font-bold">{closedLeads}</p>
          </div>

        </div>

        {activePage === "dashboard" && (
          <>
            <LeadForm />
            <hr className="my-6" />
            <LeadList />
          </>
        )}

        {activePage === "analytics" && (
          <Analytics leads={leads} />
        )}
      </div>
    </div>
  );
}

export default App;