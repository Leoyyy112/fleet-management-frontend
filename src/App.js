// src/App.js
import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
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
                    <h1>Fleet Management System</h1>
                    <nav>
                        <ul>
                            {!user && <li><Link to="/login">Login</Link></li>}
                            {!user && <li><Link to="/register">Register</Link></li>}
                            {user && <li><Link to="/vehicles">Vehicle Management</Link></li>}
                            {user && <li><Link to="/dispatch-tasks">Dispatch Task Management</Link></li>}
                            {user && <li><Link to="/maintenance-records">Maintenance Record Management</Link></li>}
                            {user && <li><Link to="/real-time-monitoring">Real-Time Monitoring</Link></li>}
                            {user && <li><Link to="/reports">Report Management</Link></li>}
                        </ul>
                    </nav>
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
                </div>
            </Router>
        </UserContext.Provider>
    );
};

export default App;
