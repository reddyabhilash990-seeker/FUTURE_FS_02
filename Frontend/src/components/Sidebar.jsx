function Sidebar({ onLogout, setActivePage }){
    return (
        <div className="w-64 min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900text-white p-5">
            <h2 className="text-2xl font-bold mb-8 text-center" >
                CRM Menu
            </h2>

            <ul className="space-y-4">
                <li
                    onClick={() => setActivePage("dashboard")}
                    className="hover:bg-gray-700 p-3 rounded cursor-pointer"
                >
                    📊 Dashboard
                </li>

                <li className="hover:bg-gray-700 p-3 rounded cursor-pointer">
                    👥 Leads
                </li>

                <li
                    onClick={() => setActivePage("analytics")}
                    className="hover:bg-gray-700 p-3 rounded cursor-pointer"
                >
                    📈 Analytics
                </li>

                <li className="hover:bg-gray-700 p-3 rounded cursor-pointer">
                    ⚙️ Settings
                </li>

                <li
                    onClick={onLogout}
                    className="hover:bg-red-700 p-3 rounded cursor-pointer"
                >
                    🚪 Logout
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;