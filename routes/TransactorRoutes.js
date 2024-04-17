const express = require("express");
const router = express.Router();
const {createTransactor} = require("../controllers/TransactorController");

router.route("/create").post(createTransactor);

module.exports = router;