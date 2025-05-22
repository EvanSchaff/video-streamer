import { Server } from 'socket.io';
import { setupWebSocketHandlers } from './handlers';
import passport from '../express/auth/passport';


export function setupWebSocket(httpServer: any, sessionMiddleware: any) {
    const io = new Server(httpServer, { cors: { origin: '*' } });


    //Middleware for session and passport
    io.use((socket, next) => {
        sessionMiddleware(socket.request as any, {} as any, () => {
            passport.initialize()(socket.request as any, {} as any, () => {
                passport.session()(socket.request as any, {} as any, next);
            });
        });
    });

    setupWebSocketHandlers(io);
    return io;
}