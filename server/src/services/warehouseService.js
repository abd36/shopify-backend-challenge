const item = require("../models/item");
const Warehouse = require("../models/warehouse");
const Item = require("../models/item");

// create warehouse
exports.createWarehouse = async (req, res, next) => {
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
        next(error);
    }
}

// get all warehouses
exports.getAllWarehouses = async (req, res) => {
    try {
        await Warehouse.find().then((warehouses) => {
            return res.status(200).send(warehouses);
        });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

// get warehouse by id
exports.getWarehouseById = async (req, res) => {
    try {
        const id = req.params.id;

        await Warehouse.findById(id).then((warehouse) => {
            return res.status(200).send(warehouse);
        })
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
}

// update warehouse by id
exports.updateWarehouseById = async (req, res, next) => {
    try {
        const warehouseUpdate = req.body;
        const id = req.params.id;

        const oldWarehouse = await Warehouse.findById(id);

        if (oldWarehouse) {
            await Warehouse.findByIdAndUpdate(id, warehouseUpdate, { new: true, runValidators: true })
            .then((newWarehouse) => {
                return res.status(200).json(newWarehouse);
            });
        } else {
            return res.status(404).send(`Warehouse with ID ${id} not found`);
        }
    }
    catch (error) {
        next(error);
    }
}

// delete warehouse by id
exports.deleteWarehouseById = async (req, res) => {
    try {
        const id = req.params.id;
        let warehouse = await Warehouse.findById(id);

        if (warehouse) {
            // set all matching items' warehouse id's to null
            await Item.updateMany({ warehouse_id: id }, { warehouse_id: null },)

            await Warehouse.findByIdAndDelete(id).then(() => {
                return res.status(204).send();
            });
        } else {
            return res.status(404).send(`Warehouse with ID ${id} not found`);
        }
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
}