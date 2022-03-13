const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const WarehouseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name required"],
        unique: [true, "Warehouse name already exists"],
        trim: true,
        minlength: [3, "Name must be at least 3 letters"],
        validate: {
            validator: (val) => validator.isAlpha(val, ["en-US"], { ignore: " " }),
            message: "Name must contain only alphabetic characters"
        }
    },

    address: {
        type: String,
        required: [true, "Address required"],
        unique: [true, "Address already exists"],
        trim: true,
        minlength: [5, "Address must be at least 5 characters"]
    }
})

WarehouseSchema.plugin(uniqueValidator, {message: "{PATH} already exists"});
module.exports = mongoose.model("Warehouse", WarehouseSchema, "warehouses");