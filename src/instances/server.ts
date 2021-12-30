import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import pino from 'pino';
import api from "../routes/api";

// Initialize
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(pino);
app.use('/api', api);

// Serve Frontend
// app.get('*', (_req, res) => {
//     res.sendFile(`${__dirname}/../../client/build/index.html`);
// });

export {app};