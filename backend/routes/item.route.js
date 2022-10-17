const express = require('express');
const itemRoute = express.Router();

let ItemModel = require('../models/ItemSchema');

//index
itemRoute.route('/').get((req, res) => {
    ItemModel.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


//create post
itemRoute.route('/create-item').post((req, res, next) => {
    ItemModel.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

//update post
itemRoute.route('/update-item/:id').post((req, res, next) => {
        ItemModel.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data)
                console.log('Item updated!')
            }
        })
    })
    // delete post

itemRoute.route('/delete-item/:id').delete((req, res, next) => {

    ItemModel.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })

})
module.exports = itemRoute;