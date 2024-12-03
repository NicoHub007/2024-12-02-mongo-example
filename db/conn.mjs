// This is where I connect to my mongoDB
//  remember that is hosted outside of my computer
import { MongoClient } from 'mongodb';
// this is allowing me to access the things that are in the .env
// file - so that i can use sensitive information in my application
// but not upload it to github
import dotenv from 'dotenv';
dotenv.config();

// this is creating a new mongoDBclient
// we are accessing our .env file (process.env)
// we are trying to access ATLAS_URI
// make sure this is in your .env
const client = new MongoClient(process.env.ATLAS_URI);

let conn;
try {
    conn = await client.connect();
    console.log('connected');
} catch (err) {
    console.log(err);
}

// we are accessing the sample training database in the mongoDB compass sample data
let db = conn.db('sample_training');

export default db;