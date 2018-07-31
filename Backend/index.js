const express = require('express')
const app = express()
const saveFunctions= require('./saveFunctions')
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/saveLecture', async (req, res) => {
  console.log('made it')
  await saveFunctions.saveLecture('test', req.body.lectureTitle, req.body.password);
})

app.post('/saveUser', async (req, res) => {
  console.log('hi')
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ error: 'Please enter valid username and password' });
  }
  if (req.body.password !== req.body.passwordRepeat) {
    res.status(400).json({ error: "Passwords don't match" });
  }
  try {
    if (req.body.type === 1) {
      await saveFunctions.saveStudent(req.body.username, req.body.password);
    } else {
      console.log('teacher')
      let teacher = await saveFunctions.saveTeacher(req.body.username, req.body.password);
      console.log(teacher);
    }
    res.json({ success: true });
  }
  catch(error) {
    res.status(400).json({error: error.message})
  }

})

app.listen(3001, () => console.log('Example app listening on port 3001!'))
