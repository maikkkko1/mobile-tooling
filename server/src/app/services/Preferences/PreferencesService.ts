import { SharedPrefereceLogging } from "../../types/SharedPrefereceLogging";

const { preference: Preference } = require("../../models");
const db = require("../../../database/Db");

export default class PreferencesService {
  create = async (data: SharedPrefereceLogging) => {
    return await db.model(Preference).insert(data);
  };

  get = async () => {
    return await db.model(Preference).select(false, false, [["createdAt", "DESC"]]);
  };

  clear = async () => {
    return await db.model(Preference).deleteAll();
  };
}
