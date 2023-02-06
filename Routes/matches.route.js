const express = require('express');
const router = express.Router();

const Requests = require('../Services/requests');
const MatchController = require('../Controlllers/match.controller');

//Retrieve match from API
router.get('/full/:id', async (req, res) => {
  const result = await Requests.getMatch(req.params.id);

  console.log(result);

  MatchController.updateAMatch({
    id: result.id,
    utcDate: result.utcDate,
    home_team_score: result.score.fullTime.home,
    away_team_score: result.score.fullTime.away,
  });

  res.send(result);
});

router.get('/:block/:league', async (req, res) => {
  let actualDate = new Date();
  actualDate = actualDate.toISOString().substr(0,10);

  const timeBlock = req.params.block;
  let futureDate = new Date();

  switch (timeBlock) {
    case 'week':
      futureDate.setDate(futureDate.getDate() + 7);
      break;
    case 'halfmonth':
      futureDate.setDate(futureDate.getDate() + 15);
      break;
    case 'month':
      futureDate.setDate(futureDate.getDate() + 30);
      break;
    case 'quarteryear':
      futureDate.setDate(futureDate.getDate() + 90);
      break;
    case 'year':
      futureDate.setDate(futureDate.getDate() + 365);
      break;
    case 'today':
    default:
      break;
  }

  futureDate = futureDate.toISOString().substr(0,10);

  const result = await Requests.getMatches(req.params.league, actualDate, futureDate);

  for (const value of Object.values(result.matches)) {
    const match = await MatchController.findMatchById(value.id);
    if(!match){
      MatchController.createNewMatch({
        id: value.id,
        area_id: value.area.id,
        area_name: value.area.name,
        competition_id: value.competition.id,
        competition_name: value.competition.name,
        utcDate: value.utcDate,
        home_team_id: value.homeTeam.id,
        home_team_name: value.homeTeam.name,
        home_team_score: value.score.fullTime.home,
        away_team_id: value.awayTeam.id,
        away_team_name: value.awayTeam.name,
        away_team_score: value.score.fullTime.away,
      });
    } 
    else {
      MatchController.updateAMatch({
        id: value.id,
        utcDate: value.utcDate,
        home_team_score: value.score.fullTime.home,
        away_team_score: value.score.fullTime.away,
      });
    }
  }

  res.send(result);
});

//Get a Match by id
router.get('/:id', MatchController.findMatchById);

// //Get a list of all Match
// router.get('/', MatchController.getAllMatches);

// //Create a new Match
// router.post('/', MatchController.createNewMatch);

//Retrieve match from API
router.get('/full/:id', async (req, res) => {
  const result = await Requests.getMatch(req.params.id);

  MatchController.updateAMatch({
    id: result.id,
    utcDate: result.utcDate,
    home_team_score: result.score.fullTime.home,
    away_team_score: result.score.fullTime.away,
  });

  return result;
});

//Update a Match by id
router.patch('/:id', MatchController.updateAMatch);

// //Delete a Match by id
// router.delete('/:id', MatchController.deleteAMatch);

module.exports = router;

