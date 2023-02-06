const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SeasonSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  currentMatchday: {
    type: Number,
    required: true
  },
  winner: {
    type: String,
    required: false
  },
});

const Season = mongoose.model('season', SeasonSchema);

module.exports = Season;