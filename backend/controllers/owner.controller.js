const Owner = require("../models/owner.model");
const idMap = require("../utils/idMaps.js");

// POST a new owner
const createOwner = async (req, res) => {
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
};

// GET all owners
const getOwners = async (req, res) => {
  Owner.find()
    .then((owner) => res.json(owner))
    .catch((err) => res.status(400).json("Unable to find owner: " + err));
};

// GET a single owner by name
const getOwnerByName = async (req, res) => {
  Owner.find({ name: req.params.name })
    .then((owner) => res.json(owner))
    .catch((err) => res.status(400).json("Unable to find owner: " + err));
};

// PUT - update a single owner's cap
const updateCap = async (req, res) => {
  Owner.find({ sleeperId: idMap.OwnerSleeperIdByName[req.params.ownerName] })
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
};

// PUT - update a single owner's penalty fee
const updatePenaltyFee = async (req, res) => {
  const { ownerName } = req.params;
  await Owner.updateOne(
    { sleeperId: idMap.OwnerSleeperIdByName[ownerName] },
    req.body
  )
    .then(res.json(`${ownerName}'s penalty fee updated`))
    .catch((err) => res.status(400).json("Unable to find owner: ", err));
};

module.exports = {
  createOwner,
  getOwners,
  getOwnerByName,
  updateCap,
  updatePenaltyFee,
};
