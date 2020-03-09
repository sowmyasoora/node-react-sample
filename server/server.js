const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');

app.use(express.static(publicPath),);

app.get('/api/data', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.sendFile(path.join(publicPath, 'data/data.json'));
});


app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(3000, () => {
  console.log('Server is up!');
});
