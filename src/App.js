import './App.css';
import React, { useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [error, setError] = useState(null);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'projects', label: 'Projects', icon: '🏗️' },
    { id: 'clients', label: 'Clients', icon: '👥' },
    { id: 'estimates', label: 'Estimates', icon: '📝' },
    { id: 'materials', label: 'Materials', icon: '🏭' },
    { id: 'workers', label: 'Workers', icon: '👷' },
    { id: 'reports', label: 'Reports', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const renderContent = () => {
    switch(currentPage) {
      case 'dashboard':
        return <DashboardContent />;
      case 'clients':
        return <ClientsContent />;
      default:
        return <p>Content for {currentPage} coming soon...</p>;
    }
  };

  if (error) {
    return (
      <div className="error-container">
        <h1>Something went wrong</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
        <button onClick={() => setError(null)}>Try again</button>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <div className="logo">
          <span className="logo-icon">🌈</span>
          RAINBOW CONSTRUCTION
        </div>
        <nav>
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => setCurrentPage(item.id)}
            >
              <span className="icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
      <main className="main-content">
        <header className="top-bar">
          <h1>{menuItems.find(item => item.id === currentPage)?.label}</h1>
          <div className="user-menu">
            <span>Welcome, Admin</span>
            <button className="logout-btn">Logout</button>
          </div>
        </header>
        <div className="content">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

function DashboardContent() {
  return (
    <div className="dashboard-grid">
      <div className="dashboard-card">
        <h3>Active Projects</h3>
        <div className="stat">12</div>
        <div className="stat-footer">3 due this month</div>
      </div>
      <div className="dashboard-card">
        <h3>Total Clients</h3>
        <div className="stat">45</div>
        <div className="stat-footer">5 new this month</div>
      </div>
      <div className="dashboard-card">
        <h3>Pending Estimates</h3>
        <div className="stat">8</div>
        <div className="stat-footer">$2.5M total value</div>
      </div>
      <div className="dashboard-card">
        <h3>Active Workers</h3>
        <div className="stat">78</div>
        <div className="stat-footer">12 teams</div>
      </div>
      <div className="dashboard-card wide">
        <h3>Recent Projects</h3>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Client</th>
              <th>Status</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Luxury Villa Construction</td>
              <td>John Smith</td>
              <td><span className="status in-progress">In Progress</span></td>
              <td>Dec 15, 2024</td>
            </tr>
            <tr>
              <td>Office Complex Renovation</td>
              <td>Tech Corp</td>
              <td><span className="status pending">Pending</span></td>
              <td>Jan 30, 2025</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ClientsContent() {
  const [clients] = useState([
    { id: 1, name: 'John Smith', email: 'john@example.com', phone: '123-456-7890', projects: 2 },
    { id: 2, name: 'Tech Corp', email: 'contact@techcorp.com', phone: '098-765-4321', projects: 1 },
  ]);

  return (
    <div className="clients-section">
      <div className="section-header">
        <button className="add-btn">+ Add New Client</button>
      </div>
      <div className="client-grid">
        {clients.map(client => (
          <div key={client.id} className="client-card">
            <div className="client-header">
              <h3>{client.name}</h3>
              <button className="edit-btn">✏️</button>
            </div>
            <div className="client-details">
              <p><strong>Email:</strong> {client.email}</p>
              <p><strong>Phone:</strong> {client.phone}</p>
              <p><strong>Active Projects:</strong> {client.projects}</p>
            </div>
            <div className="client-actions">
              <button className="action-btn">View Projects</button>
              <button className="action-btn">Create Estimate</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
