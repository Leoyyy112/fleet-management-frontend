// src/RealTimeMonitoring.js

import React, { useEffect, useState } from 'react';

const RealTimeMonitoring = () => {
    const [vehicleStatus, setVehicleStatus] = useState([]);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080/vehicle-status');

        socket.onopen = () => {
            console.log("Connected to WebSocket");
        };

        socket.onmessage = (event) => {
            const statusUpdate = JSON.parse(event.data);
            setVehicleStatus((prevStatus) => [...prevStatus, statusUpdate]);
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socket.onclose = () => {
            console.log("WebSocket connection closed");
        };

        return () => {
            socket.close();
        };
    }, []);

    return (
        <div>
            <h2>Real-Time Vehicle Monitoring</h2>
            <table>
                <thead>
                <tr>
                    <th>Vehicle ID</th>
                    <th>Status</th>
                    <th>Timestamp</th>
                </tr>
                </thead>
                <tbody>
                {vehicleStatus.map((status, index) => (
                    <tr key={index}>
                        <td>{status.vehicleId}</td>
                        <td>{status.status}</td>
                        <td>{new Date(status.timestamp).toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default RealTimeMonitoring;
