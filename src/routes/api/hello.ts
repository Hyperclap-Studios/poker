import {Router} from "express";

const hello = Router();

hello.get('/', (_req, res) => {
    res.json({
        success: true,
        message: 'Hello World!',
    });
});

export default hello;