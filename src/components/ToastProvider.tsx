"use client";

import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3500,
        style: {
          borderRadius: "12px",
          background: "#ffffff",
          color: "#1f2937",
          border: "1px solid #fee2e2",
          padding: "12px 16px",
          fontSize: "14px",
        },
        success: {
          iconTheme: { primary: "#15803d", secondary: "#ffffff" },
        },
        error: {
          iconTheme: { primary: "#b91c1c", secondary: "#ffffff" },
        },
      }}
    />
  );
}