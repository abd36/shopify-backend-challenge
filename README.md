# Shopify Backend Developer Intern Challenge - Summer 2022

Check out the project [here](https://priceless-wing-4b01ed.netlify.app/item/index)!

This README contains an overview of my implementation of the challenge.

## TL;DR

This project is a simple CRUD application called Logistify, the extra feature I implemented is the functionality to delete items with an optional comment, and restore them. You can also permanently delete items that have already been "deleted".

#### List of Extra Features

- Delete items with an optional comment
- Restore "deleted" items
- Permanently delete "deleted" items
- Unit testing with Jest and Supertest

## Technologies

Click on any of the following technologies to view relevant documentation:

- [Node.js](https://nodejs.org/en/docs/), for server-side programming
- [Express](https://expressjs.com/en/api.html), for API routing
- [MongoDB](https://docs.mongodb.com/), for NoSQL database management
- [Heroku](https://devcenter.heroku.com/categories/reference), for backend hosting
- [Jest](https://jestjs.io/docs/getting-started) and [Supertest](https://www.npmjs.com/package/supertest), for unit testing
- [Angular](https://angular.io/docs), for frontend design
- [Netlify](https://docs.netlify.com/), for frontend hosting

## Instructions

To view this application on your local machine instead of viewing the [live site](https://priceless-wing-4b01ed.netlify.app/item/index), follow these steps:

1. Clone this repository locally
2. Install/update Node.js and NPM
3. In the server folder, create a file called ".env" (/server/.env)
4. Copy/paste the following 2 lines into server/.env:

`PORT=3000`

`MONGODB=mongodb+srv://admin:admin@cluster0.brnas.mongodb.net/db?retryWrites=true&w=majority`

5. Open a terminal in the server folder and enter the commands:

    `$ npm install`
    
    `$ npm run dev`

6. In /frontend/src/app/item/item.service.ts, change line 15 to:

    `private apiURL: string = "localhost:3000/api/items/";`


6. Open a new terminal in the frontend folder and enter the command: `$ npm start`


To run unit tests on the backend:

1. In /server/src/models/item.js, change line 47 to:

`module.exports = mongoose.model("Item", ItemSchema, "test_items");`

2. Open a terminal in the server folder and enter the command: `$ npm test` 

3. Change line 47 in /server/src/models/item.js back to:

`module.exports = mongoose.model("Item", ItemSchema, "items");`

### Unit testing

The backend has 8 unit tests using Jest and Supertest which verify expected responses for various inputs into the 6 API endpoints.
These tests evaluate the CRUD functionality, response status codes, and the cloud MongoDB instance.
