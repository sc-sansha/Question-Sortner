import { App } from "./app/app";
import { AppConfig } from "./app/appConfig";

const app = new App().App;
const appConfig = new AppConfig();
const port = AppConfig.Config.port;
export const dir = __dirname;

app.listen(port, (err: any) => {
  if (err) {
    return console.error(err);
  }
  return console.log("Application is running on port - ", port);
});
process.on("uncaughtException", function (err) {
  console.error(
    "Uncaught Exception occurred while execution, Root cause: ",
    err
  );
});
