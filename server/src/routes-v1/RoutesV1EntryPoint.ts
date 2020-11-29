import express from "express";
import RequestRoutes from "./features/RequestRoutes";
import PreferencesRoutes from "./features/PreferencesRoutes";

export default class RoutesV1EntryPoint {
  private router = express.Router();

  constructor() {
    this.setEntryPointRoutes();
  }

  setEntryPointRoutes() {
    this.router.use("/request", new RequestRoutes().loadRoutes());
    this.router.use("/preference", new PreferencesRoutes().loadRoutes());
  }

  loadRoutes() {
    return this.router;
  }
}
