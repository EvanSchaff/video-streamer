import { app, sessionSettings } from './express/expressServer';
import http from 'http';
import { setupWebSocket } from './websocket/webSocketServer';
import { initializeDB } from './db/initializeDB';




const server = http.createServer(app);
setupWebSocket(server, sessionSettings);

const PORT = process.env.PORT || 3000;

(async () => {
    await initializeDB();
})();

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});