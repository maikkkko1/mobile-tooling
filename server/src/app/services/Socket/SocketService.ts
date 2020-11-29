import SocketEvents from "../../constants/Socket/SocketEvents";
import PreferencesController from "../../controllers/Preferences/PreferencesController";
import RequestsController from "../../controllers/Requests/RequestsController";
import { HttpRequestLogging } from "../../types/HttpRequestLogging";
import { SharedPrefereceLogging } from "../../types/SharedPrefereceLogging";

export default class SocketService {
  private static instance: SocketService;
  private static socketServer: SocketIO.Server;

  constructor() {
    if (SocketService.instance) {
      return SocketService.instance;
    }

    SocketService.instance = this;
  }

  static setSocketServer(server: SocketIO.Server) {
    this.socketServer = server;
  }

  static listenForRequests() {
    this.socketServer.on("connection", (socket) => {
      socket.on(SocketEvents.EVENT.NEW_REQUEST, (request: HttpRequestLogging) => {
        const parsedRequest = JSON.parse(request.toString());

        new RequestsController().create(parsedRequest);
      });

      socket.on("disconnect", () => {
        return null;
      });
    });
  }

  static listenForPreferences() {
    this.socketServer.on("connection", (socket) => {
      socket.on(
        SocketEvents.EVENT.SET_PREFERENCE,
        (preference: SharedPrefereceLogging) => {
          const parsedPreference = JSON.parse(preference.toString());

          new PreferencesController().create(parsedPreference);
        }
      );

      socket.on(SocketEvents.EVENT.RESET_PREFERENCE, () => {
        new PreferencesController().clear();
      });

      socket.on("disconnect", () => {
        return null;
      });
    });
  }

  static emitEvent(event: string, data: any) {
    this.socketServer.emit(event, data);
  }
}
