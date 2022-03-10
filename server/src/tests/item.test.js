require("dotenv").config();
const mongoose = require("mongoose");
const createServer = require("../server");
const Item = require("../models/item");
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
    // drop items collection
    Item.collection.drop(() => {
        // close mongodb connection
        mongoose.connection.close(() => { done(); })
    });
});

// setup server
const app = createServer();


// tests

// get all nondeleted items
test("GET /", async () => {
    const items = await Item.insertMany([
        {
            name: "test item",
            quantity: 1,
            price: 1
        },
        {
            name: "test item two",
            quantity: 10,
            price: 150,
            deleted: true,
            deletedMessage: "a message"
        },
    ]);

    await supertest(app)
        .get("/api/items")
        .expect(200)
        .then((res) => {
            // check the response type and length
            expect(Array.isArray(res.body)).toBeTruthy();
            expect(res.body.length).toEqual(1);

            // check the response data
            expect(res.body[0]._id).toBe(items[0].id);
            expect(res.body[0].name).toBe(items[0].name);
            expect(res.body[0].quantity).toBe(items[0].quantity);
            expect(res.body[0].deleted).toBe(items[0].deleted);
            expect(res.body[0].deletedMessage).toBe(items[0].deletedMessage);
        });
});

// get items flagged as deleted
test("GET /deleted", async () => {
    const items = await Item.insertMany([
        {
            name: "test item",
            quantity: 1,
            price: 1
        },
        {
            name: "test item two",
            quantity: 10,
            price: 150,
            deleted: true,
            deletedMessage: "message"
        },
    ]);
    
    await supertest(app)
        .get("/api/items/deleted")
        .expect(200)
        .then((res) => {
            // check the response type and length
            expect(Array.isArray(res.body)).toBeTruthy();
            expect(res.body.length).toEqual(1);
            
            // check the response data
            expect(res.body[0]._id).toBe(items[1].id);
            expect(res.body[0].name).toBe(items[1].name);
            expect(res.body[0].quantity).toBe(items[1].quantity);
            expect(res.body[0].deleted).toBe(items[1].deleted);
            expect(res.body[0].deletedMessage).toBe(items[1].deletedMessage);
        });
});

// create item
test("POST /", async () => {
    const data = {
        name: "test item",
        quantity: 10,
        price: 11,
    };

    await supertest(app)
        .post("/api/items")
        .send(data)
        .expect(201)
        .then(async (res) => {
            // check the response
            expect(res.body._id).toBeTruthy();
            expect(res.body.name).toBe(data.name);
            expect(res.body.quantity).toBe(data.quantity);
            expect(res.body.price).toBe(data.price);
            expect(res.body.deleted).toBe(false);
            expect(res.body.deletedMessage).toBe("");

            // check item in the database
            const item = await Item.findById(res.body._id);
            expect(item).toBeTruthy();
            expect(item.name).toBe(data.name);
            expect(item.quantity).toBe(data.quantity);
            expect(item.price).toBe(data.price);
            expect(item.deleted).toBe(false);
            expect(item.deletedMessage).toBe("");
        });
});

// update item
test("PUT /:id", async () => {
    const item = await Item.create({
        name: "test item",
        quantity: 1,
        price: 1
    });

    const data = {
        name: "updated test item",
        quantity: 10,
        price: 10
    };

    await supertest(app)
        .put("/api/items/" + item.id)
        .send(data)
        .expect(200)
        .then(async (res) => {
            // check the response
			expect(res.body._id).toBe(item.id);
			expect(res.body.name).toBe(data.name);
			expect(res.body.quantity).toBe(data.quantity);
            expect(res.body.price).toBe(data.price);

			// Check the data in the database
			const updatedItem = await Item.findById(res.body._id);
			expect(updatedItem).toBeTruthy();
			expect(updatedItem.name).toBe(data.name);
			expect(updatedItem.quantity).toBe(data.quantity);
            expect(updatedItem.price).toBe(data.price);
            expect(updatedItem.deleted).toBe(false);
            expect(updatedItem.deletedMessage).toBe("");
        });
});

// "delete" item (set deleted flag to true)
test("PUT /:id", async () => {
    const item = await Item.create({
        name: "test item",
        quantity: 1,
        price: 1
    });

    const data = {
        deleted: true,
        deletedMessage: "message"
    };

    await supertest(app)
        .put("/api/items/" + item.id)
        .send(data)
        .expect(200)
        .then(async (res) => {
            // check the response
			expect(res.body._id).toBe(item.id);
            expect(res.body.deleted).toBe(data.deleted);
            expect(res.body.deletedMessage).toBe(data.deletedMessage);

			// Check the data in the database
			const deletedItem = await Item.findById(res.body._id);
			expect(deletedItem).toBeTruthy();
            expect(deletedItem.name).toBe(item.name);
            expect(deletedItem.quantity).toBe(item.quantity);
            expect(deletedItem.price).toBe(item.price);
            expect(deletedItem.deleted).toBe(data.deleted);
            expect(deletedItem.deletedMessage).toBe(data.deletedMessage);
        });
});

// undelete item
test("PUT /:id", async () => {
    const item = await Item.create({
        name: "test item",
        quantity: 1,
        price: 1,
        deleted: true,
        deletedMessage: "message"
    });

    const unDeleteData = {
        deleted: false,
        deletedMessage: ""
    };

    await supertest(app)
        .put("/api/items/" + item.id)
        .send(unDeleteData)
        .expect(200)
        .then(async (res) => {
            // check the response
			expect(res.body._id).toBe(item.id);
            expect(res.body.deleted).toBe(unDeleteData.deleted);
            expect(res.body.deletedMessage).toBe(unDeleteData.deletedMessage);

			// Check the data in the database
			const unDeletedItem = await Item.findById(res.body._id);
			expect(unDeletedItem).toBeTruthy();
            expect(unDeletedItem.name).toBe(item.name);
            expect(unDeletedItem.quantity).toBe(item.quantity);
            expect(unDeletedItem.price).toBe(item.price);
            expect(unDeletedItem.deleted).toBe(unDeleteData.deleted);
            expect(unDeletedItem.deletedMessage).toBe(unDeleteData.deletedMessage);
        });
});

// permanently delete item flagged as deleted
test("DELETE /:id", async () => {
    const item = await Item.create({
        name: "test item",
        quantity: 1,
        price: 1,
        deleted: true,
        deletedMessage: "message"
    });

    await supertest(app)
        .delete("/api/items/" + item.id)
        .expect(204)
        .then(async () => {
            expect(await Item.findById(item.id)).toBeFalsy();
        });
});

// delete request fail for item not flagged as deleted
test("DELETE /:id", async () => {
    const item = await Item.create({
        name: "test item",
        quantity: 1,
        price: 1
    });

    await supertest(app)
        .delete("/api/items/" + item.id)
        .expect(400) // bad request
        .then(async () => {
            expect(await Item.findById(item.id)).toBeTruthy();
        });
});
