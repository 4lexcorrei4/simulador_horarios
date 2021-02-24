const urls = {
    base: () => "https://api-dot-avian-compiler-303622.ey.r.appspot.com/rest",
    /* Account */
    login: () => urls.base() + "/login/v1",
    signup: () => urls.base() + "/register/v0",
    logout: () => urls.base() + "/account/logout",
    changePassword: () => urls.base() + "/account/changePassword",
    /* Balance */
    balanceList: () => urls.base() + "/balance/listTokens",
    /* Profile */
    userInfo: () => urls.base() + "/account/getProfileInfo"
   };

export default urls;