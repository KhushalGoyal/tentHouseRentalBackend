"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDefaultUser = exports.getByType = exports.UserService = void 0;
const user_1 = require("../repository/user");
const password_1 = require("../helpers/password");
const models_1 = require("../models");
class UserService {
    constructor() {
        this.userRepository = new user_1.UserReprository();
        this.create = async (body) => {
            return this.userRepository.save(body);
        };
        this.get = async (_id) => {
            return this.userRepository.findById(_id);
        };
    }
}
exports.UserService = UserService;
async function getByType(_type) {
    return models_1.UserModel.findOne({ type: _type }).lean();
}
exports.getByType = getByType;
async function addDefaultUser(payload) {
    console.log(payload);
    payload.password = password_1.PasswordHelper.encrypt(payload.password);
    payload.type = 'DEFAULT';
    return new Promise((resolve, reject) => {
        models_1.UserModel.create(payload, function (err, res) {
            if (err) {
                reject(err);
                return;
            }
            resolve(res);
            return;
        });
    });
}
exports.addDefaultUser = addDefaultUser;
