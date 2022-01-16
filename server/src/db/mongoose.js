const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB,
    {   
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }
)
.then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.log("Could not connect to database...", err);
        // process.exit();
    });