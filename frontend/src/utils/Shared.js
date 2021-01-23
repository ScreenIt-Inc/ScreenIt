import store from "../store";
import { showSnackbarAction } from "../store/Snackbar/SnackbarAction";
import messages from "../assets/Local/messages";

// To show error message that returned from backend
export function dispatchSnackbarError(data) {
  if (data) {
    const errorMsg = data.errors.message;
    store.dispatch(showSnackbarAction(errorMsg, "error"));
  }
}
// To show success message after any success request if needed and rendered from locale files
export function dispatchSnackbarSuccess(message) {
  store.dispatch(showSnackbarAction(message, "success"));
}
