import { createBrowserRouter } from "react-router-dom";
//import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "./AppLayout";
import AuthLayout from "./AuthLayout";

// pages
import Login from "@/features/auth/pages/Login";
import Register from "@/features/auth/pages/Register";
import Dashboard from "@/features/dashboard/pages/Dashboard";
import InvoicePage from "@/features/invoices/pages/InvoiceView";


export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  {
    path: "/",
    element: (
      
        <AppLayout />
     
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "invoices", element: <InvoicePage /> },
    ],
  },
]);
