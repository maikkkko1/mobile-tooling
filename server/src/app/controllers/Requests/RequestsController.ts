import Util from "../../commons/Util";
import { IController } from "../../interfaces/IController";
import RequestService from "../../services/Requests/RequestService";
import { HttpRequestLogging } from "../../types/HttpRequestLogging";
import MainController from "../MainController";

class RequestsController extends MainController implements IController {
  private REGISTER_LIMIT = 100;

  controllerService = new RequestService();

  create = async (data: HttpRequestLogging) => {
    try {
      await this.verifyRegisterLimit();

      await this.controllerService.create(data);

      return true;
    } catch (err) {
      console.log(err);

      return false;
    }
  };

  get = async (_: any, res: any) => {
    try {
      const requests = await this.controllerService.get();

      for (let i = 0; i < requests.length; i++) {
        const current = requests[i];

        if (current.body) {
          current.body = JSON.parse(current.body);
        }

        if (current.response) {
          current.response = JSON.parse(current.response);
        }

        current.createdAt = Util.formatDbDateTime(current.createdAt);
      }

      this.responseSuccess(res, requests);
    } catch (err) {
      console.log(err);

      this.responseServerError(res);
    }
  };

  clear = async (_: any, res: any) => {
    try {
      await this.controllerService.clear();

      this.responseSuccess(res, true);
    } catch (err) {
      console.log(err);

      this.responseServerError(res);
    }
  };

  internalClear = async () => {
    try {
      return await this.controllerService.clear();
    } catch (err) {
      console.log(err);
    }
  };

  private verifyRegisterLimit = async () => {
    const getAll: any[] = await this.controllerService.get();

    if (getAll && getAll.length >= this.REGISTER_LIMIT) {
      await this.controllerService.delete(getAll[getAll.length - 1].id);
    }
  };
}

export default RequestsController;
