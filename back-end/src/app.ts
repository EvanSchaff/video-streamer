import { app } from './express/expressServer';
import { nmsStart } from './nms/nmsServer';
import http from 'http';
import { setupWebSocket } from './websocket/webSocketServer';




const server = http.createServer(app);
setupWebSocket(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});