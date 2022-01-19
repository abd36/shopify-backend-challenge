const express = require("express");
const Item = require("../models/item");
const itemsRouter = express.Router();
const ItemService = require("../services/itemService");


// get all nondeleted items
itemsRouter.get("/", ItemService.findAllItems);

// get all deleted items
itemsRouter.get("/deleted", ItemService.findDeletedAllItems);

// get item by id
itemsRouter.get("/:id", ItemService.findItem);

// update item by id
itemsRouter.put("/:id", ItemService.updateItemById);

// delete item by id
itemsRouter.delete("/:id", ItemService.deleteItemById);

// create item
itemsRouter.post("/", ItemService.createItem);


module.exports = itemsRouter;