const mongoose = require('mongoose');

const grievanceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  category: {
    type: String,
    enum: ['Academic', 'Hostel', 'Transport', 'Other'],
    required: [true, 'Please select a category']
  },
  status: {
    type: String,
    enum: ['Pending', 'Resolved'],
    default: 'Pending'
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Grievance', grievanceSchema);
