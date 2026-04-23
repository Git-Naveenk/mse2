import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { grievanceService } from '../services/api';
import GrievanceForm from '../components/GrievanceForm';
import GrievanceList from '../components/GrievanceList';
import './Dashboard.css';

export default function Dashboard() {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  const student = JSON.parse(localStorage.getItem('student') || '{}');

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }
    fetchGrievances();
  }, [navigate]);

  const fetchGrievances = async () => {
    try {
      setLoading(true);
      const response = await grievanceService.getAllGrievances();
      setGrievances(response.data.grievances);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch grievances');
    } finally {
      setLoading(false);
    }
  };

  const handleGrievanceSubmit = async (formData) => {
    try {
      if (editingId) {
        await grievanceService.updateGrievance(editingId, formData);
        setGrievances(grievances.map(g => 
          g._id === editingId ? { ...g, ...formData } : g
        ));
        setEditingId(null);
      } else {
        const response = await grievanceService.createGrievance(
          formData.title,
          formData.description,
          formData.category
        );
        setGrievances([response.data.grievance, ...grievances]);
      }
      setShowForm(false);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save grievance');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this grievance?')) {
      try {
        await grievanceService.deleteGrievance(id);
        setGrievances(grievances.filter(g => g._id !== id));
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete grievance');
      }
    }
  };

  const handleEdit = (grievance) => {
    setEditingId(grievance._id);
    setShowForm(true);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults(null);
      return;
    }

    try {
      const response = await grievanceService.searchGrievances(searchQuery);
      setSearchResults(response.data.grievances);
    } catch (err) {
      setError('Search failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('student');
    navigate('/login');
  };

  const displayGrievances = searchResults !== null ? searchResults : grievances;
  const editingGrievance = editingId ? grievances.find(g => g._id === editingId) : null;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Student Grievance Management System</h1>
          <div className="user-info">
            <span>Welcome, {student.name}</span>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-container">
          {error && <div className="error-message">{error}</div>}

          <div className="search-section">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search grievances by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={handleSearch} className="btn-search">
                Search
              </button>
              {searchResults !== null && (
                <button 
                  onClick={() => {
                    setSearchResults(null);
                    setSearchQuery('');
                  }} 
                  className="btn-clear"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="actions-section">
            <button 
              onClick={() => {
                setShowForm(!showForm);
                setEditingId(null);
              }}
              className="btn-primary"
            >
              {showForm && !editingId ? 'Cancel' : '+ Submit New Grievance'}
            </button>
          </div>

          {showForm && (
            <GrievanceForm 
              onSubmit={handleGrievanceSubmit}
              initialData={editingGrievance}
              onCancel={() => {
                setShowForm(false);
                setEditingId(null);
              }}
            />
          )}

          <div className="grievances-section">
            <h2>
              {searchResults !== null 
                ? `Search Results (${displayGrievances.length})`
                : `All Grievances (${displayGrievances.length})`}
            </h2>
            
            {loading ? (
              <p className="loading">Loading grievances...</p>
            ) : displayGrievances.length === 0 ? (
              <p className="no-data">
                {searchResults !== null 
                  ? 'No grievances found matching your search.'
                  : 'No grievances submitted yet. Submit one to get started!'}
              </p>
            ) : (
              <GrievanceList 
                grievances={displayGrievances}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
