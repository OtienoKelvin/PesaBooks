const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const business = require("../controllers/businessController");

router.post("/", auth, business.createBusiness);
router.get("/me", auth, business.getMyBusiness);

module.exports = router;
