import { extend } from "lodash";
import { BaseEntity } from "./base";

export class User extends BaseEntity {
    name : string;
    email : string;
    password : string;
    type : string;
}