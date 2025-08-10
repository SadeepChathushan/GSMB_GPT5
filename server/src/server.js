import http from "http";
import app from "./app.js";
import { initIO } from "./sockets/index.js";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 4000;

const server = http.createServer(app);
initIO(server);
server.listen(port, () => console.log(`API running on http://localhost:${port}`));
