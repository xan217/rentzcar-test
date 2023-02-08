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

module.exports = router;

