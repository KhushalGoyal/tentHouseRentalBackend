import { BaseEntity } from "./base";

export class Transaction extends BaseEntity {
    transaction_date_time : string;
    customer_id : string;
    product_id : string;
    transaction_type : string;
    quantity: number;
    transaction_id_parent: string;
}