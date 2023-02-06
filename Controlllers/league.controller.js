const createError = require('http-errors');
const mongoose = require('mongoose');

const League = require('../Models/league.model');

module.exports = {
  getAllLeaguees: async (req, res, next) => {
    try {
      const results = await League.find({}, { __v: 0 });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewLeague: async (req, res, next) => {
    try {
      const league = new League(req.body);
      const result = await league.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === 'ValidationError') {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },

  findLeagueById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const league = await League.findById(id);
      if (!league) {
        throw createError(404, 'League does not exist.');
      }
      res.send(league);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid League id'));
        return;
      }
      next(error);
    }
  },

  updateALeague: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await League.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'League does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid League Id'));
      }

      next(error);
    }
  },

  deleteALeague: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await League.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'League does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid League id'));
        return;
      }
      next(error);
    }
  }
};