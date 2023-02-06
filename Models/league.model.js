const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const LeagueSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
});

const League = mongoose.model('league', LeagueSchema);

module.exports = League;