import React, { lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Home from "./pages/Home.tsx";

const Login = lazy(() => import("./pages/Login.tsx"));
const SecurityProfile = lazy(() => import("./pages/SecurityProfile.tsx"));
const UserSettings = lazy(() => import("./pages/UserSettings.tsx"));
const CustomerSummary = lazy(() => import("./pages/CustomerSummary.tsx"));
const CustomerPortfolio = lazy(() => import("./pages/CustomerPortfolio.tsx"));

// Simple auth check function
const isAuthenticated = () => !!localStorage.getItem("token");

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

const PublicRoute = () => {
  return !isAuthenticated() ? <Outlet /> : <Navigate to="/customer-portfolio" replace />;
};

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <PublicRoute />,
    children: [
      {
        path: "",
        element: <Login />,
      },
    ],
  },
  {
    path: "/security-profile",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <SecurityProfile />,
      },
    ],
  },
  {
    path: "/user-settings",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <UserSettings />,
      },
    ],
  },
  {
    path: "/customer-summary/:id/:domain",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <CustomerSummary />,
      },
    ],
  },
  {
    path: "/customer-portfolio",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <CustomerPortfolio />,
      },
    ],
  },
];
