import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as morgan from "morgan";
import { RouteManager } from "./routeManager";
import { NextFunction } from "express";
var cookieParser = require("cookie-parser");
export class App {
  private readonly app: any;
  private env = process.env.NODE_ENV || "development";

  constructor() {
    this.app = express();
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(morgan("dev"));

    this.app.use((req: Request, res: any, next: NextFunction) => {
      res.setHeader('Cache-Control', 'no-cache');
      next();
    });

    if (this.env === "development")
      this.app.use(cors({ origin: "http://localhost:4200" }));
    this.app.use(cookieParser());
    new RouteManager(this.app);
  }

  get App() {
    return this.app;
  }
}
