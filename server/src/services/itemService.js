const Item = require("../models/item");

// get all items (deleted or undeleted)
exports.findAllItems = async (req, res) => {
    const filter = req.body;

    try {
        await Item.find(filter).then((items) => {
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