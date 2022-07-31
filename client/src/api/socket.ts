import { baseUrl } from "./axios-instance.api";
import { io } from "socket.io-client";


const socket = io(baseUrl);

export default socket