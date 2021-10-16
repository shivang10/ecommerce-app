export interface SingleOrderInterface {
    orderDate: string,
    totalAmount: number,
    modeOfPayment: string,
    discount: number,
    finalAmount: number,
    address: string,
    itemsOrdered: []
}