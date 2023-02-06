const createError = require('http-errors');
const mongoose = require('mongoose');

const Match = require('../Models/match.model');

module.exports = {
  getAllMatches: async () => {
    try {
      const results = await Match.find({}, { __v: 0 });
      return results;
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewMatch: async (matchP) => {
    try {
      console.log(matchP);
      const match = new Match(matchP);
      const result = await match.save();
      return result;
    } catch (error) {
      console.log(error.message);
      if (error.name === 'ValidationError') {
        return createError(422, error.message);
      }
      return error;
    }
  },

  findMatchById: async (id) => {
    try {
      console.log(id);
      const match = await Match.findOne({"id": id});
      if (!match) {
        return null;
      }
      return match;
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return createError(400, 'Invalid Match id');
      }
      return error;
    }
  },

  updateAMatch: async (matchP) => {
    try {
      const options = { new: true };

      const match = await Match.findOne({"id": matchP.id});
      const result = await Match.findByIdAndUpdate(match._id, matchP, options);
      if (!result) {
        throw createError(404, 'Match does not exist');
      }
      return result;
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return createError(400, 'Invalid Match Id');
      }

      return error;
    }
  },

  deleteAMatch: async (id) => {
    try {
      const result = await Match.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'Match does not exist.');
      }
      return result;
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return createError(400, 'Invalid Match id');
        ;
      }
      return error;
    }
  }
};