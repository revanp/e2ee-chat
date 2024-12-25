export function connectWebSocket(onMessage: (data: unknown) => void) {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => console.log("WebSocket connected!");
    socket.onerror = (error) => console.error("WebSocket error:", error);

    socket.onmessage = (event) => {
        console.log("Received from server:", event.data);

        onMessage(JSON.parse(event.data));
    }
    
    return socket;
}