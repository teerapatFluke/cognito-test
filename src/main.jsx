import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Amplify } from "aws-amplify"; // ใช้ aws-amplify

// Import ค่าคอนฟิกจากไฟล์ aws-exports.js
import awsconfig from "./aws-export.js";

// ตั้งค่า Amplify ด้วยข้อมูลใน aws-exports.js
Amplify.configure(awsconfig);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
