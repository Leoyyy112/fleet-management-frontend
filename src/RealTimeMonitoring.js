import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';

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
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md="10">
                    <h2 className="text-center mb-4">Real-Time Vehicle Monitoring</h2>
                    <Table striped bordered hover>
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
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default RealTimeMonitoring;
