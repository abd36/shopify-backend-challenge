// External modules

require("dotenv").config();
require("./db/mongoose");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const itemsRouter = require("./routers/itemRouter");

// App variables

const PORT = process.env.PORT
const app = express();

// App configuration

app.use(helmet())
app.use(cors({ "origin": "*" }));
app.use(express.json());

app.use("/api/items", itemsRouter);

// Activate app

app.listen(PORT, (req, res) => {
    console.log(`Listening at port ${PORT}`);
});
