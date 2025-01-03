import React, { useState } from "react";
import "./Report.css";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PieController, LineElement } from "chart.js";
import jsPDF from "jspdf";

ChartJS.register(CategoryScale, LinearScale, BarElement, PieController, LineElement);

function Report() {
  const [filter, setFilter] = useState({ company: "", method: "", dateRange: { start: "", end: "" } });
  const [activityLog, setActivityLog] = useState([
    { user: "John Doe", company: "Company A", type: "Email", date: "2025-01-02" },
    { user: "Jane Smith", company: "Company B", type: "Call", date: "2025-01-01" },
    { user: "Alice Brown", company: "Company C", type: "LinkedIn Post", date: "2025-01-03" },
  ]);

  const communicationFrequencyData = {
    labels: ["Email", "Call", "LinkedIn Post"],
    datasets: [
      {
        label: "Frequency",
        data: [50, 30, 20],
        backgroundColor: ["#007bff", "#28a745", "#ffc107"],
      },
    ],
  };

  const engagementEffectivenessData = {
    labels: ["Email", "Call", "LinkedIn Post"],
    datasets: [
      {
        label: "Success Rate (%)",
        data: [60, 40, 70],
        backgroundColor: ["#17a2b8", "#dc3545", "#fd7e14"],
      },
    ],
  };

  const overdueTrendData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Overdue Communications",
        data: [10, 15, 12, 20, 18],
        fill: false,
        backgroundColor: "#6f42c1",
        borderColor: "#6f42c1",
      },
    ],
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const exportReport = (type) => {
    if (type === "PDF") {
      const doc = new jsPDF();
      doc.text("Report", 10, 10);
      doc.save("report.pdf");
    } else if (type === "CSV") {
      const csvContent = "data:text/csv;charset=utf-8," + activityLog.map((log) => Object.values(log).join(",")).join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "report.csv");
      document.body.appendChild(link);
      link.click();
    }
  };

  return (
    <div className="report-container">
      <h1>Reports</h1>
      <div className="filter-section">
        <input type="text" name="company" placeholder="Company" onChange={handleFilterChange} />
        <input type="text" name="method" placeholder="Method" onChange={handleFilterChange} />
        <input type="date" name="start" onChange={handleFilterChange} />
        <input type="date" name="end" onChange={handleFilterChange} />
      </div>

      <div className="chart-section">
        <div className="chart">
          <h2>Communication Frequency</h2>
          <Bar data={communicationFrequencyData} />
        </div>
        <div className="chart">
          <h2>Engagement Effectiveness</h2>
          <Pie data={engagementEffectivenessData} />
        </div>
        <div className="chart">
          <h2>Overdue Communication Trends</h2>
          <Line data={overdueTrendData} />
        </div>
      </div>

      <div className="activity-log">
        <h2>Real-Time Activity Log</h2>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Company</th>
              <th>Type</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activityLog.map((log, index) => (
              <tr key={index}>
                <td>{log.user}</td>
                <td>{log.company}</td>
                <td>{log.type}</td>
                <td>{log.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="export-buttons">
        <button onClick={() => exportReport("PDF")}>Export as PDF</button>
        <button onClick={() => exportReport("CSV")}>Export as CSV</button>
      </div>
    </div>
  );
}

export default Report;
