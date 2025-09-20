const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String },
  dueDate: { type: Date },
  priority: { type: String, enum: ['Low','Medium','High'], default: 'Medium' },
  status: { type: String, enum: ['Pending','Completed'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', TaskSchema);
