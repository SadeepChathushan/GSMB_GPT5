import { io } from "../sockets/index.js";
export function notify(channel, event, payload) { io().to(channel).emit(event, payload); }
