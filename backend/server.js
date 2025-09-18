const express = require("express");
const dotenv = require("dotenv");

const bodyparser = require("body-parser");

const cors = require("cors");

// or as an es module:
// import { MongoClient } from 'mongodb'
const { MongoClient } = require("mongodb");

// Load environment variables from .env file
dotenv.config();

// Connection URL
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

// Database Name
const dbName = "passop";

const app = express();
const port = 3000;

app.use(bodyparser.json());
app.use(cors());

// Use connect method to connect to the server
client.connect();

//get all password
app.get("/", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

// set a password
app.post("/", async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.insertOne(password);
  res.send({ sucess: true, result: findResult });
});

// delete a password
app.delete("/", async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.deleteOne(password);
  res.send({ sucess: true, result: findResult });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
