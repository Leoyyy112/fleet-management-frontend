// src/App.js
import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import VehicleManagement from './VehicleManagement';
import DispatchTaskManagement from './DispatchTaskManagement';
import MaintenanceRecordManagement from './MaintenanceRecordManagement';
import RealTimeMonitoring from './RealTimeMonitoring';
import Register from './Register';
import Login from './Login';
import ReportManagement from './ReportManagement';
import PrivateRoute from './PrivateRoute';

// 创建用户上下文
export const UserContext = createContext(null);

const App = () => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Router>
                <div>
                    <Navbar bg="dark" variant="dark" expand="lg">
                        <Container>
                            <Navbar.Brand href="/">Fleet Management System</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    {!user && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
                                    {!user && <Nav.Link as={Link} to="/register">Register</Nav.Link>}
                                    {user && <Nav.Link as={Link} to="/vehicles">Vehicle Management</Nav.Link>}
                                    {user && <Nav.Link as={Link} to="/dispatch-tasks">Dispatch Task Management</Nav.Link>}
                                    {user && <Nav.Link as={Link} to="/maintenance-records">Maintenance Record Management</Nav.Link>}
                                    {user && <Nav.Link as={Link} to="/real-time-monitoring">Real-Time Monitoring</Nav.Link>}
                                    {user && <Nav.Link as={Link} to="/reports">Report Management</Nav.Link>}
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <Container className="mt-4">
                        <Routes>
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/" element={user ? <Navigate to="/vehicles" /> : <Navigate to="/login" />} />
                            <Route path="/vehicles" element={<PrivateRoute><VehicleManagement /></PrivateRoute>} />
                            <Route path="/dispatch-tasks" element={<PrivateRoute><DispatchTaskManagement /></PrivateRoute>} />
                            <Route path="/maintenance-records" element={<PrivateRoute><MaintenanceRecordManagement /></PrivateRoute>} />
                            <Route path="/real-time-monitoring" element={<PrivateRoute><RealTimeMonitoring /></PrivateRoute>} />
                            <Route path="/reports" element={<PrivateRoute><ReportManagement /></PrivateRoute>} />
                        </Routes>
                    </Container>
                </div>
            </Router>
        </UserContext.Provider>
    );
};

export default App;
