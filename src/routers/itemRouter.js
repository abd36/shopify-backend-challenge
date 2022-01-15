const express = require("express");
const Item = require("../models/item");
const itemsRouter = express.Router();


itemsRouter.get("/", async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).send(items);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

itemsRouter.post("/", async (req, res) => {
    try {
        const item = new Item({
            name: req.body.name,
            quantity: req.body.quantity,
            price: req.body.price
        });
        
        await item.save().then((newItem) => {
            res.status(201).json(newItem)
        });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = itemsRouter;