import {
	FileCheck2,
	FileText,
	FolderKanban,
	Globe,
	ListChecks,
	ShieldCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";

const riskManagement = [
	{ title: "Continue your risk assessment", status: "In Progress" },
	{ title: "Remediation", complete: 0, inProgress: 0 },
	{ title: "Additional Evidence", uploaded: 0, shared: 0, requested: 0 },
	{ title: "Domains and IPs", active: 292 },
	{ title: "Security Questionnaires", complete: 0, inProgress: 0, shared: 0 },
];

function RiskManagementSection() {
	const icons = [
		<ListChecks className="w-4 h-4 mr-1" key="assessment" />,
		<FileCheck2 className="w-4 h-4 mr-1" key="remediation" />,
		<FileText className="w-4 h-4 mr-1" key="evidence" />,
		<Globe className="w-4 h-4 mr-1" key="domains" />,
		<FolderKanban className="w-4 h-4 mr-1" key="questionnaires" />,
	];
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<ShieldCheck className="w-5 h-5 text-green-600" /> Risk
					Management
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{riskManagement.map((item, idx) => (
						<Card key={idx} className="">
							<CardContent className="">
								<div className="font-medium mb-2 flex items-center gap-1">
									{icons[idx]} {item.title}
								</div>
								{item.status && (
									<Badge variant="outline">
										{item.status}
									</Badge>
								)}
								{item.complete !== undefined && (
									<div className="mt-2 text-sm text-muted-foreground">
										{item.complete} complete,{" "}
										{item.inProgress} in progress
									</div>
								)}
								{item.active !== undefined && (
									<div className="mt-2 text-sm text-muted-foreground">
										{item.active} active
									</div>
								)}
								{item.uploaded !== undefined && (
									<div className="mt-2 text-sm text-muted-foreground">
										{item.uploaded} uploaded, {item.shared}{" "}
										shared, {item.requested} requested
									</div>
								)}
								{item.complete !== undefined && (
									<Progress value={item.complete} />
								)}
							</CardContent>
						</Card>
					))}
				</div>
			</CardContent>
		</Card>
	);
}

export default RiskManagementSection;
