import express from "express";
import PreferencesController from "../../app/controllers/Preferences/PreferencesController";
import { IRoutes } from "../../app/interfaces/IRoutes";

export default class PreferencesRoutes implements IRoutes {
  public routerController = new PreferencesController();

  private router = express.Router();

  constructor() {
    this.setPublicRoutes();
  }

  setGuardedRoutes() {}

  setPublicRoutes() {
    this.router.get("/get", this.routerController.get.bind(this));
  }

  loadRoutes() {
    return this.router;
  }
}
