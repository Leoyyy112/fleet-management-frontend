import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

const VehicleManagement = () => {
    const [vehicles, setVehicles] = useState([]);
    const [form, setForm] = useState({
        model: '',
        type: 'LONG_DISTANCE',
        status: 'ACTIVE',
        purchaseDate: '',
        lastServiceDate: '',
        mileage: '',
        sensorData: ''
    });

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/vehicles');
            console.log("Vehicles fetched: ", response.data);
            setVehicles(response.data);
        } catch (error) {
            console.error('Error fetching vehicles', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/vehicles', form);
            console.log("Vehicle created: ", response.data);
            fetchVehicles();
            setForm({
                model: '',
                type: 'LONG_DISTANCE',
                status: 'ACTIVE',
                purchaseDate: '',
                lastServiceDate: '',
                mileage: '',
                sensorData: ''
            });
        } catch (error) {
            console.error('Error creating vehicle', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/vehicles/${id}`);
            fetchVehicles();
        } catch (error) {
            console.error('Error deleting vehicle', error);
        }
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <h1>Vehicle Management</h1>
                    <Form onSubmit={handleSubmit} className="mb-4">
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formModel">
                                <Form.Label>Model</Form.Label>
                                <Form.Control type="text" name="model" value={form.model} onChange={handleChange} placeholder="Model" required />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formType">
                                <Form.Label>Type</Form.Label>
                                <Form.Control as="select" name="type" value={form.type} onChange={handleChange}>
                                    <option value="LONG_DISTANCE">Long Distance</option>
                                    <option value="CITY_DELIVERY">City Delivery</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formStatus">
                                <Form.Label>Status</Form.Label>
                                <Form.Control as="select" name="status" value={form.status} onChange={handleChange}>
                                    <option value="ACTIVE">Active</option>
                                    <option value="INACTIVE">Inactive</option>
                                    <option value="MAINTENANCE">Maintenance</option>
                                </Form.Control>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formPurchaseDate">
                                <Form.Label>Purchase Date</Form.Label>
                                <Form.Control type="date" name="purchaseDate" value={form.purchaseDate} onChange={handleChange} required />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formLastServiceDate">
                                <Form.Label>Last Service Date</Form.Label>
                                <Form.Control type="date" name="lastServiceDate" value={form.lastServiceDate} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formMileage">
                                <Form.Label>Mileage</Form.Label>
                                <Form.Control type="number" name="mileage" value={form.mileage} onChange={handleChange} placeholder="Mileage" />
                            </Form.Group>
                        </Row>

                        <Form.Group controlId="formSensorData">
                            <Form.Label>Sensor Data</Form.Label>
                            <Form.Control as="textarea" name="sensorData" value={form.sensorData} onChange={handleChange} placeholder="Sensor Data" />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3">
                            Add Vehicle
                        </Button>
                    </Form>

                    <h2>Vehicles</h2>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Model</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Purchase Date</th>
                            <th>Last Service Date</th>
                            <th>Mileage</th>
                            <th>Sensor Data</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {vehicles.map(vehicle => (
                            <tr key={vehicle.id}>
                                <td>{vehicle.model}</td>
                                <td>{vehicle.type}</td>
                                <td>{vehicle.status}</td>
                                <td>{vehicle.purchaseDate}</td>
                                <td>{vehicle.lastServiceDate}</td>
                                <td>{vehicle.mileage}</td>
                                <td>{vehicle.sensorData}</td>
                                <td>
                                    <Button variant="danger" onClick={() => handleDelete(vehicle.id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default VehicleManagement;
