import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';

import postRouter from './routes/posts.js';

config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/posts', postRouter);

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connection to Database'));

app.listen(PORT, () => console.log('Server Started'));