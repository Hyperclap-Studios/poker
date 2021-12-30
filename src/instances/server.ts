import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import pinoHttp from 'pino-http';
import api from "../routes/api";

// Initialize
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(pinoHttp({
    prettyPrint: true,
    level: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'warn' : 'debug'),
    redact: ['req.headers.authorization']
}));
app.use('/api', api);

// Serve Frontend
// app.get('*', (_req, res) => {
//     res.sendFile(path.resolve(`${__dirname}/../../client/build/index.html`));
// });

export {app};