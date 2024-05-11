import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import createRouter from "./router/index";
import "./index.css";
import { Provider } from "react-redux";
import { globalStore } from "./redux/stores";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <LocalizationProvider dateAdapter={AdapterDayjs}>
  <Provider store={globalStore}>
    <RouterProvider router={createRouter} />
  </Provider>
  // {/* </LocalizationProvider> */}
);
