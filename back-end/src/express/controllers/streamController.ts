import { Request, Response } from 'express';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();
let ffmpegProcess: ffmpeg.FfmpegCommand | null = null;

export async function startStream(req: Request, res: Response) {
    const videoPath = path.resolve(__dirname, '../../../videos/test.mp4');
    const rtmpUrl = `rtmp://localhost/live/${process.env.STREAM_KEY}`;

    // Check if the video file exists
    if (!fs.existsSync(videoPath)) {
        console.error(`Video file not found: ${videoPath}`);
        res.status(404).send('Video file not found');
        return;
    }

    console.log(`Starting stream from video: ${videoPath}`);
    console.log(`RTMP URL: ${rtmpUrl}`);

    ffmpegProcess = ffmpeg(videoPath)
        .inputOptions('-re')
        .outputOptions('-f', 'flv')
        .videoCodec('libx264')
        .audioCodec('aac')
        .output(rtmpUrl)
        .on('start', (commandLine) => {
            console.log('Streaming started with command:', commandLine);
            res.send('Streaming started');
        })
        .on('progress', (progress) => {
            console.log(`Streaming progress: ${progress.timemark} (${progress.frames} frames processed)`);
        })
        .on('stderr', (stderrLine) => {
            console.log(`FFmpeg stderr: ${stderrLine}`);
        })
        .on('end', () => {
            console.log('Streaming ended successfully');
            ffmpegProcess = null;
        })
        .on('error', (err) => {
            console.error('Error during streaming:', err.message);
            console.error('Stack trace:', err.stack);
            ffmpegProcess = null;
        });

    ffmpegProcess.run();
}

export async function endStream(req: Request, res: Response) {
    if (ffmpegProcess) {
        ffmpegProcess.kill('SIGINT');
        ffmpegProcess = null;
        res.send('Stream terminated');
    } else {
        res.status(400).send('No active stream');
    }
}