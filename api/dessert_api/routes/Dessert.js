"use strict";

const express = require("express");
const User = require("../models/User.js");
const Dessert = require("../models/Dessert");
const { SceGoogleApiHandler } = require("../util/SceGoogleApiHandler");
const TokenUtils = require("../../main_endpoints/util/token-functions");
const { STATUS_CODES } = require("../../util/constants");

const router = express.Router();

router.get("/getDesserts", async (req, res) => {
  Dessert.find()
    .then((desserts) => res.status(STATUS_CODES.OK).send(desserts))
    .catch((err) => {
      res.sendStatus(BAD_REQUEST);
    });
});

router.post("/createDessert", async (req, res) => {
  const ratingIsNum = !Number.isNaN(Number(req.body.rating));

  const newDessert = new Dessert({
    title: req.body.title,
    description: req.body.description,
    rating: ratingIsNum ? req.body.rating : undefined,
  });

  Dessert.create(newDessert)
    .then((post) => {
      return res.json(post);
    })
    .catch(() => res.sendStatus(STATUS_CODES.BAD_REQUEST));
});

router.post("/editDessert", (req, res) => {
  const { _id, title, description, rating } = req.body;
  Dessert.findOne({ _id })
    .then((Dessert) => {
      Dessert.title = title || Dessert.title;
      Dessert.description = description || Dessert.description;
      Dessert.rating = rating || Dessert.rating;
      Dessert.save()
        .then(() => {
          res.sendStatus(STATUS_CODES.OK);
        })
        .catch(() => {
          res.sendStatus(STATUS_CODES.BAD_REQUEST);
        });
    })
    .catch(() => {
      res.sendStatus(STATUS_CODES.NOT_FOUND);
    });
});

router.post("/deleteDessert", (req, res) => {
  Dessert.deleteOne({ _id: req.body._id })
    .then((result) => {
      if (result.n < 1) {
        res.sendStatus(STATUS_CODES.NOT_FOUND);
      } else {
        res.sendStatus(STATUS_CODES.OK);
      }
    })
    .catch(() => {
      res.sendStatus(STATUS_CODES.BAD_REQUEST);
    });
});

module.exports = router;
