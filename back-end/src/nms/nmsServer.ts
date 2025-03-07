import NodeMediaServer from 'node-media-server';
import { config } from './config';

const nms = new NodeMediaServer(config);

export const nmsStart = () => nms.run();
export const nmsStop = () => nms.stop();