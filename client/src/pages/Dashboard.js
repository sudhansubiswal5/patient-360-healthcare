import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    api.get('/patients')
      .then((res) => setPatients(res.data))
      .catch((err) => {
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setError(err.response?.data?.message || 'Failed to load patients');
        }
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Dashboard</h2>
        <button onClick={handleLogout} style={{ padding: '6px 16px' }}>
          Logout
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h3>Patients</h3>
      {patients.length === 0 ? (
        <p>No patients found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: 8 }}>Name</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: 8 }}>DOB</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: 8 }}>Insurance ID</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id}>
                <td style={{ padding: 8 }}>{p.name}</td>
                <td style={{ padding: 8 }}>{p.dob}</td>
                <td style={{ padding: 8 }}>{p.insurance_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;
