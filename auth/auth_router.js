const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('./auth_model');

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  Users.createUser(user)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(error => {
      console.log(error, 'error creating user');
      res.status(500).json({ error: 'error creating user' });
    });
});

router.post('/login', (req, res) => {
  const {username, password} = req.body;
  
  Users.findBy({username})
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)){
        const token = generateToken(user);
        res.status(200).json({
          id: user.id,
          message: `Welcome ${user.username}`,
          token
        })
      }
      else (
        res.status(401).json({message: "Invalid Credentials, Please Try Again."})
      )
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({error: "Error on Login Request"});
    })
})

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: '1d'
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options)
}

module.exports = router;