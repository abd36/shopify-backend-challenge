const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const itemsRouter = require("./routers/itemRouter");

function createServer() {
    const app = express();

    app.use(helmet())
    app.use(cors({ "origin": "*" }));
    app.use(express.json());

    app.use("/api/items", itemsRouter);

    return app;
}

module.exports = createServer;