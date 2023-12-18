import { NextFunction, Request, Response, Router } from "express";
import { UserService } from "./UserService";

export class UserController {
  private static instance: UserController;
  private router: Router = Router();
  public userService: UserService = new UserService();

  constructor() {
    this.router.post("/signup", this.signup.bind(this));
    this.router.post("/login", this.login.bind(this));
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new Error('Please Provide email and password'));
    }

    this.userService
      .login(req, res, next);
  }

  public async signup(req: Request, res: Response): Promise<void> {
    this.userService
      .signup(req, res).then((user) => {
        res.status(200).json({
          message: "signup successful",
          user
        })
      })
  }

  /**
   * Function to return /user router
   */

  public get Router(): Router {
    return this.router;
  }

  /**
   * Function to return instance
   */
  public static get Instance(): UserController {
    if (!UserController.instance)
      UserController.instance = new UserController();
    return UserController.instance;
  }
}
