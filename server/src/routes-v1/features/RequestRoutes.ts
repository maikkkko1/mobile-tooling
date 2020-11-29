import express from "express";
import RequestsController from "../../app/controllers/Requests/RequestsController";
import { IRoutes } from "../../app/interfaces/IRoutes";

export default class RequestRoutes implements IRoutes {
  public routerController = new RequestsController();

  private router = express.Router();

  constructor() {
    this.setPublicRoutes();
  }

  setGuardedRoutes() {}

  setPublicRoutes() {
    this.router.get("/get", this.routerController.get.bind(this));

    this.router.delete("/clear", this.routerController.clear.bind(this));
  }

  loadRoutes() {
    return this.router;
  }
}
