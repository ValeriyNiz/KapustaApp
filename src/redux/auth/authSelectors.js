const selectIsLoggedIn = state => state.auth.isLogin;
const selectToken = state => state.auth.accessToken;

export { selectIsLoggedIn, selectToken };
