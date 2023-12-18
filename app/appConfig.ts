import { AppConfigDevelopment } from "./config/appConfig.development";

export class AppConfig {
  private static env = process.env.NODE_ENV || "development";
  public static get Config(): any {
    switch (this.env) {
      case "development": {
        return AppConfigDevelopment.Config;
      }
    }
  }
}
