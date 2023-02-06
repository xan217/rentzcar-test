const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AreaSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  flag: {
    type: String,
    required: true
  },
});

const Area = mongoose.model('area', AreaSchema);

module.exports = Area;