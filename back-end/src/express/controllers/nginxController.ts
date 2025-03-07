import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { StateManager } from '../../managers/stateManager';

dotenv.config();
const stateManager = StateManager.getInstance();

export async function authenticateKey(req: Request, res: Response) {
    const streamKey = req.body.name;
    console.log(req.body);
    if (streamKey === process.env.STREAM_KEY) {
        try {
            stateManager.addStream(streamKey);
        } catch (err) {
            console.log('Unauthorized: Stream already active');
            res.status(400).send('Unauthorized: Stream already active');
            return;
        }
        console.log('Authenticated');
        res.status(200).send('Authenticated');
    }
    else {
        console.log('Unauthorized: Stream key invalid');
        res.status(400).send('Unauthorized: Stream key invalid');
    }
}

export async function updateEndStream(req: Request, res: Response) {
    const streamKey = req.body.name;
    if (stateManager.isStreamActive(streamKey)) {
        try {
            stateManager.removeStream(streamKey)
        } catch (err) {
            console.log('Stream state error: Stream not active');
        }
        console.log('Stream ended');
    }
    res.status(200).send('Stream ended');
}