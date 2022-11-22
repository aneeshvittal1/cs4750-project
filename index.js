const db = require('./static/database.js')

const path = require('path')
const express = require('express')
const passport = require('passport')
const app = express()
const router = express.Router()
const port = 3000

app.use(express.urlencoded({ extended: true }));
// EXPRESS SERVER CONFIG
app.use('/', router)

app.use(express.static(path.join(__dirname, 'static')));


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})



//URL ROUTES

router.get('/', (req,res) => {
    res.sendFile(__dirname+"/index.html")
})

router.get('/signup', (req, res) => {
  res.sendFile(__dirname+"/signup.html")
})

// TO GET USERS?
// router.get('/users', (req,res) => {
//   res.send(db.viewUsers());
// })

router.post('/api/select', (req,res) => {
  console.log(req.body.textbox);
  db.selectAny(req.body.textbox);
  res.end();
})

router.post('/login/password', passport.authenticate('local', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/login',
  failureMessage: true
}));

router.post('/signup', (req, res) => {
  console.log(req.body);
  let stringified = JSON.stringify(req.body)
  let body = JSON.parse(stringified);
  console.log(body)
  db.addName(body.firstName, body.middleName, body.lastName);
  db.addAddress(body.houseNumber, body.street, body.city, body.state, body.zipcode, body.aptNumber);
  let nameId = db.getNameID(body.firstName, body.middleName, body.lastName);
  let addrId = db.getAddressID(body.houseNumber, body.street, body.city, body.state, body.zipcode, body.aptNumber);
  db.addUser(nameId, addrId, body.phoneNum, body.email, body.birthday);
  res.end();
})

db.getNameID("Chief", "Keef", "Sosa");