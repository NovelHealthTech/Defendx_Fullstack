import React from "react";

export default function PageHeader({
	title,
	actions,
	info,
}: {
	title: React.ReactNode;
	actions: React.ReactNode;
	info?: React.ReactNode;
}) {
	return (
		<>
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold">{title}</h2>
				<div className="flex items-center gap-2">{actions}</div>
			</div>
			{info && (
				<div className="text-sm text-muted-foreground">{info}</div>
			)}
		</>
	);
}
