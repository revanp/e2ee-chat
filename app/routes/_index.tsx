import type { MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import { generateKeyPair } from "~/utils/crypto";

export const meta: MetaFunction = () => {
  return [
    { title: "E2EE Chat" },
  ];
};

export default function Index() {
  const [messages, setMessage] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const setupSocket = async () => {
      const { publicKey, privateKey }  = await generateKeyPair();

      console.log('Public', publicKey);
      console.log('Private', privateKey);
    }

    setupSocket();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100 text-gray-900">
      <div>
        
      </div>

      <div className="p-4 bg-gray-200 flex gap-2">
        <input
          className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}