import { HttpRequestLogging } from "../../types/HttpRequestLogging";

const { request: Request } = require("../../models");
const db = require("../../../database/Db");

export default class RequestService {
  create = async (data: HttpRequestLogging) => {
    return await db.model(Request).insert(data);
  };

  get = async () => {
    return await db.model(Request).select(false, false, [["createdAt", "DESC"]]);
  };

  delete = async (id: string) => {
    return await db.model(Request).delete({ id: id });
  };

  clear = async () => {
    return await db.model(Request).deleteAll();
  };
}
