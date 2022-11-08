const express = require("express");
const userRoute = express.Router();
var uuid = require("uuid");

let UserModel = require("../models/UserSchema");

// index
userRoute.route("/").get((req, res, next) => {
  UserModel.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

userRoute.route("/:id").get((req, res, next) => {
  UserModel.findOne({ _id: req.params.id })
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      return next(err);
    });
});

userRoute.route("/getusermail/:email").get((req, res, next) => {
  UserModel.findOne({ email: req.params.email })
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      return next(err);
    });
});

userRoute.route("/getpeopleinfamily/:family").get((req, res, next) => {
  let query = { family: req.params.family };

  let mongoDbQuery = { family: { $in: query.family.split(",") } };

  UserModel.find(mongoDbQuery)
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      return next(err);
    });
});

userRoute.route("/").get((req, res) => {
  UserModel.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// update user
userRoute.route("/update-user/:id").put((req, res, next) => {
  UserModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
        console.log("user updated!");
      }
    }
  );
});

// delete user
userRoute.route("/delete-user/:id").delete((req, res, next) => {
  UserModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});
module.exports = userRoute;
