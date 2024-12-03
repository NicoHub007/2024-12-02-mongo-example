import express from 'express';
import { ObjectId } from 'mongodb';
import db from '../db/conn.mjs';

const router = express.Router();

router.get('/', async (req, res) => {
    let collection = await db.collection('grades');

    let results = await collection.find({}).limit(50).toArray();

    if (!results) res.send('not found').status(404);
    else res.send(results).status(200);
})

export default router;