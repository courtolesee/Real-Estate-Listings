/** ---- DO NOT MODIFY THIS FILE ---- **/
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5001;

const treats = require('./routes/router');

app.use(express.static('./server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/treats', treats);

app.listen(PORT, () => {
  console.log('Now listening on port: ', PORT);
});