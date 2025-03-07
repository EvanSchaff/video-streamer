import { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';

dotenv.config();

export function ipFilter(req: Request, res: Response, next: NextFunction) {
    let reqIp = req.ip || req.socket.remoteAddress;
    const allowedIP = process.env.NGINX_RTMP_IP

    if (reqIp.startsWith('::ffff:')) {
        reqIp = reqIp.substring(7);
    }

    if (reqIp !== allowedIP) {
        console.log(reqIp);
        console.log(process.env.NGINX_RTMP_IP);
        console.log('Unauthorized: IP address not allowed');
        res.status(403).send('Unauthorized: IP address not allowed');
        return;
    }
    next();

}