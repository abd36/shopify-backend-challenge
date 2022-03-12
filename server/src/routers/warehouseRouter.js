const express = require("express");
const WarehouseService = require("../services/warehouseService");
const warehouseRouter = express.Router();

// create warehouse
warehouseRouter.post("/", WarehouseService.createWarehouse);

// get all warehouses
warehouseRouter.get("/", WarehouseService.getAllWarehouses);

// get a warehouse
warehouseRouter.get("/:id", WarehouseService.getWarehouseById);

// update warehouse
warehouseRouter.put("/:id", WarehouseService.updateWarehouseById);

// delete warehouse
warehouseRouter.delete("/:id", WarehouseService.deleteWarehouseById);

module.exports = warehouseRouter;