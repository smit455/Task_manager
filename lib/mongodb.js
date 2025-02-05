import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

const options = {};

let client = new MongoClient(uri, options);
let clientPromise = client.connect();

export default clientPromise;
