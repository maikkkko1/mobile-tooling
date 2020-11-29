import Util from "../../commons/Util";
import { IController } from "../../interfaces/IController";
import PreferencesService from "../../services/Preferences/PreferencesService";
import { SharedPrefereceLogging } from "../../types/SharedPrefereceLogging";
import MainController from "../MainController";

class PreferencesController extends MainController implements IController {
  controllerService = new PreferencesService();

  create = async (data: SharedPrefereceLogging) => {
    try {
      await this.controllerService.create(data);

      return true;
    } catch (err) {
      console.log(err);

      return false;
    }
  };

  get = async (_: any, res: any) => {
    try {
      const preferences = await this.controllerService.get();

      for (let i = 0; i < preferences.length; i++) {
        const current = preferences[i];

        current.createdAt = Util.formatDbDateTime(current.createdAt);
      }

      this.responseSuccess(res, preferences);
    } catch (err) {
      console.log(err);

      this.responseServerError(res);
    }
  };

  clear = async () => {
    try {
      return await this.controllerService.clear();
    } catch (err) {
      console.log(err);
    }
  };
}

export default PreferencesController;
