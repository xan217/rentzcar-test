const express = require('express');
const router = express.Router();

const LeagueController = require('../Controlllers/league.controller');

//Get a list of all Leagues
router.get('/all', async (req, res) => {
  const listOfLeagues = await LeagueController.getAllLeagues();

  res.send(listOfLeagues);
});

//Get a list of all Leagues
router.get('/', LeagueController.getAllLeagues);

//Create a new League
router.post('/', LeagueController.createNewLeague);

//Get a League by id
router.get('/:id', LeagueController.findLeagueById);

//Update a League by id
router.patch('/:id', LeagueController.updateALeague);

//Delete a League by id
router.delete('/:id', LeagueController.deleteALeague);

module.exports = router;

