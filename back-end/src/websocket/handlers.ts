import { Server, Socket } from 'socket.io';
import { WebSocketEvents } from './events';

export function setupWebSocketHandlers(io: Server) {
    io.on(WebSocketEvents.CONNECTION, (socket: Socket) => {
        console.log('User Connected');
    });
    io.on(WebSocketEvents.DISCONNECT, (socket: Socket) => {
        console.log('User Disconnected');
    });
    io.on(WebSocketEvents.MESSAGE, (socket: Socket) => {
        console.log('Message Sent');
    });
}