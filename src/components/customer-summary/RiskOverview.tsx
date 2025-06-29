import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import {
	ShieldCheck,
	AlertTriangle,
	FileWarning,
	FolderKanban,
	CheckCircle2,
	ChevronRight,
} from "lucide-react";
import { Star } from "lucide-react";
import { Button } from "../ui/button";

const customer = {
	name: "Adani Group",
	domain: "adani.com",
	industry: "Asphalt Products Manufacturing",
	rating: 794,
	ratingGrade: "B",
	ratingMax: 950,
	employees: 29200,
	headquarters: "Ahmedabad, GJ",
};

const riskBreakdown = [
	{ label: "Critical", value: 1, color: "#dc2626" },
	{ label: "High", value: 5, color: "#f59e42" },
	{ label: "Medium", value: 18, color: "#fbbf24" },
	{ label: "Low", value: 12, color: "#22c55e" },
];

function RiskOverview() {
	return (
		<Card>
			{/* <CardHeader>
				<CardTitle className="flex items-center gap-2"></CardTitle>
			</CardHeader> */}
			<CardContent className="flex justify-between gap-6">
				<div className="flex items-center gap-2">
					<Badge
						variant="outline"
						className="text-lg px-3 py-1 border-green-500 text-green-600 flex items-center gap-1"
					>
						<ShieldCheck className="w-4 h-4" />
						{customer.ratingGrade}
					</Badge>
					<span className="text-3xl font-bold text-green-600 flex items-center gap-1">
						<Star className="w-5 h-5 text-yellow-400" />
						{customer.rating}
					</span>
					<span className="text-muted-foreground self-end">
						/ {customer.ratingMax}
					</span>
				</div>

				<div className="flex flex-row gap-x-4">
					<div className="text-md font-medium gap-x-4">
						<div className="flex gap-2 item-center">
							<AlertTriangle className="w-5 h-5 text-orange-500" />
							Current Risks by Severity
						</div>
						<div className="flex gap-2 item-center">
							<Button
								variant="link"
								size="sm"
								className="text-xs"
							>
								View All <ChevronRight className="w-4 h-4" />
							</Button>
						</div>
					</div>
					<div className="flex flex-row gap-2">
						{riskBreakdown.map((risk) => (
							<div
								key={risk.label}
								className="flex flex-col items-center"
							>
								<Badge
									style={{ backgroundColor: risk.color }}
									className="text-white mb-1 flex items-center gap-1"
								>
									{risk.label === "Critical" && (
										<AlertTriangle className="w-3 h-3" />
									)}
									{risk.label === "High" && (
										<FileWarning className="w-3 h-3" />
									)}
									{risk.label === "Medium" && (
										<FolderKanban className="w-3 h-3" />
									)}
									{risk.label === "Low" && (
										<CheckCircle2 className="w-3 h-3" />
									)}
									{risk.value}
								</Badge>
								<span className="text-sm text-muted-foreground">
									{risk.label}
								</span>
							</div>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default RiskOverview;
