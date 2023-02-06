const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  area_id: Number,
  area_name: String,
  competition_id: Number, 
  competition_name: String,
  utcDate: String,
  home_team_id: Number,
  home_team_name: String,
  home_team_score: Number,
  away_team_id: Number,
  away_team_name: String,
  away_team_score: Number
});

const Match = mongoose.model('match', MatchSchema);

module.exports = Match;