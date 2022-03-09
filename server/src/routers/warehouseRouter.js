const express = require("express");
const WarehouseService = require("../services/warehouseService");
const warehouseRouter = express.Router();

// create warehouse
warehouseRouter.post("/", WarehouseService.createWarehouse);

module.exports = warehouseRouter;