import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './App';

const MaintenanceRecordManagement = () => {
    const { user } = useContext(UserContext);
    const [records, setRecords] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [recordDetails, setRecordDetails] = useState({ maintenanceDate: '', description: '', status: '', vehicleId: '' });

    useEffect(() => {
        fetchRecords();
        fetchVehicles();
    }, []);

    const fetchRecords = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/maintenance-records', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            setRecords(response.data);
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };

    const fetchVehicles = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/vehicles', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            setVehicles(response.data);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }
    };

    const handleCreateOrUpdateRecord = async () => {
        try {
            const requestPayload = {
                ...recordDetails,
                vehicle: { id: recordDetails.vehicleId }  // 传递 vehicleId
            };

            if (recordDetails.id) {
                await axios.put(`http://localhost:8080/api/maintenance-records/${recordDetails.id}`, requestPayload, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });
            } else {
                await axios.post('http://localhost:8080/api/maintenance-records', requestPayload, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });
            }
            fetchRecords();
            setRecordDetails({ maintenanceDate: '', description: '', status: '', vehicleId: '' });
        } catch (error) {
            console.error('Error creating or updating record:', error);
        }
    };

    return (
        <div>
            <h2>Maintenance Record Management</h2>
            <input
                type="date"
                value={recordDetails.maintenanceDate}
                onChange={(e) => setRecordDetails({ ...recordDetails, maintenanceDate: e.target.value })}
                placeholder="Maintenance Date"
            />
            <input
                type="text"
                value={recordDetails.description}
                onChange={(e) => setRecordDetails({ ...recordDetails, description: e.target.value })}
                placeholder="Description"
            />
            <input
                type="text"
                value={recordDetails.status}
                onChange={(e) => setRecordDetails({ ...recordDetails, status: e.target.value })}
                placeholder="Status"
            />
            <select
                value={recordDetails.vehicleId}
                onChange={(e) => setRecordDetails({ ...recordDetails, vehicleId: e.target.value })}
            >
                <option value="">Select Vehicle</option>
                {vehicles.map(vehicle => (
                    <option key={vehicle.id} value={vehicle.id}>{vehicle.model}</option>
                ))}
            </select>
            <button onClick={handleCreateOrUpdateRecord}>{recordDetails.id ? 'Update' : 'Create'} Record</button>
            <h3>Records</h3>
            <ul>
                {records.map(record => (
                    <li key={record.id}>{record.maintenanceDate} - {record.description} - {record.status} - {record.vehicle.model}</li>
                ))}
            </ul>
        </div>
    );
};

export default MaintenanceRecordManagement;
