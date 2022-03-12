const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const itemsRouter = require("./routers/itemRouter");
const warehouseRouter = require("./routers/warehouseRouter");
const errorHandler = require("./services/errorHandler");

function createServer() {
    const app = express();

    app.use(helmet())
    app.use(cors({ "origin": "*" }));
    app.use(express.json());

    app.use("/api/items", itemsRouter);
    app.use("/api/warehouses", warehouseRouter);

    app.use(errorHandler);

    return app;
}

module.exports = createServer;