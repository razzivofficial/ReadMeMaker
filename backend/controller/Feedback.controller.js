const Feedback = require('../models/Feedback.model')

const addFeedback = async (req, res) => {
    try {
      const { email, name, description } = req.body;
  
      // Create a new feedback instance
      const newFeedback = new Feedback({
        email,
        name,
        description
      });
  
      // Save to the database
      const savedFeedback = await newFeedback.save();
  
      // Return the saved feedback
      res.status(201).json(savedFeedback);
    } catch (error) {
      res.status(500).json({ message: 'Error adding feedback', error });
    }
  };

  const fetchAllFeedback = async (req, res) => {
    try {
      const feedbacks = await Feedback.find(); // Fetch all feedbacks from the database
      res.status(200).json(feedbacks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching feedbacks', error });
    }
  };

  const deleteFeedbackById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find feedback by ID and delete it
      const deletedFeedback = await Feedback.findByIdAndDelete(id);
  
      if (!deletedFeedback) {
        return res.status(404).json({ message: 'Feedback not found' });
      }
  
      res.status(200).json({ message: 'Feedback deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting feedback', error });
    }
  };

  module.exports = {
    addFeedback,
    fetchAllFeedback,
    deleteFeedbackById
  };
  