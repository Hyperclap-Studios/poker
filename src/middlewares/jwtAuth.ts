import express from "express";
import {verify} from "jsonwebtoken";

const jwtAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (process.env.JWT_SECRET) {
        const splitAuth = req.headers.authorization?.split(' ');

        if (!splitAuth || splitAuth.length !== 2) {
            return res.status(400).json({
                success: false,
                message: 'No token provided or invalid token format.'
            });
        }

        const tokenType = splitAuth[0];
        const token = splitAuth[1];

        switch (tokenType) {
            case 'Bearer':
                const payload = verify(token, process.env.JWT_SECRET);
                if (payload) {
                    res.locals.user = payload;
                    return next();
                } else {
                    return res.status(401).json({
                        success: false,
                        error: 'Invalid token.'
                    });
                }
        }
    } else {
        return res.status(500).json({
            success: false,
            error: 'JWT_SECRET not set.'
        });
    }
};

export default jwtAuth;