const express = require('express');
const app = express();

const Requests = require('./Services/requests');

app.get('/', (req, res) => res.send('server entry point test'));

app.get('/leagues', (req, res) => {
  res.send(Requests.getLeagues())
});

const MatchesRoute = require('./Routes/matches.route');
app.use('/matches', MatchesRoute);

//404 handler and pass to error handler
app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT + '...');
});