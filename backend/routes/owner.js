const router = require('express').Router();
let Owner = require('../models/owner.model');

router.route('/').get((req, res) => {
  Owner.find()
    .then(owner => res.json(owner))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const cap = req.body.cap;

  const newOwner = new Owner({
    name,
    cap
  });

  newOwner.save()
    .then(() => res.json('Owner added!'))
    .catch(err => res.status(400).json('Error: ' + err));
}); 

module.exports = router;