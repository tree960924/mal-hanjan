require("dotenv").config();
const express = require('express');
const app = express()
const api = require('./Api');
const port = process.env.PORT;
const mongoose = require('mongoose');
const db = mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology:true});


app.use(express.json());

app.use('/api', api);

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
