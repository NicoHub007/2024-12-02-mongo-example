import express from 'express';
import { ObjectId } from 'mongodb';
import db from '../db/conn.mjs';

const router = express.Router();

// Full CRUD functionality
// C - Create   - Post
// R - Read     - Get
// U - Update   - Put/Patch
// D - Delete   - Delete

// For read, we usually do an index route and a show route
//  Index displays or gets many db items
//  Show displays one, usually based on the id

//  -------------------------------------------------------------------------------
//              ALL ROUTES
//  -------------------------------------------------------------------------------
// all of these routes start with base url /api/grades

// ========== post implements CREATE functionality ==========
router.post('/', async (req, res) => {
    let collection = await db.collection('grades');

    // in order to use this, I need to add middleware to my index.mjs
    // we don't have a frontend, so we need to use a tool to test this
    //      the tool that we are going to use is Postman
    // use 'raw' and 'json' in the body of postman to test this
    let newDocument = req.body;
    // this is verifying that the body is coming from Postman
    console.log(newDocument);

    let result = await collection.insertOne(newDocument);
    if (!result) res.send('not created').status(500);
    else res.send(result).status(201);
})

// ========== Get implements READ functionality ==========
//      we want to be careful with this get route
//          because it could be a huge amount of data
//      that is why we limit to 50 in this example
//          if you wanted to either use pagination or 
//          somehow iterate through, you might combine limit(n) and skip(m)
// ===== make sure that you are using async-await
// because db access requests are asynchronous, but we need that data
// before we move on
router.get('/', async (req, res) => {
    let collection = await db.collection('grades');

    let results = await collection.find({}).limit(50).toArray();

    if (!results) res.send('not found').status(404);
    else res.send(results).status(200);
})

// The show route is READ, but limiting to a specific entry
// in this case, we'll use id to get a specific grades entry
router.get('/:id', async (req, res) => {
    // in the connection, remember that we have already accessed the sample training db
    // now we are going to access the 'grades' collection in that db
    let collection = await db.collection('grades');

    // define the query
    // in this, we are searching for a specific id
    let query;
    try {
        query = { _id: new ObjectId(req.params.id) };
        let result = await collection.findOne(query);

        if (!result) res.send('not found').status(404);
        else res.send(result).status(200);
    } catch (err) {
        res.send('not an id').status(400);
    }
    // console.log(query)

})

// what if we want all of the grade entries for a given student?
// GET route for a student
//  I am adding /student to the url to differentiate between a route that 
//      returns a specific grades entry versus all of the entries for a specific student
router.get('/student/:student_id', async (req, res) => {
    let collection = await db.collection('grades');

    // I'm using Number() because the parameter is going to be a string for the url
    // but the id that I'm looking for is a number
    let query = { student_id: Number(req.params.student_id) }
    console.log(query);

    // why is this an array?
    let results = await collection.find(query).toArray();

    if (!results) res.send('not found').status(404);
    else res.send(results).status(200);
})
export default router;