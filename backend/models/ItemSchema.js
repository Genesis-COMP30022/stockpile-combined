const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name field is required'],
    },
    price: {
        type: Number,
        required: [true, 'cost field is required'],
        min: 0.05
    },
    desc: String,
    category: String,
    buyer: String,
    image: {
        type: String
    },
    imagetype: {
        type: String
    },
    datePurchased: {
        type: Date,
        default: () => Date.now(),
    },
    dateUpdated: {
        type: Date,
        default: () => Date.now(),
    },
    dateCreated: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    }
})

module.exports = mongoose.model("items", itemSchema)