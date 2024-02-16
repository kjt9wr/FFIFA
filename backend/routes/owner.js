const router = require("express").Router();
const Owner = require("../models/owner.model");

// Get all owners
router.route("/").get((req, res) => {
  Owner.find()
    .then((owner) => res.json(owner))
    .catch((err) => res.status(400).json("Unable to find owner: " + err));
});

// Get owner by name
router.route("/:name").get((req, res) => {
  Owner.find({ name: req.params.name })
    .then((owner) => res.json(owner))
    .catch((err) => res.status(400).json("Unable to find owner: " + err));
});

//add new owner
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

// Manually edit cap
router.route("/updateCap/:ownerName").put((req, res) => {
  Owner.findById(ownersIDByName[req.params.ownerName])
    .then((owner) => {
      owner.cap.set(req.body.year, req.body.cap);
      owner
        .save()
        .then(() =>
          res.json(
            `${owner.name} cap updated to ${req.body.cap} owner ${owner.cap}`
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
