import store from "../store";
import { showSnackbarAction } from "../store/Snackbar/SnackbarAction";

// To show error message that returned from backend
export function dispatchSnackbarError(data) {
  if (data) {
    if (data.errors != null) {
      const errorMsg = data.errors.message;
      store.dispatch(showSnackbarAction(errorMsg, "error"));
    } else {
      store.dispatch(showSnackbarAction(data, "error"));
    }
  }
}
// To show success message after any success request if needed and rendered from locale files
export function dispatchSnackbarSuccess(message) {
  store.dispatch(showSnackbarAction(message, "success"));
}
