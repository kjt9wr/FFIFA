const router = require("express").Router();
const Owner = require("../models/owner.model");
const idMap = require("../utils/idMaps.js");

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

// Add new owner
router.route("/add").post((req, res) => {
  const { name, cap, sleeperId, active } = req.body;

  Owner.create({
    name,
    cap,
    sleeperId,
    active,
  })
    .then(() =>
      res.status(201).json({
        message: "Owner created successfully!",
        owner: {
          name,
          cap,
          sleeperId,
          active,
        },
      })
    )
    .catch((err) => res.status(400).json("Unable to add owner: " + err));
});

// Manually edit cap
router.route("/updateCap/:ownerName").put((req, res) => {
  Owner.findById(idMap.ownersIDByName[req.params.ownerName])
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

// Update penalty fee
router.route("/updatePenaltyFee/:ownerName").put(async (req, res) => {
  await Owner.updateOne(
    { _id: idMap.ownersIDByName[req.params.ownerName] },
    req.body
  )
    .then(res.status(200).json("Owner penalty fee updated"))
    .catch((err) => res.status(400).json("Unable to find owner: ", err));
});

module.exports = router;
