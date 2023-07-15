import { io } from 'socket.io-client';

export const socket = io('http://localhost:8800');
export let sock;
export const connectSocket = () => {
  console.log('socket intializations');
  // socketClient.connect('http://localhost:5000/', {});
  socket.on('connect', (so) => {
    console.log('Socket conected '); // "G5p5..."
    sock = so;
  });
};
