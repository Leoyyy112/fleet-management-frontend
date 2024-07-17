import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

const DispatchTaskManagement = () => {
    const [tasks, setTasks] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [form, setForm] = useState({
        taskDescription: '',
        status: 'PENDING',
        startTime: '',
        endTime: '',
        vehicle: { id: '' }
    });

    useEffect(() => {
        fetchTasks();
        fetchVehicles();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/dispatch-tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks', error);
        }
    };

    const fetchVehicles = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/vehicles');
            setVehicles(response.data);
        } catch (error) {
            console.error('Error fetching vehicles', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'vehicle') {
            setForm({
                ...form,
                vehicle: { id: value }
            });
        } else {
            setForm({
                ...form,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/dispatch-tasks', form);
            fetchTasks();
            setForm({
                taskDescription: '',
                status: 'PENDING',
                startTime: '',
                endTime: '',
                vehicle: { id: '' }
            });
        } catch (error) {
            console.error('Error creating task', error);
        }
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <h1>Dispatch Task Management</h1>
                    <Form onSubmit={handleSubmit} className="mb-4">
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formTaskDescription">
                                <Form.Label>Task Description</Form.Label>
                                <Form.Control type="text" name="taskDescription" value={form.taskDescription} onChange={handleChange} placeholder="Task Description" required />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formStatus">
                                <Form.Label>Status</Form.Label>
                                <Form.Control as="select" name="status" value={form.status} onChange={handleChange}>
                                    <option value="PENDING">Pending</option>
                                    <option value="IN_PROGRESS">In Progress</option>
                                    <option value="COMPLETED">Completed</option>
                                </Form.Control>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formStartTime">
                                <Form.Label>Start Time</Form.Label>
                                <Form.Control type="datetime-local" name="startTime" value={form.startTime} onChange={handleChange} required />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formEndTime">
                                <Form.Label>End Time</Form.Label>
                                <Form.Control type="datetime-local" name="endTime" value={form.endTime} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formVehicle">
                                <Form.Label>Vehicle</Form.Label>
                                <Form.Control as="select" name="vehicle" value={form.vehicle.id} onChange={handleChange} required>
                                    <option value="">Select Vehicle</option>
                                    {vehicles.map(vehicle => (
                                        <option key={vehicle.id} value={vehicle.id}>{vehicle.model}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Row>

                        <Button variant="primary" type="submit" className="mt-3">
                            Add Task
                        </Button>
                    </Form>

                    <h2>Tasks</h2>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Task Description</th>
                            <th>Status</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Vehicle</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tasks.map(task => (
                            <tr key={task.id}>
                                <td>{task.taskDescription}</td>
                                <td>{task.status}</td>
                                <td>{task.startTime}</td>
                                <td>{task.endTime}</td>
                                <td>{task.vehicle.model}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default DispatchTaskManagement;
