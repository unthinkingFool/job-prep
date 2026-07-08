import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./app.routes";
import { AuthProvider } from "./features/auth/auth.context";
import { AIProvider } from "./features/ai/ai.context";

const App = () => {
  return (
    <AuthProvider>
      <AIProvider>
        <RouterProvider router={router} />
      </AIProvider>
    </AuthProvider>
  )
};

export default App;
