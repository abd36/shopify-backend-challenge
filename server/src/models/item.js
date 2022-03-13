const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const FKEnforcer = require('./helpers/foreign-key-enforcer');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name required"],
        unique: [true, "Item name already exists"],
        trim: true,
        minlength: [3, "Name must be at least 3 letters"],
        validate: {
            validator: (val) => validator.isAlpha(val, ["en-US"], { ignore: " " }),
            message: "Name must contain only alphabetic characters"
        }
    },
    quantity: {
        type: Number,
        min: [1, "Quantity must be at least 1"],
        required: [true, "Quantity required"],
        validate: {
            validator: Number.isInteger,
            message: "Quantity must be an integer"
        }
    },
    price: {
        type: Number,
        min: [1, "Price must be at least $0.01"],
        required: [true, "Price required"],
        validate: {
            validator: Number.isInteger,
            message: "Price must be an integer"
        }
    },
    warehouse_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Warehouse",
        default: null,
        validate: {
            isAsync: true,
            validator: function(warehouse_id) {
                return FKEnforcer(mongoose.model("Warehouse"), warehouse_id);
            },
            message: "Warehouse doesn't exist"
        }
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedMessage: {
        type: String,
        default: "",
        maxlength: [140, "Deleted message's length must be 140 characters or less"]
    }
});

ItemSchema.plugin(uniqueValidator, {message: "{PATH} already exists"});
module.exports = mongoose.model("Item", ItemSchema, "items");