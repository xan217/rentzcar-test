const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AreaSchema = require('./area.model');
const SeasonSchema = require('./season.model');

const MatchSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  area: {
    type: AreaSchema,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
  },
  type: {
    type: String,
    required: true
  },
  emblem: {
    type: String,
  },
  plan: {
    type: String,
  },
  currentSeason: {
    type: SeasonSchema,
    required: true
  },
  numberOfAvailableSeasons: {
    type: Number,
    required: true
  },
  lastUpdated: {
    type: String,
    required: true
  },
});

const Match = mongoose.model('match', MatchSchema);

module.exports = Match;