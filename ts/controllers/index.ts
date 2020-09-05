import { Router } from "express";
import LoginController from "./login";

const AppController: Router = Router();

AppController.use("/login" ,LoginController)

export default AppController;