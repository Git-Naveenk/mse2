const express = require('express');
const router = express.Router();
const Grievance = require('../models/Grievance');
const { protect } = require('../middleware/auth');

// @route   POST /api/grievances
// @desc    Submit a new grievance
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ success: false, message: 'Please provide all fields' });
    }

    const grievance = new Grievance({
      title,
      description,
      category,
      studentId: req.studentId
    });

    await grievance.save();

    res.status(201).json({
      success: true,
      message: 'Grievance submitted successfully',
      grievance
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/grievances
// @desc    Get all grievances of logged-in student
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const grievances = await Grievance.find({ studentId: req.studentId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: grievances.length,
      grievances
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/grievances/:id
// @desc    Get grievance by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const grievance = await Grievance.findById(req.params.id);

    if (!grievance) {
      return res.status(404).json({ success: false, message: 'Grievance not found' });
    }

    // Check if grievance belongs to logged-in student
    if (grievance.studentId.toString() !== req.studentId) {
      return res.status(403).json({ success: false, message: 'Not authorized to access this grievance' });
    }

    res.status(200).json({
      success: true,
      grievance
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/grievances/:id
// @desc    Update a grievance
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    let grievance = await Grievance.findById(req.params.id);

    if (!grievance) {
      return res.status(404).json({ success: false, message: 'Grievance not found' });
    }

    // Check if grievance belongs to logged-in student
    if (grievance.studentId.toString() !== req.studentId) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this grievance' });
    }

    const { title, description, category, status } = req.body;

    if (title) grievance.title = title;
    if (description) grievance.description = description;
    if (category) grievance.category = category;
    if (status) grievance.status = status;
    grievance.updatedAt = Date.now();

    await grievance.save();

    res.status(200).json({
      success: true,
      message: 'Grievance updated successfully',
      grievance
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/grievances/:id
// @desc    Delete a grievance
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const grievance = await Grievance.findById(req.params.id);

    if (!grievance) {
      return res.status(404).json({ success: false, message: 'Grievance not found' });
    }

    // Check if grievance belongs to logged-in student
    if (grievance.studentId.toString() !== req.studentId) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this grievance' });
    }

    await Grievance.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Grievance deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/grievances/search?title=xyz
// @desc    Search grievances by title
// @access  Private
router.get('/search/query', protect, async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Please provide a search query' });
    }

    const grievances = await Grievance.find({
      studentId: req.studentId,
      title: { $regex: title, $options: 'i' }
    });

    res.status(200).json({
      success: true,
      count: grievances.length,
      grievances
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
