require("dotenv").config();
const mongoose = require("mongoose");
const createServer = require("../server");
const Warehouse = require("../models/warehouse");
const supertest = require('supertest');

// run before each test
beforeEach((done) => {
    // connect to mongodb
    mongoose.connect(process.env.MONGODB, { useNewUrlParser: true })
        .then(() => {
            done();
        })
        .catch((err) => {
            console.log("Could not connect to database...", err);
            process.exit();
        });
});

// run after each test
afterEach((done) => {
    // drop warehouse collection
    Warehouse.collection.drop(() => {
        // close mongodb connection
        mongoose.connection.close(() => { done(); })
    });
});

// setup server
const app = createServer();


// tests

// get all warehouses
test("GET /", async () => {
    const warehouses = await Warehouse.insertMany([
        {
            name: "toronto",
            address: "620 King St W, Toronto, ON M5V 1M6"
        },
        {
            name: "ottawa",
            address: "150 Elgin Street, Ottawa, ON, Canada K2P 1L4"
        }
    ]);

    await supertest(app)
        .get("/api/warehouses")
        .expect(200)
        .then((res) => {
            // check the response type and length
            expect(Array.isArray(res.body)).toBeTruthy();
            expect(res.body.length).toEqual(2);

            // check the response data
            expect(res.body[0]._id).toBe(warehouses[0].id);
            expect(res.body[0].name).toBe(warehouses[0].name);
            expect(res.body[0].address).toBe(warehouses[0].address);
            expect(res.body[1]._id).toBe(warehouses[1].id);
            expect(res.body[1].name).toBe(warehouses[1].name);
            expect(res.body[1].address).toBe(warehouses[1].address);
        });
});

// get warehouse
test("GET /:id", async () => {
    const warehouses = await Warehouse.insertMany([
        {
            name: "toronto",
            address: "620 King St W, Toronto, ON M5V 1M6"
        },
        {
            name: "ottawa",
            address: "150 Elgin Street, Ottawa, ON, Canada K2P 1L4"
        }
    ]);

    await supertest(app)
        .get("/api/warehouses/" + warehouses[1].id)
        .expect(200)
        .then((res) => {
            // check the response data
            expect(res.body._id).toBe(warehouses[1].id);
            expect(res.body.name).toBe(warehouses[1].name);
            expect(res.body.address).toBe(warehouses[1].address);
        });
});

// create warehouse
test("POST /", async () => {
    const data = {
        name: "toronto",
        address: "620 King St W, Toronto, ON M5V 1M6"
    };

    await supertest(app)
        .post("/api/warehouses")
        .send(data)
        .expect(201)
        .then(async (res) => {
            // check the response
            expect(res.body._id).toBeTruthy();
            expect(res.body.name).toBe(data.name);
            expect(res.body.address).toBe(data.address);

            // check item in the database
            const warehouse = await Warehouse.findById(res.body._id);
            expect(warehouse).toBeTruthy();
            expect(warehouse.name).toBe(data.name);
            expect(warehouse.address).toBe(data.address);
        });
});

// update warehouse
test("PUT /:id", async () => {
    const warehouse = await Warehouse.create({
        name: "toronto",
        address: "620 King St W, Toronto, ON M5V 1M6"
    });

    const data = {
        name: "ottawa",
        address: "150 Elgin Street, Ottawa, ON, Canada K2P 1L4"
    };

    await supertest(app)
        .put("/api/warehouses/" + warehouse.id)
        .send(data)
        .expect(200)
        .then(async (res) => {
            // check the response
			expect(res.body._id).toBe(warehouse.id);
			expect(res.body.name).toBe(data.name);
			expect(res.body.address).toBe(data.address);

			// Check the data in the database
			const updatedItem = await Warehouse.findById(res.body._id);
			expect(updatedItem).toBeTruthy();
			expect(updatedItem.name).toBe(data.name);
			expect(updatedItem.address).toBe(data.address);
        });
});

// delete warehouse
test("DELETE /:id", async () => {
    const warehouse = await Warehouse.create({
        name: "toronto",
        address: "620 King St W, Toronto, ON M5V 1M6"
    });

    await supertest(app)
        .delete("/api/warehouses/" + warehouse.id)
        .expect(204)
        .then(async () => {
            expect(await Warehouse.findById(warehouse.id)).toBeFalsy();
        });
});