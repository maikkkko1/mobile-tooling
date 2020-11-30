import axios from "axios";
import Endpoints from "constants/Endpoints";

export default class AnalyticsHandler {
  static async getAnalyticsEvents() {
    return await axios.get(Endpoints.GET_ANALYTICS_EVENTS);
  }
}
