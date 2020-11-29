import axios from "axios";
import Endpoints from "constants/Endpoints";

export default class RequestsHandler {
  static async getRequests() {
    return await axios.get(Endpoints.GET_REQUESTS);
  }

  static async clearRequests() {
    return await axios.delete(Endpoints.CLEAR_REQUESTS);
  }
}
