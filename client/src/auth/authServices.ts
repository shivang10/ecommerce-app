export const axiosPostMethod = "post";

export const isUserLogged = localStorage.getItem("userToken");

export const logoutUser = (): void => localStorage.removeItem("userToken");