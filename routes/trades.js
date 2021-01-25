const express = require("express");
const router = express.Router();
const Trade = require("../models/trades");

const generateUniqueId = (db) => {
  let allExistingUserId = db.map((obj) => obj.user_id);

  while (true) {
    let randomUniqueId = Math.floor(Math.random() * 100) + 1; // between 1-100
    if (!allExistingUserId.includes(randomUniqueId)) {
      return randomUniqueId;
    }
  }
};

router.get("/", (req, res, next) => {
  Trade.findAll()
    .then((db) => {
      res.status(200);
      res.send(db);
    })
    .catch((err) => console.log(err));
});

router.post("/", (req, res, next) => {
  let obj = req.body;
  let newId = null;
  Trade.findAll()
    .then((db) => {
      newId = generateUniqueId(db); // to generate a new Id that does not exist in db
      let newTradeObj = { ...obj, user_id: newId };
      Trade.create(newTradeObj);
      res.status(201);
      res.send(newTradeObj);
      console.log(newTradeObj);
    })
    .catch((err) => console.log(err));
});

router.get("/:id", (req, res, next) => {
  let reqId = req.params.id;

  Trade.findAll({
    where: {
      user_id: reqId,
    },
  })
    .then((t) => {
      res.status(200);
      res.send(t);
    })
    .catch((err) => console.log(err));
});

router.put("/:id", (req, res, next) => {
  res.status(405);
  res.send("<p> No PUT permission <p>");
});
router.delete("/:id", (req, res, next) => {
  res.status(405);
  res.send("<p> No DELETE permission <p>");
});
router.patch("/:id", (req, res, next) => {
  res.status(405);
  res.send("<p> No PATCH permission <p>");
});

module.exports = router;
