import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import connectDB from './config/mongodb.js';
import clerkWebhooks from './controllers/webhooks.js';

//initialize express
const app = express();
// connect to database
await connectDB();

//middlewares
app.use(cors());
//Routes 
app.get('/', (req, res) => 
    {
    res.send('Api is running...');
    })

app.post(
  "/api/webhooks/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhooks
);

// Normal JSON for rest of app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 //port
const PORT = process.env.PORT || 5000;

//listen 

app.listen(PORT, () => 
    console.log(`Server running on port ${PORT}`));