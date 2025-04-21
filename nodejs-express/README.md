#Development Mode
+ npm run dev

#API Documentation
+ http://localhost:3000/api-docs​

#Endpoints
+ GET /products: Retrieve all products.
+ POST /products: Create a new product:
  + Request Body:
  {
    "name": "Product Name",
    "price": 99.99
  }

#Project Structure
```
product-api/
├── src/
│   ├── config            # Config variables
│   ├── controllers       # Controllers of app
│   ├── database          # Setup database
│   ├── middlewares       # Middleware
│   ├── routes            # Routes of app
│   ├── services          # Services work with db
│   ├── swaggers          # Swagger documentation setup
│   ├── utils             # Helper methods
│   └── app.ts            # Init, config for app
│   └── index.ts          # Entry point of the application
├── package.json          # Project metadata and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
```
