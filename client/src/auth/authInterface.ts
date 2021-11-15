export interface UserSignupDetailsInterface {
    username: string,
    email: string,
    phoneNumber: number,
    password: string
}

export interface UserLoginDetailsInterface {
    email: string,
    password: string
}

export interface SellerSignupDetailsInterface {
    sellerUsername: string,
    password: string
    email: string,
    phoneNumber: number,
    homeAddress: string,
    storeAddress: string
}

export interface SellerLoginDetailsInterface {
    email: string,
    password: string
}