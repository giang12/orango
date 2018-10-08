const orango = require('orango')
const jwt = require('jsonwebtoken')
const app = require('../app')
const config = require('../config')
const Auth = orango.model('Auth')

app.post('/login', async (req, res) => {
  try {
    const authUser = await Auth.login(req.body.username, req.body.password)
    if (authUser) {
      const token = jwt.sign(authUser, config.JWT_SECRET)
      return res.send({ token })
    }
    return res.status(401).send('Unauthorized')
  } catch (e) {
    res.status(500).send(e.message)
  }
})

app.get('/me', async (req, res) => {
  res.send(req.user)
})