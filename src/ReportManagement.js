import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';

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
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md="8">
                    <h2 className="text-center mb-4">Report Management</h2>
                    <Form>
                        <Form.Group as={Row} controlId="formReportName" className="mb-3">
                            <Form.Label column sm="2">Report Name</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    value={reportName}
                                    onChange={(e) => setReportName(e.target.value)}
                                    placeholder="Enter report name"
                                />
                            </Col>
                        </Form.Group>
                        <Button variant="primary" onClick={generateReport}>Generate Report</Button>
                    </Form>
                    <h3 className="mt-4">Reports:</h3>
                    <ListGroup>
                        {reports.map((report) => (
                            <ListGroup.Item key={report.id}>
                                <strong>{report.name}:</strong> {report.data}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default ReportManagement;
