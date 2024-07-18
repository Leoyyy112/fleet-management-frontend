import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './App';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

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
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md="8">
                    <h2>Maintenance Record Management</h2>
                    <Form>
                        <Form.Group controlId="formMaintenanceDate" className="mb-3">
                            <Form.Label>Maintenance Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={recordDetails.maintenanceDate}
                                onChange={(e) => setRecordDetails({ ...recordDetails, maintenanceDate: e.target.value })}
                                placeholder="Maintenance Date"
                            />
                        </Form.Group>

                        <Form.Group controlId="formDescription" className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                value={recordDetails.description}
                                onChange={(e) => setRecordDetails({ ...recordDetails, description: e.target.value })}
                                placeholder="Description"
                            />
                        </Form.Group>

                        <Form.Group controlId="formStatus" className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                type="text"
                                value={recordDetails.status}
                                onChange={(e) => setRecordDetails({ ...recordDetails, status: e.target.value })}
                                placeholder="Status"
                            />
                        </Form.Group>

                        <Form.Group controlId="formVehicleId" className="mb-3">
                            <Form.Label>Vehicle</Form.Label>
                            <Form.Control
                                as="select"
                                value={recordDetails.vehicleId}
                                onChange={(e) => setRecordDetails({ ...recordDetails, vehicleId: e.target.value })}
                            >
                                <option value="">Select Vehicle</option>
                                {vehicles.map(vehicle => (
                                    <option key={vehicle.id} value={vehicle.id}>{vehicle.model}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" onClick={handleCreateOrUpdateRecord}>
                            {recordDetails.id ? 'Update' : 'Create'} Record
                        </Button>
                    </Form>

                    <h3 className="mt-4">Records</h3>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Maintenance Date</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Vehicle</th>
                        </tr>
                        </thead>
                        <tbody>
                        {records.map(record => (
                            <tr key={record.id}>
                                <td>{record.maintenanceDate}</td>
                                <td>{record.description}</td>
                                <td>{record.status}</td>
                                <td>{record.vehicle.model}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default MaintenanceRecordManagement;
