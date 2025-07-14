import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { setupApiInterceptor, resetApiLoader } from "@/utils/apiInterceptor";

interface LoadingContextType {
	isLoading: boolean;
	setLoading: (loading: boolean, text?: string) => void;
	loadingText: string;
	forceHide: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

interface LoadingProviderProps {
	children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [loadingText, setLoadingText] = useState("Loading...");

	const setLoading = (loading: boolean, text: string = "Loading...") => {
		console.log('Loading state change:', loading, text);
		setIsLoading(loading);
		setLoadingText(text);
	};

	const forceHide = () => {
		console.log('Force hiding loader');
		resetApiLoader(); // Reset the API counter too
		setIsLoading(false);
	};

	// Setup API interceptor when component mounts
	useEffect(() => {
		setupApiInterceptor({
			show: (text) => setLoading(true, text),
			hide: () => setLoading(false),
		});
	}, []);

	return (
		<LoadingContext.Provider value={{ isLoading, setLoading, loadingText, forceHide }}>
			{children}
			{isLoading && (
				<div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
					<div className="bg-background border rounded-lg p-8 shadow-lg relative">
						{/* Simple close button in development */}
						{process.env.NODE_ENV === 'development' && (
							<button
								onClick={forceHide}
								className="absolute top-2 right-2 text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
								title="Force close loader"
							>
								✕
							</button>
						)}
						<div className="flex flex-col items-center justify-center gap-2">
							<Loader2 className="w-8 h-8 animate-spin text-primary" />
							{loadingText && (
								<span className="text-sm text-muted-foreground font-medium">
									{loadingText}
								</span>
							)}
						</div>
					</div>
				</div>
			)}
		</LoadingContext.Provider>
	);
};

export const useLoading = (): LoadingContextType => {
	const context = useContext(LoadingContext);
	if (!context) {
		throw new Error("useLoading must be used within a LoadingProvider");
	}
	return context;
};

// Hook for page-level loading
export const usePageLoading = () => {
	const { setLoading } = useLoading();
	
	const showPageLoader = (text?: string) => {
		setLoading(true, text || "Loading page...");
	};
	
	const hidePageLoader = () => {
		setLoading(false);
	};

	return { showPageLoader, hidePageLoader };
};

// Hook for API loading states
export const useApiLoading = () => {
	const { setLoading } = useLoading();
	
	const showApiLoader = (text?: string) => {
		setLoading(true, text || "Processing request...");
	};
	
	const hideApiLoader = () => {
		setLoading(false);
	};

	return { showApiLoader, hideApiLoader };
};
