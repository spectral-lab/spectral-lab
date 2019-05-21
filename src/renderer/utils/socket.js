// @ts-nocheck
import io from 'socket.io-client';
import eventHub from './eventHub';
import { RECEIVED_PWT } from '../constants/events';

const socketServerPort = new URL(document.location).searchParams.get('port');
const socket = io(`http://localhost:${socketServerPort}`);

socket.on('connect', () => {
  console.log(`connected with your M4L! at ${socketServerPort}`);
});

socket.on('broadcast', msg => {
  if (msg === 'CLOSE') {
    window.close();
  }
});

socket.on('disconnect', () => {
  window.close();
});

eventHub.$on(RECEIVED_PWT, pwt => {
  socket.emit('pwt', pwt);
  console.log('sent pwt');
  console.log(pwt);
});
