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

// The show route is READ,but limiting to a specific entry
// in this case, we'll use id to get a specific grades entry
router.get('/:id', async (req, res) => {
    // in the connection, remember that we have already accessed the sample_training database
    // now we are going to access the "grades" collection in that db
    let collection = await db.collection('grades');

    // define the query
    // in this, we are searching for a specific id
    let query;
    try {
        query = { _id: new ObjectId(req.params.id) };
    } catch (err) {
        return res.send('Invalid id').status(400);
    }
    let result = await collection.findOne(query);

    if (!result) res.send('not found').status(404);
    else res.send(result).status(200);
})
//console.log(query);

export default router;