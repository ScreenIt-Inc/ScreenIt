import { combineReducers } from "redux";
import loader from "../Loader/LoaderReducer";
import snackbar from "../Snackbar/SnackbarReducer";
import Feature1 from "../Feature1/FeatureReducer";
import table from "../Table/TableReducer"
import setting from "../Setting/SettingReducer"

export default combineReducers({
  loader,
  snackbar,
  Feature1,
  table,
  setting,
});
