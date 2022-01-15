const express = require("express");
const Item = require("../models/item");
const itemsRouter = express.Router();

// get all items
itemsRouter.get("/", async (req, res) => {
    try {
        await Item.find().then((items) => {
            res.status(200).send(items);
        });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

// get 1 item by id
itemsRouter.get("/:id", async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (item) {
            res.status(200).send(item);
        } else {
            res.status(404).send(`Item with ID ${req.params.id} not found`)
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
})

// update item by id
itemsRouter.put("/:id", async (req, res) => {
    try {
        const itemUpdate = req.body;
        const id = req.params.id;

        const oldItem = await Item.findById(id);

        if (oldItem) {
            await Item.findByIdAndUpdate(id, itemUpdate, { new: true, runValidators: true }).then((newItem) => {
                res.status(200).json(newItem);
            });
        } else {
            res.status(404).send(`Item with ID ${id} not found`);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// create item
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

// delete item by id
itemsRouter.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        await Item.deleteOne({ _id: id }).then(() => {
            res.status(204).send();
        })
    }
    catch (error) {
        res.status(500).send(error.message);
    }
})


module.exports = itemsRouter;