import React from "react";
import ReactDOM from "react-dom/client";
import Navegacao from "./routes.jsx";
import "./styles/global.scss";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = "324833504461-pirdui28unoelj2lotec7m2e5fs09avl.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <GoogleOAuthProvider clientId={clientId}>
         <Navegacao />
     </GoogleOAuthProvider>
  </React.StrictMode>
  
);

