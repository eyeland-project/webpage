import { io, Socket } from 'socket.io-client';
import { environment } from '@environments/environment';

const uri = environment.socketUrl;

export let socket: Socket | undefined = undefined;
export const connect = () => (socket = io(uri));
