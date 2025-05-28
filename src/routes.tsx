import { lazy } from "react";
import Home from "./pages/Home.tsx";
const Login = lazy(() => import("./pages/Login.tsx"));
const SecurityProfile = lazy(() => import("./pages/SecurityProfile.tsx"));
const UserSettings = lazy(() => import("./pages/UserSettings.tsx"));
const CustomerSummary = lazy(() => import("./pages/CustomerSummary.tsx"));
const CustomerPortfolio = lazy(() => import("./pages/CustomerPortfolio.tsx"));

export const routes = [
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/security-profile",
		element: <SecurityProfile />,
	},
	{
		path: "/user-settings",
		element: <UserSettings />,
	},
	{
		path: "/customer-summary",
		element: <CustomerSummary />,
	},
	{
		path: "/customer-portfolio",
		element: <CustomerPortfolio />,
	},
];
