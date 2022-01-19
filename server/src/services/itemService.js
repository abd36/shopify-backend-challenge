const Item = require("../models/item");

exports.findItem = async (req, res) => {
    try {
        const id = req.params.id;

        await Item.findById(id).then((item) => {
            return res.status(200).send(item);
        });
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
}

// get all nondeleted items
exports.findAllItems = async (req, res) => {
    try {
        await Item.find({ deleted: false }).then((items) => {
            return res.status(200).send(items);
        });
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
}

// get all deleted items
exports.findDeletedAllItems = async (req, res) => {
    try {
        await Item.find({ deleted: true }).then((items) => {
            return res.status(200).send(items);
        });
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
}

// update item by id
exports.updateItemById = async (req, res) => {
    try {
        const itemUpdate = req.body;
        const id = req.params.id;

        const oldItem = await Item.findById(id);

        if (oldItem) {
            await Item.findByIdAndUpdate(id, itemUpdate, { new: true, runValidators: true }).then((newItem) => {
                return res.status(200).json(newItem);
            });
        } else {
            return res.status(404).send(`Item with ID ${id} not found`);
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

// delete item by id
exports.deleteItemById = async (req, res) => {
    try {
        const id = req.params.id;
        let item = await Item.findById(id);

        if (item) {
            if (item.deleted == false) {
                return res.status(400).send(`Item with ID ${id} is not flagged as deleted`);
            }

            await Item.findByIdAndDelete(id).then(() => {
                return res.status(204).send();
            });
        } else {
            return res.status(404).send(`Item with ID ${id} not found`);
        }
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
}

// create item
exports.createItem = async (req, res) => {
    try {
        console.log(req.body);
        const item = new Item({
            name: req.body.name,
            quantity: req.body.quantity,
            price: req.body.price
        });

        await item.save().then((newItem) => {
            return res.status(201).json(newItem)
        });
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
}