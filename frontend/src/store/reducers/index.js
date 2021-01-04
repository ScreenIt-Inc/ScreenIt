import { combineReducers } from "redux";
import lang from "../Lang/LangReducer";
import loader from "../Loader/LoaderReducer";
import snackbar from "../Snackbar/SnackbarReducer";
import Feature1 from "../Feature1/FeatureReducer";
import table from "../Table/TableReducer"

export default combineReducers({
  lang,
  loader,
  snackbar,
  Feature1,
  table
});
