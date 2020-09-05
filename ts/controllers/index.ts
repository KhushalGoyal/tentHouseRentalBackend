import { Router } from "express";
import LoginController from "./login";
import ProductController from "./product";
import { AuthGuard } from "../helpers/authguard";
import RefreshTokenController from "./refreshToken";
import CustomerController from "./customer";
import TransactionController from "./transactions";

const AppController: Router = Router();

AppController.use("/login" ,LoginController)
AppController.use("/refreshToken", AuthGuard(), RefreshTokenController)
AppController.use("/product", AuthGuard(), ProductController)
AppController.use("/customer", AuthGuard(), CustomerController)
AppController.use("/transaction", AuthGuard(), TransactionController)

export default AppController;