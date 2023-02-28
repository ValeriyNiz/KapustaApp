export const getIsLogin = state => state.auth.isLogin;
export const getToken = state => state.auth.accessToken;
export const getMessage = state => state.auth.message;
export const getBalance = state => state.auth.user.balance;
export const getIsLoading = state => state.auth.isLoading;
export const getIsRefreshing = state => state.auth.isRefreshing;
export const getIsLoginApiDone = state => state.auth.isLoginApiDone;
export const getUserName = state => state.auth.user.email;
