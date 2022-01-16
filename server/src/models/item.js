const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validate = require('mongoose-validator');

const nameValidator = validate({
    validator: "isAlpha",
    message: "Name must contain alphabetic characters only",
})

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name required"],
        unique: [true, "Item name already exists"],
        trim: true,
        minlength: [3, "Name must be at least 3 letters"],
        validate: nameValidator,
    },
    quantity: {
        type: Number,
        min: [1, "Quantity must be at least 1"],
        required: [true, "Quantity required"]
    },
    price: {
        type: Number,
        min: [1, "Price must be at least $0.01"],
        required: [true, "Price required"]
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

ItemSchema.plugin(uniqueValidator, { message: "{PATH} must be unique" });
module.exports = mongoose.model("Item", ItemSchema);