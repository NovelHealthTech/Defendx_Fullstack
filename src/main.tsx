import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import { routes } from "./routes";
import { ThemeProvider } from "./components/theme-provider";
import { LoadingProvider } from "./contexts/LoadingContext";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider defaultTheme="system" storageKey="app-theme">
			<LoadingProvider>
				<RouterProvider router={router} />
			</LoadingProvider>
		</ThemeProvider>
	</StrictMode>
);
