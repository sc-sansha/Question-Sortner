import { AppConfig } from "../../../app/appConfig";

export class DbConfig {
  private static env = process.env.NODE_ENV || "development";
  private static dbName: string = AppConfig.Config.dbName;

  public static get DbUrl() {
    let url = "";
    if (this.env === "development") {
      url = "mongodb://localhost:27017/";
    }
    return url;
  }

  public static get DbName() {
    return this.dbName;
  }
}
