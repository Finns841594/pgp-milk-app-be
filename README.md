## Backend for my [Milk App](https://github.com/Finns841594/pgp-five-milk-app)

### Usage

#### Prerequisites

Just run `npm install` and then `npm start` to start the server. You can also run `npm run dev` to start the server in development mode.

#### Endpoints

This is backend for my [Milk App](https://github.com/Finns841594/pgp-five-milk-app) project as a test. It is a simple API with the following endpoints:

- `GET /api/milks` - returns all milk products
- `GET /api/milks/id/:id` - returns a single milk product
- `GET /api/milks/types` - returns all milk types
- `GET /api/milks/types/:type` - returns all milk in one type
- `GET /api/milks/search?q=example query` - returns all milk with keyword in name

you can always add `page={number}` to get the specific page of results.

#### Database

It is using a mock database which store in file `database.ts`. Restart the server will restore the data. So no `POST` endpoints for this project because it is not necessary.

#### Testing

Run `npm test` to run the tests. It is using `jest` and `supertest` to test the endpoints.

