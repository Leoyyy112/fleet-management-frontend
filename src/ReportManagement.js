// src/ReportManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReportManagement = () => {
    const [reports, setReports] = useState([]);
    const [reportName, setReportName] = useState('');

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/reports');
            setReports(response.data);
        } catch (error) {
            console.error('Error fetching reports:', error);
        }
    };

    const generateReport = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/reports/generate', { name: reportName });
            setReports([...reports, response.data]);
            setReportName('');
        } catch (error) {
            console.error('Error generating report:', error);
        }
    };

    return (
        <div>
            <h2>Report Management</h2>
            <input
                type="text"
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
                placeholder="Report Name"
            />
            <button onClick={generateReport}>Generate Report</button>
            <h3>Reports:</h3>
            <ul>
                {reports.map((report) => (
                    <li key={report.id}>
                        {report.name}: {report.data}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReportManagement;
