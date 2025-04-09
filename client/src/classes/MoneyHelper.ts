import { OrderType } from "../types/productTypes";

//Get each item x its qty
const GetTotalItems = (orders: OrderType[]): number => {
    var totalItems = 0;
    for (let x = 0 ; x < orders.length; x++){
        totalItems += orders[x].qty;
    }
    return totalItems;
}

//Get cost of a single item x its qty
const GetSingleOrderCost = (order: OrderType): number => {
    const cost = (order.product.discountPrice) ? order.product.discountPrice : order.product.price
    const totalCost = cost  * order.qty
    return Number(totalCost.toFixed(2))
}

//Get full cost of the order
const GetFullOrderCost = (orders: OrderType[]): number => {
    var cost = 0
    for (let x = 0; x < orders.length; x++) {
        cost += GetSingleOrderCost(orders[x])
    }
    return Number(cost.toFixed(2))
}

export { GetTotalItems, GetSingleOrderCost, GetFullOrderCost }