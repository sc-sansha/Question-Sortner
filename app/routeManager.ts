import * as path from "path";
import * as jwt from 'jsonwebtoken';
import * as express from "express";
import { AppConfig } from "./appConfig";
import { UserController } from "../server/user/UserController";

import { QuestionController } from "../server/question/QuestionController";
import { NextFunction } from "express";

const allowedExt = [
  ".js",
  ".ico",
  ".css",
  ".png",
  ".jpg",
  ".woff2",
  ".woff",
  ".ttf",
  ".svg",
  ".eot",
];

export class RouteManager {
  private readonly app: any;
  private jwtSecret = AppConfig.Config.jwtSecret;

  constructor(app: any) {
    this.app = app;
    this.mountRoutes();
  }

  private mountRoutes(): void {
    this.app.use("/api/v1/user", UserController.Instance.Router);

    this.app.use("/api/v1/question", this.verifyToken, QuestionController.Instance.Router);
    // this.app.use("/api/v1/question", this.checkJWTAuth, QuestionController.Instance.Router);

    this.app.use(
      "/api/v1/home",
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        console.log("Got home");
        res.send("home is here.");
      }
    );
  }

  async verifyToken(req: express.Request | any,
    res: express.Response,
    next: express.NextFunction) {
    const token = req.header('Authorization').split(' ')[1];
    console.log(token);

    jwt.verify(token, AppConfig.Config.jwtSecret); 
    next();
  }

  // async checkJWTAuth(
  //   req: express.Request | any,
  //   res: express.Response,
  //   next: express.NextFunction
  // ) {
  //   const authHeader: string = req.headers.authorization;
  //   console.log(authHeader);
  //   let token: string = "";

  //   if (!authHeader)
  //     return res
  //       .status(401)
  //       .send({ auth: false, message: "No token provided." });

  //   if (authHeader.startsWith("Bearer "))
  //     token = authHeader.substring(7, authHeader.length);

  //   if (!token)
  //     return res
  //       .status(401)
  //       .send({ auth: false, message: "No token provided." });

  //   try {
  //     const secret = this.jwtSecret;
  //     jwt.verify(token, secret, async function (err: any, decoded: any) {
  //       if (err)
  //         return res
  //           .status(401)
  //           .send({ auth: false, message: "Failed to authenticate token." });

  //       if (decoded) {
  //         req["user"] = decoded;
  //         req["token"] = token;
  //         next();
  //       }
  //     });
  //   } catch (err) {
  //     return res
  //       .status(401)
  //       .send({ auth: false, message: "Failed to authenticate token." });
  //   }
  // } 

}

