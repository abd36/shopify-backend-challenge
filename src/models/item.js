const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    // name, quantity, price, deleted, deletedMessage
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        min: 1,
        required: true
    },
    price: {
        type: Number,
        min: 1,
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedMessage: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model("Item", ItemSchema);