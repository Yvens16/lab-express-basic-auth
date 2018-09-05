const express = require('express');
const router  = express.Router();
const bcrypt= require('bcrypt');
const User = require("../models/user-model.js");

router.get("/signup", (req, res, next) => {
  res.render("auth-views/signup-form");
});

router.post('/process-sign', (req, res, next) => {
  const {userName, password} =  req.body;
    const encryptedPassword = bcrypt.hashSync(password, 10);

    User.create({userName, encryptedPassword})
      .then(data => {
      res.redirect('/');      
      })
      .catch(err => next(err));
});


router.get('/login', (req, res, next) => {
  res.render('auth-views/login-form.hbs')
})

router.post('/process-login', (req, res, next) => {
  const {userName, password} = req.body;

    User.findOne({userName})
      .then(data => {
        if (!data){
          res.redirect("/login");
          return;
        }
        const {encryptedPassword} = data;
        if(!bcrypt.compareSync(password, encryptedPassword)){
          res.redirect('/login');
          return;
        }
        res.redirect('/');
      })
      .catch(err => next(err));
})



module.exports = router;
