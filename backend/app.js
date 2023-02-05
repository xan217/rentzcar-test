const express = require('express');
const app = express();


app.get('/', (req, res) => res.send('server entry point test'));

app.listen(3000, () => {
  console.log('Rentzcar test running on port 3000');
});