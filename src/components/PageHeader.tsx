import { cn } from "@/lib/utils";
import React from "react";

export default function PageHeader({
	title,
	actions,
	info,
	className,
}: {
	title: string | React.ReactNode;
	actions?: React.ReactNode;
	info?: React.ReactNode;
	className?: string;
}) {
	return (
		<>
			<div className={cn("flex items-center justify-between", className)}>
				{typeof title === "string" ? (
					<h2 className="text-2xl font-bold flex items-center gap-2">
						{title}
					</h2>
				) : (
					title
				)}
				<div className="flex items-center gap-2">{actions}</div>
			</div>
			{info && (
				<div className="text-sm text-muted-foreground">{info}</div>
			)}
		</>
	);
}
