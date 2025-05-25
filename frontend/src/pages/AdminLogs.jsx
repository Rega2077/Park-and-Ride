import { useEffect, useState } from "react";
import API from "../services/api";


const AdminLogs = () => {
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await API.get("/logs");
        setLogs(res.data);
      } catch (err) {
        console.error("Failed to load logs", err);
        setLogs(["Error loading logs"]);
      }
    };
    fetchLogs();
  }, []);


  return (
    <div className="min-h-screen bg-green-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold text-green-700 mb-4">System Activity Logs</h2>

        <div className="bg-gray-100 rounded p-4 font-mono text-sm space-y-2 overflow-auto h-[300px]">
          {logs.map((log, index) => (
            <div key={index} className="text-gray-800">{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminLogs;
