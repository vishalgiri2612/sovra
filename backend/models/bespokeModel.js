const mongoose = require('mongoose');

const bespokeSchema = mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  clientName: { type: String, required: true },
  concept: { type: String, required: true },
  budget: { type: String, required: true },
  deadline: { type: String, required: true },
  status: { type: String, required: true, default: 'Consultation' }, // 'Consultation', 'Design Phase', 'Production', 'Final Approval', 'Completed'
}, {
  timestamps: true,
});

const Bespoke = mongoose.model('Bespoke', bespokeSchema);

module.exports = Bespoke;
