const express = require("express");
const Item = require("../models/item");
const itemsRouter = express.Router();
const ItemService = require("../services/itemService");

// get all items
itemsRouter.get("/", ItemService.findAllItems);

// update item by id
itemsRouter.put("/:id", ItemService.updateItemById);

// delete item by id
itemsRouter.delete("/:id", ItemService.deleteItemById);

// create item
itemsRouter.post("/", ItemService.createItem);


module.exports = itemsRouter;