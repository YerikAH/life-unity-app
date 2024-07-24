import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import createRouter from "./router/index";
import "./index.css";
import { Provider } from "react-redux";
import { globalStore } from "./redux/stores";

import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <LocalizationProvider dateAdapter={AdapterDayjs}>
  <GoogleOAuthProvider clientId="943243064176-stskg5l8m6qnc6g8jej5cbdtiv4t8uhi.apps.googleusercontent.com">
    <Provider store={globalStore}>
      <RouterProvider router={createRouter} />
    </Provider>
  </GoogleOAuthProvider>
  // {/* </LocalizationProvider> */}
);
