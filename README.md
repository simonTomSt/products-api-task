# Products Simple API

![Current Version](https://img.shields.io/badge/version-1.0.0-green.svg)

This is an Express.js simple products api.

## Features

- Getting products list
- Getting product by id
- Creating product
- Updating product
- Deleting product

## Setup

Clone this repo to your desktop and run `npm install` in the root directory, to install all the dependencies.

You need to create the `.env` file based on `.env.example` file.

Next run `npm run typeorm migration:run` to init database properly.

---

## Usage

Run `npm run dev` to run application in development mode. App will listen on port provided in `.env` file - `PORT`

The documentation of the API (swagger) is available under `http://localhost:{PORT}/api-docs`.

You can test the api using for example [Insomnia](https://insomnia.rest/download) or [Postman](https://www.postman.com/downloads/).

There are five endpoint specified:

- `GET http://localhost:{PORT}/products`
- `POST http://localhost:{PORT}/products`
- `GET http://localhost:{PORT}/products/{productId}`
- `PATCH http://localhost:{PORT}/products/{productId}`
- `DELETE http://localhost:{PORT}/products/{productId}`

## Tech stack

- Express.js
- Typescript
- Inversify
- inversify-express-utils
- reflect-metadata
- sqlite3
- typeorm
- dotenv
- morgan
- express-validator
