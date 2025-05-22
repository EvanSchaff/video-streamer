import { Server, Socket } from 'socket.io';
import { WebSocketEvents } from './events';

export function setupWebSocketHandlers(io: Server) {
    io.on(WebSocketEvents.CONNECTION, (socket: Socket & { handshake: any }) => {
        const request = socket.request as any;
        const user = request.session?.passport?.user;
        if (!user) {
            console.log('User logged in as guest');
        } else {
            console.log('User logged in as ', user.username);
            console.log(user);
        }
        socket.on(WebSocketEvents.MESSAGE, (msg) => {
            if (!user) {
                return;
            }
            msg.username = user.username;
            console.log(msg);
            socket.broadcast.emit(WebSocketEvents.MESSAGE, msg);
        });
        socket.on(WebSocketEvents.DISCONNECT, () => {
            console.log('User Disconnected');

        })

    });
}