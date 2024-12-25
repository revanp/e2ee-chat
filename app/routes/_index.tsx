import type { MetaFunction } from "@remix-run/node";
import { useEffect, useRef, useState } from "react";
import { decryptMessage, encryptMessage, generateKeyPair } from "~/utils/crypto";
import { connectWebSocket } from "~/utils/websocket";

export const meta: MetaFunction = () => {
  return [
    { title: "E2EE Chat" },
  ];
};

export default function Index() {
  const [messages, setMessage] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    const setupSocket = async () => {
      if (socket.current) return;

      const { publicKey, privateKey }  = await generateKeyPair();
      const sharedKey = new Uint8Array(32); // Use a consistent key for encryption and decryption

      const ws = connectWebSocket(async (data) => {
        console.log(`Received: ${JSON.stringify(data)}`);
        if (data.ciphertext) {
          const { ciphertext, nonce } = data;
          const decryptedMessage = await decryptMessage(
            new Uint8Array(Object.values(ciphertext)),
            new Uint8Array(Object.values(nonce)),
            sharedKey
          );

          setMessage((prev) => [...prev, decryptedMessage]);
        }
      });

      socket.current = ws;
    }

    setupSocket();

    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, []);

  const sendMessage = async () => {
    if(!socket.current) {
      return;
    }

    const sharedKey = new Uint8Array(32);
    const { ciphertext, nonce } = await encryptMessage(input, sharedKey);

    socket.current.send(JSON.stringify({ ciphertext, nonce }));
    setInput('');
  }

  return (
    <div className="flex flex-col h-screen bg-base-200 text-base-content">
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className="chat chat-start">
              <div className="chat-bubble">{msg}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-base-300 flex gap-2 items-center">
        <input
          className="input input-bordered w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          className="btn btn-primary"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}