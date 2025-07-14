import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoaderProps {
	size?: "sm" | "md" | "lg" | "xl";
	variant?: "default" | "overlay" | "fullscreen";
	text?: string;
	className?: string;
}

const sizeClasses = {
	sm: "w-4 h-4",
	md: "w-6 h-6",
	lg: "w-8 h-8",
	xl: "w-12 h-12",
};

export const Loader: React.FC<LoaderProps> = ({
	size = "md",
	variant = "default",
	text = "Loading...",
	className,
}) => {
	const loaderContent = (
		<div className="flex flex-col items-center justify-center gap-2">
			<Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
			{text && (
				<span className="text-sm text-muted-foreground font-medium">
					{text}
				</span>
			)}
		</div>
	);

	if (variant === "fullscreen") {
		return (
			<div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
				<div className="bg-background border rounded-lg p-8 shadow-lg">
					{loaderContent}
				</div>
			</div>
		);
	}

	if (variant === "overlay") {
		return (
			<div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-10">
				{loaderContent}
			</div>
		);
	}

	return (
		<div className={cn("flex items-center justify-center py-8", className)}>
			{loaderContent}
		</div>
	);
};

// Inline loader for buttons and small spaces
interface InlineLoaderProps {
	size?: "sm" | "md";
	className?: string;
}

export const InlineLoader: React.FC<InlineLoaderProps> = ({
	size = "sm",
	className,
}) => {
	return (
		<Loader2
			className={cn(
				"animate-spin",
				sizeClasses[size],
				className
			)}
		/>
	);
};

// Page loader for full page loading states
interface PageLoaderProps {
	text?: string;
	size?: "md" | "lg" | "xl";
}

export const PageLoader: React.FC<PageLoaderProps> = ({
	text = "Loading page...",
	size = "lg",
}) => {
	return (
		<div className="min-h-[60vh] flex items-center justify-center">
			<div className="flex flex-col items-center justify-center gap-4">
				<Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
				<div className="text-center">
					<p className="text-lg font-medium text-foreground">{text}</p>
					<p className="text-sm text-muted-foreground mt-1">
						Please wait while we load your content
					</p>
				</div>
			</div>
		</div>
	);
};

// Table loader for data tables
export const TableLoader: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
	return (
		<div className="space-y-2">
			{Array.from({ length: rows }).map((_, i) => (
				<div
					key={i}
					className="h-12 bg-muted/50 rounded animate-pulse"
				/>
			))}
		</div>
	);
};

export default Loader;
