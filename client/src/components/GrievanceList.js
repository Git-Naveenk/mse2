import React from 'react';
import './GrievanceList.css';

export default function GrievanceList({ grievances, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      Academic: '#3498db',
      Hostel: '#e74c3c',
      Transport: '#f39c12',
      Other: '#95a5a6'
    };
    return colors[category] || '#3498db';
  };

  const getStatusColor = (status) => {
    return status === 'Resolved' ? '#27ae60' : '#e74c3c';
  };

  return (
    <div className="grievance-list">
      {grievances.map(grievance => (
        <div key={grievance._id} className="grievance-card">
          <div className="grievance-header">
            <h4>{grievance.title}</h4>
            <div className="badges">
              <span 
                className="badge category"
                style={{ backgroundColor: getCategoryColor(grievance.category) }}
              >
                {grievance.category}
              </span>
              <span 
                className="badge status"
                style={{ backgroundColor: getStatusColor(grievance.status) }}
              >
                {grievance.status}
              </span>
            </div>
          </div>

          <p className="grievance-description">{grievance.description}</p>

          <div className="grievance-footer">
            <span className="date">
              {formatDate(grievance.createdAt)}
            </span>
            <div className="actions">
              <button 
                onClick={() => onEdit(grievance)}
                className="btn-edit"
              >
                Edit
              </button>
              <button 
                onClick={() => onDelete(grievance._id)}
                className="btn-delete"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
