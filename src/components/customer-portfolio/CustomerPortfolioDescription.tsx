import React from "react";

type Props = {
	show: boolean;
	children: React.ReactNode;
};

const CustomerPortfolioDescription: React.FC<Props> = ({ show, children }) => (
	<div className="flex flex-col gap-2">
		<h2 className="text-2xl font-bold">Customer Portfolio</h2>
		{show && <p className="text-sm text-muted-foreground">{children}</p>}
	</div>
);

export default CustomerPortfolioDescription;
