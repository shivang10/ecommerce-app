export interface AddProductInterface {
    name: string,
    price: number,
    tags: string[],
    sellerDetails: string,
    description: string,
    stockQuantity: number
}

export interface ProductInterface {
    name: string,
    price: number,
    tags: JSX.Element[],
    description: string,
    stockQuantity: number
}