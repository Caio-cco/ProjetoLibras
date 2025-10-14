import React from "react";
import ReactDOM from "react-dom/client";
import Navegacao from "./routes.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = "SEU_CLIENT_ID.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <GoogleOAuthProvider clientId={clientId}>
         <Navegacao />
     </GoogleOAuthProvider>
  </React.StrictMode>
  
);

