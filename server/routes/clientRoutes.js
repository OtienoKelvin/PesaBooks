const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const client = require("../controllers/clientController");

router.post("/", auth, client.createClient);
router.get("/", auth, client.getClients);
router.put("/:id", auth, client.updateClient);
router.delete("/:id", auth, client.deleteClient);

module.exports = router;
