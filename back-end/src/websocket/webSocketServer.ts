import { Server } from 'socket.io';
import { setupWebSocketHandlers } from './handlers';


export function setupWebSocket(httpServer: any) {
    const io = new Server(httpServer, { cors: { origin: '*' } });
    setupWebSocketHandlers(io);
    return io;
}