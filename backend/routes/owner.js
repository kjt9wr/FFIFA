const router = require('express').Router();
let Owner = require('../models/owner.model');

router.route('/').get((req, res) => {
  Owner.find()
    .then(owner => res.json(owner))
    .catch(err => res.status(400).json('Unable to find owner: ' + err));
});

router.route('/:name').get((req, res) => {
  Owner.find({ name : req.params.name})
    .then(owner => res.json(owner))
    .catch(err => res.status(400).json('Unable to find owner: ' + err));
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
    .catch(err => res.status(400).json('Unable to add owner: ' + err));
}); 

// Updating tax
router.route('/updateTax/:name').put((req, res) => {
  Owner.findOne({ name: req.params.name })
    .then(owner => {
      owner.luxTax = req.body.tax;
      owner.save()
          .then(() => res.json(owner.name + ' luxary tax paid updated!'))
          .catch(err => res.status(400).json('Unable to update owner: ' + err));
      })
      .catch(err => res.status(400).json('Unable to find owner: ' + err));
  });

// Updating a keeper
router.route('/update/:id/:pid').post((req, res) => {
const keep = req.body.keep;
Owner.findById(req.params.id)
  .then(owner => {
    const myIndex = owner.roster.findIndex(currplayer => currplayer._id === req.params.pid);
    owner.roster[myIndex].keep = keep;
    owner.save()
        .then(() => res.json('Player updated!'))
        .catch(err => res.status(400).json('Unable to update player: ' + err));
    })
    .catch(err => res.status(400).json('Unable to find owner: ' + err));
});

module.exports = router;