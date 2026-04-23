import React, { useState } from 'react';
import './GrievanceForm.css';

export default function GrievanceForm({ onSubmit, initialData, onCancel }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || 'Academic',
    status: initialData?.status || 'Pending'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) {
      setFormData({
        title: '',
        description: '',
        category: 'Academic',
        status: 'Pending'
      });
    }
  };

  return (
    <form className="grievance-form" onSubmit={handleSubmit}>
      <h3>{initialData ? 'Update Grievance' : 'Submit New Grievance'}</h3>
      
      <div className="form-group">
        <label>Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Enter grievance title"
        />
      </div>

      <div className="form-group">
        <label>Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Describe your grievance in detail"
          rows="5"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="Academic">Academic</option>
            <option value="Hostel">Hostel</option>
            <option value="Transport">Transport</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {initialData && (
          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-submit">
          {initialData ? 'Update' : 'Submit'}
        </button>
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
