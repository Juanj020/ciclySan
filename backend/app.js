import dovten from 'dotenv';
import { Server } from './models/server.js';

dovten.config();

const server = new Server();

server.listen();
