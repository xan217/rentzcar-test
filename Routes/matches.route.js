const express = require('express');
const router = express.Router();

const Requests = require('../Services/requests');
// const MatchController = require('../Controllers/match.controller');

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
  res.send(result);
});

// //Get a list of all Match
// router.get('/', MatchController.getAllMatchs);

// //Create a new Match
// router.post('/', MatchController.createNewMatch);

// //Get a Match by id
// router.get('/:id', MatchController.findMatchById);

// //Update a Match by id
// router.patch('/:id', MatchController.updateAMatch);

// //Delete a Match by id
// router.delete('/:id', MatchController.deleteAMatch);

module.exports = router;

