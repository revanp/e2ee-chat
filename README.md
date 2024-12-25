# E2EE Chat

E2EE Chat is an end-to-end encrypted chat application built with Remix, WebSockets, and libsodium for encryption. This project demonstrates how to create a secure chat application where messages are encrypted on the client side and decrypted on the client side, ensuring that the server cannot read the messages.

## Features

- End-to-end encryption using libsodium
- Real-time messaging with WebSockets
- Modern UI with DaisyUI

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- pnpm

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/e2e-chat.git
   cd e2e-chat
   ```

2. Install dependencies:

   ```sh
   pnpm install
   ```

### Running the Application

1. Start the WebSocket server:

   ```sh
   node server/ws.js
   ```

2. Start the Remix development server:

   ```sh
   pnpm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`.

### Project Structure

- `app/routes/_index.tsx`: The main chat interface.
- `app/utils/crypto.ts`: Utility functions for encryption and decryption using libsodium.
- `app/utils/websocket.ts`: Utility function to connect to the WebSocket server.
- `server/ws.js`: WebSocket server implementation.

### How It Works

1. When the client connects to the WebSocket server, it generates a key pair using `libsodium`.
2. Messages are encrypted on the client side using a shared key and sent to the server.
3. The server broadcasts the encrypted messages to all connected clients.
4. Clients decrypt the received messages using the shared key.
