# Shopify Backend Developer Intern Challenge - Summer 2022

Check out the project [here](https://priceless-wing-4b01ed.netlify.app/item/index)!

This README contains an overview of my implementation of the challenge.

## TL;DR

This project is a simple CRUD application called Logistify, the extra feature I implemented is the functionality to delete items with an optional comment, and restore them. You can also permanently delete items that have already been "deleted".

#### List of Extra Features:

- Delete items with an optional comment
- Restore "deleted" items
- Permanently delete "deleted" items
- Unit testing with Jest and Supertest

**For the technical interview, I've added the functionality to create warehouses and assign items to them.**

#### List of Extra Extra Features:

- Create and delete warehouses
- Set item's warehouse
- Change item's warehouse
- Warehouse unit tests

## Technologies

Click on any of the following technologies to view relevant documentation:

- [Node.js](https://nodejs.org/en/docs/), for server-side programming
- [Express](https://expressjs.com/en/api.html), for API routing
- [MongoDB](https://docs.mongodb.com/), for NoSQL database management
- [Heroku](https://devcenter.heroku.com/categories/reference), for backend hosting
- [Jest](https://jestjs.io/docs/getting-started) and [Supertest](https://www.npmjs.com/package/supertest), for unit testing
- [Angular](https://angular.io/docs), for frontend design
- [Netlify](https://docs.netlify.com/), for frontend hosting

## Instructions to run locally

To view this application on your local machine instead of viewing the [live site](https://priceless-wing-4b01ed.netlify.app/item/index), follow these steps:

1. Clone this repository locally
2. Install/update Node.js and NPM
3. In the server folder, create a file called ".env" (/server/.env)
4. Copy/paste the following 2 lines into /server/.env:

    `PORT=3000`

    `MONGODB=mongodb+srv://admin:krVPIMWvJWHZkQOn@cluster0.brnas.mongodb.net/db?retryWrites=true&w=majority`

5. Open a terminal in the /server folder and enter the commands:

    `$ npm install`
    
    `$ npm run dev`

6. In /frontend/src/app/item/item.service.ts:
    1. Comment out line 15
    2. Uncomment line 16

7. In /frontend/src/app/warehouse/warehouse.service.ts:
    1. Comment out line 14
    2. Uncomment line 15

8. Open a new terminal in the /frontend folder and enter commands: 

    `$ npm install`
    
    `$ npm start`


## Unit tests

The backend uses Jest and Supertest for to unit test the item and warehouse API endpoints. There are 13 unit tests for item APIs, and 7 unit tests for warehouse APIs. These tests evaluate the CRUD functionality, response status codes, and the cloud MongoDB instance.

### To run unit tests:

1. In /server/src/models/item.js, change line 58 (the last line) to:

    `module.exports = mongoose.model("Item", ItemSchema, "test_items");`
    
2. In /server/src/models/warehouse.js, change line 26 (the last line) to:

    `module.exports = mongoose.model("Warehouse", WarehouseSchema, "test_warehouses");`

3. Open a terminal in the /server folder and enter the command:

    `$ npm test` 

4. Change line 58 in /server/src/models/item.js back to:

    `module.exports = mongoose.model("Item", ItemSchema, "items");`
    
5. Change line 26 in /server/src/models/warehouse.js back to:

    `module.exports = mongoose.model("Warehouse", WarehouseSchema, "warehouses");`
