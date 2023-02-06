const createError = require('http-errors');
const mongoose = require('mongoose');

const Match = require('../Models/match.model');

module.exports = {
  getAllMatches: async (req, res, next) => {
    try {
      const results = await Match.find({}, { __v: 0 });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewMatch: async (req, res, next) => {
    try {
      const match = new Match(req.body);
      const result = await match.save();
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

  findMatchById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const match = await Match.findById(id);
      if (!match) {
        throw createError(404, 'Match does not exist.');
      }
      res.send(match);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Match id'));
        return;
      }
      next(error);
    }
  },

  updateAMatch: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Match.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Match does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Match Id'));
      }

      next(error);
    }
  },

  deleteAMatch: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Match.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'Match does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Match id'));
        return;
      }
      next(error);
    }
  }
};