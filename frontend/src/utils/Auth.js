// Service to check authentication for user and to signOut
const Auth = {
  signOut() {
    console.log("signing out");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  },
  isAuth() {
    return localStorage.getItem("token");
  },
  getUser() {
    return localStorage.getItem("user");
  },
};
export default Auth;
