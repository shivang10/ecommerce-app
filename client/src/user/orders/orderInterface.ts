export interface SingleOrderInterface {
    orderDate: string,
    totalAmount: number,
    modeOfPayment: string,
    discount: number,
    finalAmount: number,
    address: string,
    itemsOrdered: []
}

export interface SingleOrderItemInterface {
    name: string,
    price: number,
    quantity: number,
    totalPrice: number,
    itemDiscount: number
}
