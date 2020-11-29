import axios from "axios";
import Endpoints from "constants/Endpoints";

export default class PreferencesHandler {
  static async getPreferences() {
    return await axios.get(Endpoints.GET_PREFERENCES);
  }
}
