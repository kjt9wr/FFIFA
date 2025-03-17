const router = require("express").Router();
const {
  createOwner,
  getOwners,
  getOwnerByName,
  updateCap,
  updatePenaltyFee,
} = require("../controllers/owner.controller");

const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);

// Get all owners
router.route("/").get(getOwners);

// Get owner by name
router.route("/:name").get(getOwnerByName);

// Add new owner
router.route("/add").post(createOwner);

// Manually edit cap
router.route("/updateCap/:ownerName").put(updateCap);

// Update penalty fee
router.route("/updatePenaltyFee/:ownerName").put(updatePenaltyFee);

module.exports = router;
