import Util from "../../commons/Util";
import { IController } from "../../interfaces/IController";
import AnalyticsService from "../../services/Firebase/AnalyticsService";
import { FirebaseAnalyticsLogging } from "../../types/FirebaseAnalyticsLogging";
import MainController from "../MainController";

class AnalyticsController extends MainController implements IController {
  controllerService = new AnalyticsService();

  create = async (data: FirebaseAnalyticsLogging) => {
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
      const data = await this.controllerService.get();

      for (let i = 0; i < data.length; i++) {
        const current = data[i];

        current.createdAt = Util.formatDbDateTime(current.createdAt);
      }

      this.responseSuccess(res, data);
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

export default AnalyticsController;
