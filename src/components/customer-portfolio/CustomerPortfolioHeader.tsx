import { Button } from "@/components/ui/button";
import { ChevronDown, Filter, Download, InfoIcon } from "lucide-react";
import React from "react";

type Props = {
	onOpenFilters: () => void;
	onOpenExport: () => void;
	onToggleInfo: () => void;
};

const CustomerPortfolioHeader: React.FC<Props> = ({
	onOpenFilters,
	onOpenExport,
	onToggleInfo,
}) => (
	<div className="flex items-center justify-between flex-wrap gap-2">
		<div className="flex flex-col gap-1">
			<div className="flex items-center gap-2 text-sm text-muted-foreground">
				<span>Zoom Insurance Brokers</span>
				<span className="text-blue-600 underline cursor-pointer">
					(zoominsurancebrokers.com)
				</span>
			</div>
			<div className="flex items-center gap-2 mt-1">
				<span className="text-xs text-muted-foreground">
					Current Portfolio:
				</span>
				<Button
					variant="outline"
					size="sm"
					className="flex items-center gap-1"
				>
					All Portfolios <ChevronDown className="w-4 h-4" />
				</Button>
			</div>
		</div>
		<div className="flex items-center gap-2">
			<Button
				variant="outline"
				size="sm"
				className="flex items-center gap-1"
				onClick={onOpenFilters}
				aria-label="Apply filters"
			>
				<Filter className="w-4 h-4" /> Apply filters
			</Button>
			<Button
				variant="outline"
				size="sm"
				className="flex items-center gap-1"
				onClick={onOpenExport}
			>
				<Download className="w-4 h-4" /> Export
			</Button>
			<Button
				variant="outline"
				size="icon"
				onClick={onToggleInfo}
				aria-label="Toggle customer profile description"
			>
				<InfoIcon className="w-4 h-4" />
			</Button>
		</div>
	</div>
);

export default CustomerPortfolioHeader;
