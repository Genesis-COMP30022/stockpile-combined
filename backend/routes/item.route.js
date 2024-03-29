const express = require("express");
const itemRoute = express.Router();
var uuid = require("uuid");
const moment = require("moment");
var tz = require("moment-timezone");
const Storage = require("upload-cloud-storage");

let ItemModel = require("../models/ItemSchema");

itemRoute.route("/").get((req, res, next) => {
  ItemModel.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

itemRoute.route("/getfamilyitems/:family").get((req, res, next) => {
  let query = { family: req.params.family };

  let mongoDbQuery = { family: { $in: query.family.split(",") } };

  ItemModel.find(mongoDbQuery)
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      return next(err);
    });
});

itemRoute.route("/:id").get((req, res, next) => {
  ItemModel.findOne({ _id: req.params.id })
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      return next(err);
    });
});

itemRoute.route("/").get((req, res, next) => {
  ItemModel.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// create post
itemRoute.route("/create-item").post((req, res, next) => {
  if (req.body.datePurchased === "") {
    req.body.datePurchased = moment(Date.now())
      .tz("Australia/Melbourne")
      .format("YYYY-MM-DD");
  }

  if (req.body.image == "NULL") {
    ItemModel.create(req.body, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    });
  } else {
    var fileext = "";
    var mimetype = "";
    if (req.body.imagetype == "image/png;base64") {
      fileext = ".png";
      mimetype = "image/png";
    } else if (
      req.body.imagetype == "image/jpg;base64" ||
      req.body.imagetype == "image/jpeg;base64"
    ) {
      fileext = ".jpg";
      mimetype = "image/jpg";
    }
    var filename = uuid.v4().replace(/-/g, "").concat(fileext);
    var filepath = "uploaded/" + filename;

    require("fs").writeFile(filepath, req.body.image, "base64", function (err) {
      console.log(err);
    });

    // upload image

    const Google = Storage.init({
      type: "google",
      keyFilename: "unique-bonbon-364702-49a30afecdd5.json",
      bucketName: "stockpileapp",
      projectId: "unique-bonbon-364702",
    });

    Google.upload(filepath, {
      deleteSource: true,
      contentType: mimetype,
      newName: filename,
      dest: "uploaded",
    })
      .then((result) => {
        req.body.image = result.slice();

        ItemModel.create(req.body, (error, data) => {
          if (error) {
            return next(error);
          } else {
            res.json(data);
          }
        });
      })
      .catch((err) => console.log(err));
  }
});

// update post
itemRoute.route("/update-item/:id").put((req, res, next) => {
  ItemModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
        console.log("Item updated!");
      }
    }
  );
});

// delete post
itemRoute.route("/delete-item/:id").delete((req, res, next) => {
  ItemModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});
module.exports = itemRoute;
