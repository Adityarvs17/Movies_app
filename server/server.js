import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import ConnectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express';
import { serve } from 'inngest/express';
import { inngest, functions } from './ingest/index.js';

const app= express();
const port=3000;
await ConnectDB();
app.use(cors(),clerkMiddleware());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/api/inngest', serve({client:inngest, functions}));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});