const { MongoClient, ServerApiVersion } = require('mongodb');

if (!process.env.MONGO_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGO_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to preserve the client across module reloads.
  global.mongoClient = global.mongoClient || new MongoClient(uri, options);
  client = global.mongoClient;
} else {
  // In production mode, create a new client instance for each connection.
  client = new MongoClient(uri, options);
}

// Export the MongoClient instance
module.exports = client;