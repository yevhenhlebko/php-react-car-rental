import React from "react";
import ReactDOM from "react-dom";
import App from "./router";
import moment from 'moment-timezone';
import "semantic-ui-css/semantic.min.css";

import { AuthProvider } from "./context/auth";
moment.tz.add('America/Los_Angeles|PST PDT|80 70|0101|1Lzm0 1zb0 Op0');

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("app"),
);
