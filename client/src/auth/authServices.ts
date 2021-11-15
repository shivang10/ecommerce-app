export const isUserLogged = localStorage.getItem("userToken");

export const isSellerLogged = localStorage.getItem("sellerToken");

export const logoutUser = (): void => localStorage.removeItem("userToken");

export const logoutSeller = (): void => localStorage.removeItem("sellerToken");