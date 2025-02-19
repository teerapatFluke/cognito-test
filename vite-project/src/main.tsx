import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Amplify } from "aws-amplify"; // ใช้ aws-amplify

Amplify.configure({
  Auth: {
    // region: "ap-southeast-1",
    Cognito: {
      userPoolId: "ap-southeast-1_2ZXzPK25c", // Cognito User Pool ID
      userPoolClientId: "2u8h2tc7ogkgsjrp3c52nh2705", // Cognito App Client ID
      loginWith: {
        email: true,
        oauth: {
          domain:
            "ap-southeast-12zxzpk25c.auth.ap-southeast-1.amazoncognito.com", // Cognito Hosted UI Domain
          scopes: ["email", "openid"],
          redirectSignIn: ["http://localhost:5173/"], // URL ที่จะ redirect หลังการ sign in
          redirectSignOut: ["http://localhost:5173/"], // URL ที่จะ redirect หลังการ sign out
          responseType: "code",
          providers: [{ custom: "AZURE-OIDC" }],
        },
      },
    },
  },
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
