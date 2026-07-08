import { createBrowserRouter } from "react-router-dom";

import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import Home from "./features/ai/pages/home"
import InterviewReport from "./features/ai/pages/interviewReport"

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <Protected>
        <h1><Home/></h1>
      </Protected>
    ),
  },
  {
    path: "/interview/:interviewID",
    element: (
      <Protected>
        <h1><InterviewReport/></h1>
      </Protected>
    ),
  },
]);