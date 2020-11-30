import ApplicationController from "./src/ApplicationController";

import socketio from "socket.io";
import SocketService from "./src/app/services/Socket/SocketService";

const port = process.env.PORT || 3333;

const server = ApplicationController.listen(port);

/** Socket management. */
SocketService.setSocketServer(socketio(server));
SocketService.listenForRequests();
SocketService.listenForPreferences();
SocketService.listenForAnalytics();
