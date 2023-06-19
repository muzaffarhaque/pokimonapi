import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/home/Home";
export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/pokimonapi",
      element: <Home />,
    },
  ]);
  return <RouterProvider router={router} />;
}
