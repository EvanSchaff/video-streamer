import { app } from './express/expressServer';
import http from 'http';
import { setupWebSocket } from './websocket/webSocketServer';
import { initializeDB } from './db/initializeDB';




const server = http.createServer(app);
setupWebSocket(server);

const PORT = process.env.PORT || 3000;

(async () => {
    console.log('test');
    await initializeDB();
})();

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});