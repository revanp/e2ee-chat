import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message);

        console.log('Received: ', data);

        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        })
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log("WebSocket server running on ws://localhost:8080");