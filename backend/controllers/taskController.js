import Task from '../models/Task.js';

// @desc    Create a new task
// @route   POST /api/tasks
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validate input
    if (!title || !description) {
      return res.status(400).json({ 
        message: 'Please provide both title and description' 
      });
    }

    // Create task
    const task = await Task.create({
      title,
      description,
      userId: req.user.userId,
    });

    res.status(201).json({
      message: 'Task created successfully',
      task,
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ 
      message: 'Server error while creating task',
      error: error.message 
    });
  }
};

// @desc    Get all tasks for current user
// @route   GET /api/tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId }).sort({ 
      createdAt: -1 
    });

    res.status(200).json({
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ 
      message: 'Server error while fetching tasks',
      error: error.message 
    });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Find task
    const task = await Task.findOne({ _id: id, userId: req.user.userId });

    if (!task) {
      return res.status(404).json({ 
        message: 'Task not found or you do not have permission to update it' 
      });
    }

    // Update task
    task.title = title || task.title;
    task.description = description || task.description;
    await task.save();

    res.status(200).json({
      message: 'Task updated successfully',
      task,
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ 
      message: 'Server error while updating task',
      error: error.message 
    });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete task
    const task = await Task.findOneAndDelete({ 
      _id: id, 
      userId: req.user.userId 
    });

    if (!task) {
      return res.status(404).json({ 
        message: 'Task not found or you do not have permission to delete it' 
      });
    }

    res.status(200).json({
      message: 'Task deleted successfully',
    });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ 
      message: 'Server error while deleting task',
      error: error.message 
    });
  }
};

