const mongoose = require('mongoose');
const DistributedItemSchema = new mongoose.Schema({
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
  firstName: String,
  phone: String,
  notes: String
}, { timestamps: true });
module.exports = mongoose.model('DistributedItem', DistributedItemSchema);
