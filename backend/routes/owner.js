const router = require("express").Router();
const Owner = require("../models/owner.model");

router.route("/").get((req, res) => {
  Owner.find()
    .then((owner) => res.json(owner))
    .catch((err) => res.status(400).json("Unable to find owner: " + err));
});

router.route("/:name").get((req, res) => {
  Owner.find({ name: req.params.name })
    .then((owner) => res.json(owner))
    .catch((err) => res.status(400).json("Unable to find owner: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const cap = req.body.cap;

  const newOwner = new Owner({
    name,
    cap,
  });

  newOwner
    .save()
    .then(() => res.json("Owner added!"))
    .catch((err) => res.status(400).json("Unable to add owner: " + err));
});

router.route("/add/sleeperId").post((req, res) => {
  Owner.findOne({ name: req.body.name })
    .then((owner) => {
      owner.sleeperId = req.body.sleeperId;
      owner
        .save()
        .then(() => res.json(owner.name + " sleeperId updated!"))
        .catch((err) => res.status(400).json("Unable to update owner: " + err));
    })
    .catch((err) => res.status(400).json("Unable to find owner: " + err));
});

// Updating tax
router.route("/updateTax/:name").put((req, res) => {
  Owner.findOne({ name: req.params.name })
    .then((owner) => {
      owner.luxTax = req.body.tax;
      owner
        .save()
        .then(() => res.json(owner.name + " luxary tax paid updated!"))
        .catch((err) => res.status(400).json("Unable to update owner: " + err));
    })
    .catch((err) => res.status(400).json("Unable to find owner: " + err));
});

// Updating a keeper
router.route("/update/:id/:pid").post((req, res) => {
  const keep = req.body.keep;
  Owner.findById(req.params.id)
    .then((owner) => {
      const myIndex = owner.roster.findIndex(
        (currplayer) => currplayer._id === req.params.pid
      );
      owner.roster[myIndex].keep = keep;
      owner
        .save()
        .then(() => res.json("Player updated!"))
        .catch((err) =>
          res.status(400).json("Unable to update player: " + err)
        );
    })
    .catch((err) => res.status(400).json("Unable to find owner: " + err));
});

// Manually edit cap
router.route("/update/cap").post((req, res) => {
  Owner.findById(ownersIDByName[req.body.ownerName])
    .then((owner) => {
      owner.cap.set(req.body.year, req.body.cap);
      owner
        .save()
        .then(() =>
          res.json(
            owner.name +
              " cap updated to " +
              req.body.cap +
              " owner " +
              owner.cap
          )
        )
        .catch((err) =>
          res.status(400).json("Unable to update owner cap: " + err)
        );
    })
    .catch((err) => res.status(400).json("Unable to find owner: " + err));
});

const ownersIDByName = {
  Kevin: "5e80d724b3bdaf3413316177",
  Justin: "5e80d930b3bdaf3413316189",
  Alex: "5e80dd6ab3bdaf34133161bd",
  Luigi: "5e80da66b3bdaf341331619b",
  Christian: "5e80e173b3bdaf3413316213",
  Matt: "5e80df96b3bdaf34133161ef",
  Brent: "5e80db62b3bdaf34133161ab",
  Michael: "5e80de37b3bdaf34133161cf",
  Nikos: "5e80dedcb3bdaf34133161dd",
  Chinmay: "5e80e07eb3bdaf3413316200",
  Patrick: "5e80e1dab3bdaf3413316225",
  Jeff: "5e80e1deb3bdaf3413316226",
};

module.exports = router;
