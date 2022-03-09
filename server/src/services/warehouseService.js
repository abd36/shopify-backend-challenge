const Warehouse = require("../models/warehouse");

exports.createWarehouse = async (req, res) => {
    try {
        const warehouse = new Warehouse({
            name: req.body.name,
            address: req.body.address
        });

        await warehouse.save().then((newWarehouse) => {
            return res.status(201).json(newWarehouse);
        })
    }

    catch (error) {
        return res.status(500).send(error.message);
    }
}