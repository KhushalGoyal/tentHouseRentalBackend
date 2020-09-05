import { BaseEntity } from "./base";

export class Product extends BaseEntity {
    product_title : string;
    quantity_total : number;
    quantity_booked : number;
    price : string;
}