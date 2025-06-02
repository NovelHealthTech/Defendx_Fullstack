import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import SidebarLayout from "@/layouts/sidebar-layout";
import {
	Building2,
	Globe,
	ShieldCheck,
	Star,
	Users,
	MapPin,
	FileCheck2,
	FileWarning,
	FolderKanban,
	ListChecks,
	FileText,
	AlertTriangle,
	CheckCircle2,
	PieChart as PieChartIcon,
} from "lucide-react";

// Dummy Data
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

const riskManagement = [
	{ title: "Continue your risk assessment", status: "In Progress" },
	{ title: "Remediation", complete: 0, inProgress: 0 },
	{ title: "Additional Evidence", uploaded: 0, shared: 0, requested: 0 },
	{ title: "Domains and IPs", active: 292 },
	{ title: "Security Questionnaires", complete: 0, inProgress: 0, shared: 0 },
];

const subsidiaries = [
	{ name: "ACC Limited", website: "acclimited.com", score: 754, grade: "B" },
	{
		name: "Adani Capital",
		website: "adanicapital.in",
		score: 683,
		grade: "B",
	},
	{
		name: "Adani Energy Solutions Limited",
		website: "adanienergysolutions.com",
		score: 596,
		grade: "C",
	},
	{
		name: "Adani Enterprises Limited",
		website: "adanienterprises.com",
		score: 754,
		grade: "B",
	},
	{
		name: "Adani Foundation",
		website: "adanifoundation.org",
		score: 796,
		grade: "B",
	},
];

const pieData = [
	{ name: "IP/Domain Reputation", value: 950, color: "#22c55e" },
	{ name: "Encryption", value: 653, color: "#fbbf24" },
	{ name: "Vulnerability Management", value: 950, color: "#22c55e" },
	{ name: "Attack Surface", value: 950, color: "#22c55e" },
];

// Reusable Section Components
function CustomerHeader() {
	return (
		<div className="flex flex-col gap-4">
			<h2 className="text-2xl font-bold flex items-center gap-2">
				<Building2 className="w-6 h-6 text-muted-foreground" /> Customer
				Summary
			</h2>
			<div className="flex flex-row items-center gap-4">
				<Avatar>
					<AvatarFallback>{customer.name[0]}</AvatarFallback>
				</Avatar>
				<div>
					<CardTitle className="text-xl flex items-center gap-2">
						<Building2 className="w-5 h-5 text-muted-foreground" />{" "}
						{customer.name}
					</CardTitle>
					<div className="text-muted-foreground text-sm flex items-center gap-1">
						<Globe className="w-4 h-4" /> {customer.domain}
					</div>
				</div>
				<div className="ml-auto flex items-center gap-2">
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
			</div>
		</div>
	);
}

function RiskOverview() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<AlertTriangle className="w-5 h-5 text-orange-500" />{" "}
					Current Risks by Severity
				</CardTitle>
			</CardHeader>
			<CardContent className="flex gap-6">
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
			</CardContent>
		</Card>
	);
}

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

function CompanyProfile() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Building2 className="w-5 h-5 text-muted-foreground" />{" "}
					Company Profile
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<div className="mb-2 flex items-center gap-2">
							<Building2 className="w-4 h-4" />
							<span className="font-medium">Name:</span>{" "}
							{customer.name}
						</div>
						<div className="mb-2 flex items-center gap-2">
							<Globe className="w-4 h-4" />
							<span className="font-medium">
								Primary domain:
							</span>{" "}
							{customer.domain}
						</div>
						<div className="mb-2 flex items-center gap-2">
							<FolderKanban className="w-4 h-4" />
							<span className="font-medium">Industry:</span>{" "}
							{customer.industry}
						</div>
						<div className="mb-2 flex items-center gap-2">
							<ShieldCheck className="w-4 h-4" />
							<span className="font-medium">
								Overall security rating:
							</span>{" "}
							<Badge variant="outline">
								{customer.ratingGrade} {customer.rating}
							</Badge>
						</div>
					</div>
					<div>
						<div className="mb-2 flex items-center gap-2">
							<Users className="w-4 h-4" />
							<span className="font-medium">Employees:</span>{" "}
							{customer.employees}
						</div>
						<div className="mb-2 flex items-center gap-2">
							<MapPin className="w-4 h-4" />
							<span className="font-medium">
								Headquarters:
							</span>{" "}
							{customer.headquarters}
						</div>
						<div className="mb-2 flex items-center gap-2">
							<FileText className="w-4 h-4" />
							<span className="font-medium">
								Contract end date:
							</span>{" "}
							-
						</div>
						<div className="mb-2 flex items-center gap-2">
							<ListChecks className="w-4 h-4" />
							<span className="font-medium">
								Internal owner:
							</span>{" "}
							-
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

function SubsidiariesTable() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Building2 className="w-5 h-5 text-muted-foreground" />{" "}
					Subsidiaries
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="overflow-x-auto">
					<table className="min-w-full text-sm">
						<thead>
							<tr className="text-muted-foreground">
								<th className="text-left py-2 px-4 flex items-center gap-1">
									<Building2 className="w-4 h-4" /> Customer
								</th>
								<th className="text-left py-2 px-4">
									<Globe className="w-4 h-4 inline" /> Website
								</th>
								<th className="text-left py-2 px-4">
									<ShieldCheck className="w-4 h-4 inline" />{" "}
									Score
								</th>
							</tr>
						</thead>
						<tbody>
							{subsidiaries.map((sub) => (
								<tr
									key={sub.name}
									className="border-b last:border-0"
								>
									<td className="py-2 px-4 flex items-center gap-1">
										<Building2 className="w-4 h-4 text-muted-foreground" />
										{sub.name}
									</td>
									<td className="py-2 px-4">{sub.website}</td>
									<td className="py-2 px-4">
										<Badge
											variant="outline"
											className={
												sub.grade === "C"
													? "border-yellow-500 text-yellow-600"
													: "border-green-500 text-green-600"
											}
										>
											{sub.grade} {sub.score}
										</Badge>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</CardContent>
		</Card>
	);
}

function RiskCharts() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<PieChartIcon className="w-5 h-5 text-blue-500" /> Risk
					Ratings Overview
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{pieData.map((data) => (
						<ChartContainer
							key={data.name}
							config={{
								value: { label: data.name, color: data.color },
							}}
							className="min-h-[200px] w-full"
						>
							<PieChart width={200} height={200}>
								<ChartTooltip
									content={<ChartTooltipContent />}
								/>
								<Pie
									data={[data]}
									dataKey="value"
									nameKey="name"
									cx="50%"
									cy="50%"
									innerRadius={60}
									outerRadius={80}
									fill={data.color}
									label
								>
									<Cell
										key={`cell-${data.name}`}
										fill={data.color}
									/>
								</Pie>
							</PieChart>
						</ChartContainer>
					))}
				</div>
			</CardContent>
		</Card>
	);
}

export default function CustomerSummary() {
	return (
		<SidebarLayout
			breadcrumbs={[
				{
					label: "Customer Summary",
					href: "/customer-summary",
				},
			]}
		>
			<div className="space-y-4">
				<CustomerHeader />
				<RiskOverview />
				<RiskManagementSection />
				<CompanyProfile />
				<SubsidiariesTable />
				<RiskCharts />
			</div>
		</SidebarLayout>
	);
}
