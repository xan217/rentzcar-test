const createError = require('http-errors');
const mongoose = require('mongoose');

const League = require('../Models/league.model');

module.exports = {
  getAllLeagues: async () => {
    try {
      const results = await League.find({}, { __v: 0 });
      return results;
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewLeague: async (leagueP) => {
    try {
      const league = new League(leagueP);
      const result = await league.save();
      return result;
    } catch (error) {
      console.log(error.message);
      if (error.name === 'ValidationError') {
        return createError(422, error.message);
      }
      return error;
    }
  },

  findLeagueById: async (id) => {
    try {
      const league = await League.findById(id);
      if (!league) {
        throw createError(404, 'League does not exist.');
      }
      res.send(league);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return createError(400, 'Invalid League id');
      }
      return error;
    }
  },

  updateALeague: async (league) => {
    try {
      const options = { new: true };

      const result = await League.findByIdAndUpdate(league.id, league, options);
      if (!result) {
        throw createError(404, 'League does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return createError(400, 'Invalid League Id');
      }

      return error;
    }
  },

  deleteALeague: async (id) => {
    try {
      const result = await League.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'League does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return createError(400, 'Invalid League id');
      }
      return error;
    }
  }
};