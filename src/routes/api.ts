import {Router} from "express";
import hello from "./api/hello";

const api = Router();

api.use('/hello', hello);

export default api;