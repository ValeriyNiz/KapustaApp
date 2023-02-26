export const getIsLoggedIn = state => state.auth.isLogin;
export const getToken = state => state.auth.accessToken;
export const getBalance = state => state.auth.user.balance;
export const getMessage = state => state.auth.message;
