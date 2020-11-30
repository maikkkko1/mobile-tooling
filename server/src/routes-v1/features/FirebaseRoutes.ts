import express from "express";
import AnalyticsController from "../../app/controllers/Firebase/AnalyticsController";
import { IRoutes } from "../../app/interfaces/IRoutes";

export default class FirebaseRoutes implements IRoutes {
  public routerController = new AnalyticsController();

  private router = express.Router();

  constructor() {
    this.setPublicRoutes();
  }

  setGuardedRoutes() {}

  setPublicRoutes() {
    this.router.get("/analytics/get", this.routerController.get.bind(this));
  }

  loadRoutes() {
    return this.router;
  }
}
