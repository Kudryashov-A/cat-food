const express = require('express');
const cors = require('cors');
const path = require('path');
const data = require('./data.js');
const PORT = process.env.PORT || 4444;

const app = express();
app.use(cors());
app.use('/images', express.static('images'));
app.get('/data', (req, res) => {
  res.send(data.products);
});

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '../frontend', 'build')))

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'build', 'index.html'))
  })
  app.get('/images/*', (req, res) => {
    res.sendFile(__dirname + req.url)
  })
}

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server running on port ${PORT} 🔥`);
});