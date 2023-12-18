import * as jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import { UserRepository } from "../../server/dbLayer/repositories/UserRepository";
import { AppConfig } from "../../app/appConfig";

export class UserService {
  private analyticsRepo: UserRepository = new UserRepository();
  private jwtSecret = AppConfig.Config.jwtSecret;
  public token: string;

  public async login(req: Request, res: Response, next: NextFunction): Promise<any> {

    let fetchedUser: any;
    fetchedUser = await this.analyticsRepo.login(req.body.email)
    if (!fetchedUser) {
      return res.status(401).json({
        message: "Authentication failed",
      });
    }
    this.analyticsRepo.correctPassword(req.body.password, fetchedUser.password)
      .then((result: any) => {
        if (!result) {
          return res.status(401).json({
            message: "Authentication failed",
          });
        }
        const token = jwt.sign({
          email: fetchedUser.email,
          userId: fetchedUser._id,
        },
          this.jwtSecret,
          {
            expiresIn: "1h"
          }
        );
        this.token = token;
        console.log(this.token, "from service");
        res.status(200).json({
          token: token,
          expiresIn: 3600,
          userId: fetchedUser._id,
        });
      })
      .catch((err: any) => {
        return res.status(401).json({
          message: "Invalid Authentication credentials",
        });
      });
  }

  public async signup(req: Request, res: Response): Promise<any> {
    const newUser = await this.analyticsRepo.signup(req.body);
    return newUser;
  }

}
