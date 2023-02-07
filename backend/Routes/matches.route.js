const express = require('express');
const router = express.Router();

const Requests = require('../Services/requests');
const MatchController = require('../Controlllers/match.controller');

//Retrieve match from API
router.get('/full/:id', async (req, res) => {
  const result = await Requests.getMatch(req.params.id);

  MatchController.updateAMatch({
    id: result.id,
    utcDate: result.utcDate,
    home_team_score: result.score.fullTime.home,
    away_team_score: result.score.fullTime.away,
  });

  res.status(200);
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

  const parsedResult = {
    competition: result.competition,
    matches: await Promise.all(result.matches.map( async match => {
      const dbMatch = await MatchController.findMatchById(match.id);
      
      match = {
        id: match.id,
        area_id: match.area.id,
        area_name: match.area.name,
        competition_id: match.competition.id,
        competition_name: match.competition.name,
        utcDate: match.utcDate,
        home_team_id: match.homeTeam.id,
        home_team_name: match.homeTeam.name,
        home_team_logo: match.homeTeam.crest,
        home_team_score: match.score?.fullTime.home,
        away_team_id: match.awayTeam.id,
        away_team_name: match.awayTeam.name,
        away_team_logo: match.awayTeam.crest,
        away_team_score: match.score?.fullTime.away,
      };
      if(!dbMatch){
        MatchController.createNewMatch(match);
      } 
      else {
        MatchController.updateAMatch({
          id: match.id,
          utcDate: match.utcDate,
          home_team_score: match.score?.fullTime.home,
          away_team_score: match.score?.fullTime.away,
        });
      }
      return match;
    }))
  };

  res.status(200);
  res.send(parsedResult);
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

