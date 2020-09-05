"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_1 = __importDefault(require("./login"));
const product_1 = __importDefault(require("./product"));
const authguard_1 = require("../helpers/authguard");
const refreshToken_1 = __importDefault(require("./refreshToken"));
const customer_1 = __importDefault(require("./customer"));
const transactions_1 = __importDefault(require("./transactions"));
const AppController = express_1.Router();
AppController.use("/login", login_1.default);
AppController.use("/refreshToken", authguard_1.AuthGuard(), refreshToken_1.default);
AppController.use("/product", authguard_1.AuthGuard(), product_1.default);
AppController.use("/customer", authguard_1.AuthGuard(), customer_1.default);
AppController.use("/transaction", authguard_1.AuthGuard(), transactions_1.default);
exports.default = AppController;
