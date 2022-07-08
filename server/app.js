import express from 'express';
import cors from 'cors';
import userRoute from './routes/user.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/user', userRoute);

export default app;
