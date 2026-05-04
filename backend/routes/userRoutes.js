const express = require("express");
const {
  fetchDetails,
  updateDetails,
} = require("../controllers/userController");
const authMiddleWare = require("../middleware/authMiddleWare");
const router = express.Router();

router.get("/fetchDetails", authMiddleWare, fetchDetails);
router.patch("/update", authMiddleWare, updateDetails);
module.exports = router;
