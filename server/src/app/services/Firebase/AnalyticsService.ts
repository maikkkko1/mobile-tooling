import { FirebaseAnalyticsLogging } from "../../types/FirebaseAnalyticsLogging";

const { analytics: Analytics } = require("../../models");
const db = require("../../../database/Db");

export default class AnalyticsService {
  create = async (data: FirebaseAnalyticsLogging) => {
    return await db.model(Analytics).insert(data);
  };

  get = async () => {
    return await db.model(Analytics).select(false, false, [["createdAt", "DESC"]]);
  };

  clear = async () => {
    return await db.model(Analytics).deleteAll();
  };
}
