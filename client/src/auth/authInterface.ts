export interface UserSignupDetailsInterface {
    username: string,
    email: string,
    phoneNumber: number | undefined,
    password: string
}

export interface UserLoginDetailsInterface {
    email: string,
    password: string
}
