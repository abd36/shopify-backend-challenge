export interface Item {
    _id: string,
    name: string,
    quantity: number,
    price: number,
    warehouse_id: string,
    deleted: boolean,
    deletedMessage: string
};