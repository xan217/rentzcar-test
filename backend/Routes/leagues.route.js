const express = require('express');
const router = express.Router();

const LeagueController = require('../Controlllers/league.controller');
const Requests = require('../Services/requests');

//Get a list of all Leagues
router.get('/all', async (req, res, next) => {
  let listOfLeagues = await LeagueController.getAllLeagues();

  if (listOfLeagues.length === 0) {
    const localList = await Requests.getLeagues();
    localList.forEach( async league => {
      await LeagueController.createNewLeague(league);
    });

    listOfLeagues = await LeagueController.getAllLeagues();
  }
  
  return res.status(200).send(listOfLeagues);
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

