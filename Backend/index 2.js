const express = require('express')
const app = express()
const saveLecture= require('./saveFunctions').saveLecture
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/saveLecture', async (req, res) => {
  console.log('made it')
await  saveLecture('test', req.body.lectureTitle, req.body.password);
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
