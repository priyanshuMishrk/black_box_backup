import { io } from 'socket.io-client';
import { BaseUrl } from './Context/AuthContext';
 // Replace with your server URL

// Create and export a singleton instance of Socket.IO
const SOCKET_URL = "wss://blackboxnow.com"; // Secure WebSocket
// const SOCKET_URL = "http://localhost:3001"
const socket = io(SOCKET_URL, {
    transports: ['websocket'],
    // secure: true,
    autoConnect: false,
});

export default socket;

