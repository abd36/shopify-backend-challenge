// External modules
require("dotenv").config();
require("./db/mongoose");
const createServer = require("./server");

// App variables
const PORT = process.env.PORT
const app = createServer();

// Activate app
app.listen(PORT, (req, res) => {
    console.log(`Listening at port ${PORT}`);
});
