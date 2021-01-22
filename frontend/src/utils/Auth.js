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
};
export default Auth;
