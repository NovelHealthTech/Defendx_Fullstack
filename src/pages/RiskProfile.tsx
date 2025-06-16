import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import SidebarLayout from "@/layouts/sidebar-layout";
import {
	Globe,
	ShieldCheck,
	MoreVertical,
	Filter,
	Download,
} from "lucide-react";
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router";
import PageHeader from "@/components/PageHeader";
import React from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/components/DataTable";
import CustomAccordion from "@/components/CustomAccordion";
import DrawerSheet from "@/components/DrawerSheet";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ExportDialog from "@/components/ExportDialog";

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

// const subsidiaries = [
// 	{ name: "ACC Limited", website: "acclimited.com", score: 754, grade: "B" },
// 	{
// 		name: "Adani Capital",
// 		website: "adanicapital.in",
// 		score: 683,
// 		grade: "B",
// 	},
// 	{
// 		name: "Adani Energy Solutions Limited",
// 		website: "adanienergysolutions.com",
// 		score: 596,
// 		grade: "C",
// 	},
// 	{
// 		name: "Adani Enterprises Limited",
// 		website: "adanienterprises.com",
// 		score: 754,
// 		grade: "B",
// 	},
// 	{
// 		name: "Adani Foundation",
// 		website: "adanifoundation.org",
// 		score: 796,
// 		grade: "B",
// 	},
// ];

const chartData = [
	{ date: "2024-04-01", desktop: 222, mobile: 150 },
	{ date: "2024-04-02", desktop: 97, mobile: 180 },
	{ date: "2024-04-03", desktop: 167, mobile: 120 },
	{ date: "2024-04-04", desktop: 242, mobile: 260 },
	{ date: "2024-04-05", desktop: 373, mobile: 290 },
	{ date: "2024-04-06", desktop: 301, mobile: 340 },
	{ date: "2024-04-07", desktop: 245, mobile: 180 },
	{ date: "2024-04-08", desktop: 409, mobile: 320 },
	{ date: "2024-04-09", desktop: 59, mobile: 110 },
	{ date: "2024-04-10", desktop: 261, mobile: 190 },
	{ date: "2024-04-11", desktop: 327, mobile: 350 },
	{ date: "2024-04-12", desktop: 292, mobile: 210 },
	{ date: "2024-04-13", desktop: 342, mobile: 380 },
	{ date: "2024-04-14", desktop: 137, mobile: 220 },
	{ date: "2024-04-15", desktop: 120, mobile: 170 },
	{ date: "2024-04-16", desktop: 138, mobile: 190 },
	{ date: "2024-04-17", desktop: 446, mobile: 360 },
	{ date: "2024-04-18", desktop: 364, mobile: 410 },
	{ date: "2024-04-19", desktop: 243, mobile: 180 },
	{ date: "2024-04-20", desktop: 89, mobile: 150 },
	{ date: "2024-04-21", desktop: 137, mobile: 200 },
	{ date: "2024-04-22", desktop: 224, mobile: 170 },
	{ date: "2024-04-23", desktop: 138, mobile: 230 },
	{ date: "2024-04-24", desktop: 387, mobile: 290 },
	{ date: "2024-04-25", desktop: 215, mobile: 250 },
	{ date: "2024-04-26", desktop: 75, mobile: 130 },
	{ date: "2024-04-27", desktop: 383, mobile: 420 },
	{ date: "2024-04-28", desktop: 122, mobile: 180 },
	{ date: "2024-04-29", desktop: 315, mobile: 240 },
	{ date: "2024-04-30", desktop: 454, mobile: 380 },
	{ date: "2024-05-01", desktop: 165, mobile: 220 },
	{ date: "2024-05-02", desktop: 293, mobile: 310 },
	{ date: "2024-05-03", desktop: 247, mobile: 190 },
	{ date: "2024-05-04", desktop: 385, mobile: 420 },
	{ date: "2024-05-05", desktop: 481, mobile: 390 },
	{ date: "2024-05-06", desktop: 498, mobile: 520 },
	{ date: "2024-05-07", desktop: 388, mobile: 300 },
	{ date: "2024-05-08", desktop: 149, mobile: 210 },
	{ date: "2024-05-09", desktop: 227, mobile: 180 },
	{ date: "2024-05-10", desktop: 293, mobile: 330 },
	{ date: "2024-05-11", desktop: 335, mobile: 270 },
	{ date: "2024-05-12", desktop: 197, mobile: 240 },
	{ date: "2024-05-13", desktop: 197, mobile: 160 },
	{ date: "2024-05-14", desktop: 448, mobile: 490 },
	{ date: "2024-05-15", desktop: 473, mobile: 380 },
	{ date: "2024-05-16", desktop: 338, mobile: 400 },
	{ date: "2024-05-17", desktop: 499, mobile: 420 },
	{ date: "2024-05-18", desktop: 315, mobile: 350 },
	{ date: "2024-05-19", desktop: 235, mobile: 180 },
	{ date: "2024-05-20", desktop: 177, mobile: 230 },
	{ date: "2024-05-21", desktop: 82, mobile: 140 },
	{ date: "2024-05-22", desktop: 81, mobile: 120 },
	{ date: "2024-05-23", desktop: 252, mobile: 290 },
	{ date: "2024-05-24", desktop: 294, mobile: 220 },
	{ date: "2024-05-25", desktop: 201, mobile: 250 },
	{ date: "2024-05-26", desktop: 213, mobile: 170 },
	{ date: "2024-05-27", desktop: 420, mobile: 460 },
	{ date: "2024-05-28", desktop: 233, mobile: 190 },
	{ date: "2024-05-29", desktop: 78, mobile: 130 },
	{ date: "2024-05-30", desktop: 340, mobile: 280 },
	{ date: "2024-05-31", desktop: 178, mobile: 230 },
	{ date: "2024-06-01", desktop: 178, mobile: 200 },
	{ date: "2024-06-02", desktop: 470, mobile: 410 },
	{ date: "2024-06-03", desktop: 103, mobile: 160 },
	{ date: "2024-06-04", desktop: 439, mobile: 380 },
	{ date: "2024-06-05", desktop: 88, mobile: 140 },
	{ date: "2024-06-06", desktop: 294, mobile: 250 },
	{ date: "2024-06-07", desktop: 323, mobile: 370 },
	{ date: "2024-06-08", desktop: 385, mobile: 320 },
	{ date: "2024-06-09", desktop: 438, mobile: 480 },
	{ date: "2024-06-10", desktop: 155, mobile: 200 },
	{ date: "2024-06-11", desktop: 92, mobile: 150 },
	{ date: "2024-06-12", desktop: 492, mobile: 420 },
	{ date: "2024-06-13", desktop: 81, mobile: 130 },
	{ date: "2024-06-14", desktop: 426, mobile: 380 },
	{ date: "2024-06-15", desktop: 307, mobile: 350 },
	{ date: "2024-06-16", desktop: 371, mobile: 310 },
	{ date: "2024-06-17", desktop: 475, mobile: 520 },
	{ date: "2024-06-18", desktop: 107, mobile: 170 },
	{ date: "2024-06-19", desktop: 341, mobile: 290 },
	{ date: "2024-06-20", desktop: 408, mobile: 450 },
	{ date: "2024-06-21", desktop: 169, mobile: 210 },
	{ date: "2024-06-22", desktop: 317, mobile: 270 },
	{ date: "2024-06-23", desktop: 480, mobile: 530 },
	{ date: "2024-06-24", desktop: 132, mobile: 180 },
	{ date: "2024-06-25", desktop: 141, mobile: 190 },
	{ date: "2024-06-26", desktop: 434, mobile: 380 },
	{ date: "2024-06-27", desktop: 448, mobile: 490 },
	{ date: "2024-06-28", desktop: 149, mobile: 200 },
	{ date: "2024-06-29", desktop: 103, mobile: 160 },
	{ date: "2024-06-30", desktop: 446, mobile: 400 },
];

const chartConfig = {
	visitors: {
		label: "Total",
	},
	desktop: {
		label: "Organization Only",
		color: "var(--chart-1)",
	},
	mobile: {
		label: "Organization + Subsidiaries",
		color: "var(--chart-2)",
	},
} satisfies ChartConfig;

const columns = [
	{
		header: "Severity",
		accessorKey: "severity",
		cell: ({ row }: { row: any }) => {
			return (
				<Badge
					variant={
						row.original.severity.toLowerCase() === "critical"
							? "destructive"
							: row.original.severity.toLowerCase() === "high"
							? "default"
							: "outline"
					}
				>
					{row.original.severity}
				</Badge>
			);
		},
	},
	{
		header: "Title",
		accessorKey: "title",
	},
	{
		header: "Category",
		accessorKey: "category",
	},
	{
		header: "Status",
		accessorKey: "status",
	},
];

export default function RiskProfile() {
	const [timeRange, setTimeRange] = React.useState("90d");
	const [openControlActionDrawer, openControlActionDrawerSet] =
		React.useState(false);
	const [selectedControlAction, selectedControlActionSet] =
		React.useState<any>(null);

	// Filter sidebar state
	const [openFilterSidebar, setOpenFilterSidebar] = React.useState(false);
	const [labelMatchType, setLabelMatchType] = React.useState("any");
	const [labelSearch, setLabelSearch] = React.useState("");
	const [findingSearch, setFindingSearch] = React.useState("");

	// Export dialog state
	const [openExportDialog, setOpenExportDialog] = React.useState(false);
	const [exportFormat, setExportFormat] = React.useState<"pdf" | "excel">(
		"pdf"
	);
	const [exportFrequency, setExportFrequency] = React.useState<
		"once" | "recurring"
	>("once");
	const [exportDelivery, setExportDelivery] = React.useState<
		"email" | "save"
	>("email");

	const filteredData = chartData.filter((item) => {
		const date = new Date(item.date);
		const referenceDate = new Date("2024-06-30");
		let daysToSubtract = 90;
		if (timeRange === "30d") {
			daysToSubtract = 30;
		} else if (timeRange === "7d") {
			daysToSubtract = 7;
		}
		const startDate = new Date(referenceDate);
		startDate.setDate(startDate.getDate() - daysToSubtract);
		return date >= startDate;
	});

	function getData(): any[] {
		// Fetch data from your API here.
		return [
			{
				severity: "Critical",
				title: "DMARC policy is not implemented",
				category: "Email Security",
				status: "In Progress",
			},
			{
				severity: "High",
				title: "CSP is not implemented",
				category: "Content Security Policy",
				status: "In Progress",
			},
			{
				severity: "Medium",
				title: "SSL Not Installed",
				category: "Encryption",
				status: "In Progress",
			},
		];
	}
	const data = getData();

	const extendColumns = [
		...columns,
		{
			id: "actions",
			enableHiding: false,
			header: "Actions",
			cell: ({ row }: { row: any }) => {
				return (
					<Button
						onClick={() => {
							selectedControlActionSet(row.original);
							openControlActionDrawerSet(true);
						}}
					>
						Review
					</Button>
				);
			},
		},
	];

	return (
		<SidebarLayout
			breadcrumbs={[
				{
					label: "Risk Profile",
					href: "/risk-profile",
				},
			]}
		>
			<div className="space-y-4">
				<CustomerHeader
					onOpenFilterSidebar={() => setOpenFilterSidebar(true)}
					onOpenExportDialog={() => setOpenExportDialog(true)}
				/>
				<RiskOverview
					timeRange={timeRange}
					setTimeRange={setTimeRange}
					filteredData={filteredData}
				/>
				<RiskDetails data={data} extendColumns={extendColumns} />
			</div>

			{/* Filter Sidebar */}
			<DrawerSheet
				open={openFilterSidebar}
				onOpenChange={setOpenFilterSidebar}
				className="w-[350px] sm:min-w-[400px]"
				side="right"
				title="Filter by"
			>
				<div className="space-y-8">
					{/* Label Section */}
					<div>
						<div className="font-semibold mb-2">Label</div>
						<div className="space-y-2 mb-2">
							<div className="flex items-center gap-2">
								<RadioGroup
									value={labelMatchType}
									onValueChange={setLabelMatchType}
									className="flex flex-col gap-1"
								>
									<label className="flex items-center gap-2 text-sm">
										<RadioGroupItem
											value="any"
											id="label-any"
										/>{" "}
										Match any
									</label>
									<label className="flex items-center gap-2 text-sm">
										<RadioGroupItem
											value="all"
											id="label-all"
										/>{" "}
										Match all
									</label>
									<label className="flex items-center gap-2 text-sm">
										<RadioGroupItem
											value="exclude"
											id="label-exclude"
										/>{" "}
										Do not include
									</label>
								</RadioGroup>
							</div>
							<input
								type="text"
								placeholder="Type to search labels"
								className="w-full mt-2"
								value={labelSearch}
								onChange={(e) => setLabelSearch(e.target.value)}
							/>
						</div>
					</div>
					{/* Finding Section */}
					<div>
						<div className="font-semibold mb-2">Finding</div>
						<input
							type="text"
							placeholder="Type to search findings"
							className="w-full"
							value={findingSearch}
							onChange={(e) => setFindingSearch(e.target.value)}
						/>
					</div>
				</div>
				{/* Footer Buttons */}
				<div className="flex justify-between gap-2 mt-8">
					<Button
						variant="outline"
						className="flex-1"
						onClick={() => {
							setLabelMatchType("any");
							setLabelSearch("");
							setFindingSearch("");
						}}
					>
						Reset
					</Button>
					<Button
						className="flex-1"
						onClick={() => setOpenFilterSidebar(false)}
					>
						Apply
					</Button>
				</div>
			</DrawerSheet>

			{/* Export Dialog */}
			<ExportDialog
				open={openExportDialog}
				onOpenChange={setOpenExportDialog}
				exportFormat={exportFormat}
				setExportFormat={setExportFormat}
				exportFrequency={exportFrequency}
				setExportFrequency={setExportFrequency}
				exportDelivery={exportDelivery}
				setExportDelivery={setExportDelivery}
			/>

			<DrawerSheet
				open={openControlActionDrawer}
				onOpenChange={openControlActionDrawerSet}
				className="w-[400px] sm:min-w-[500px]"
				headerWithAction={{
					title: selectedControlAction?.title ?? "Review",
					action: (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" size="icon">
									<MoreVertical className="w-4 h-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-56" align="start">
								<DropdownMenuGroup>
									<DropdownMenuItem>
										Address this risk
									</DropdownMenuItem>
									<DropdownMenuSub>
										<DropdownMenuSubTrigger>
											Add to Risk Profile
										</DropdownMenuSubTrigger>
										<DropdownMenuPortal>
											<DropdownMenuSubContent>
												<DropdownMenuItem>
													Add to Risk Profile
												</DropdownMenuItem>
												<DropdownMenuSeparator />
												<DropdownMenuItem>
													More...
												</DropdownMenuItem>
											</DropdownMenuSubContent>
										</DropdownMenuPortal>
									</DropdownMenuSub>
									<DropdownMenuItem>
										Waive this risk
									</DropdownMenuItem>
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					),
				}}
				children={
					<>
						<CustomAccordion
							type="multiple"
							items={[
								{
									title: "Accordion For Data Type Array?",
									content:
										"If you pass an array of objects, the accordion will be created for each object.",
								},
								{
									title: "Question 2",
									content: "Answer 2",
								},
							]}
						/>
						<CustomAccordion
							type="single"
							items={{
								"faq-1": {
									title: "Accordion For Data Type Object?",
									content:
										"The component also upports passing an object with title and content properties.",
								},
								"faq-2": {
									title: "Can I reuse it?",
									content: "Absolutely!",
								},
							}}
						/>
					</>
				}
			/>
		</SidebarLayout>
	);
}

// Reusable Section Components
function CustomerHeader({
	onOpenFilterSidebar,
	onOpenExportDialog,
}: {
	onOpenFilterSidebar: () => void;
	onOpenExportDialog: () => void;
}) {
	return (
		<>
			<PageHeader
				title={
					<div className=" -col items-center justify-start">
						<div className="flex items-center gap-2">
							<Avatar>
								<AvatarFallback>
									{customer.name[0]}
								</AvatarFallback>
							</Avatar>
							<div>
								<CardTitle className="text-md flex items-center gap-2">
									{customer.name}
									<Link
										to={"#"}
										className="text-xs flex items-center gap-1 hover:underline text-blue-500"
									>
										<Globe className="w-3 h-3" />{" "}
										{customer.domain}
									</Link>
								</CardTitle>
							</div>
						</div>
					</div>
				}
				actions={null}
			/>
			<PageHeader
				title="Risk Profile"
				info="Your customer's risk profile helps you instantly to understand their security posture. Monnitor your customer's risk profile to ensure they are compliant with your security policies, drill into their risk profile to understand their security posture and take action to improve their security posture."
				actions={
					<>
						<Button variant="outline" onClick={onOpenFilterSidebar}>
							Apply Filter <Filter className="w-4 h-4" />
						</Button>
						<Button variant="outline" onClick={onOpenExportDialog}>
							Export <Download className="w-4 h-4" />
						</Button>
					</>
				}
			/>
		</>
	);
}

function RiskOverview({
	timeRange,
	setTimeRange,
	filteredData,
}: {
	timeRange: string;
	filteredData: any[];
	setTimeRange: (timeRange: string) => void;
}) {
	return (
		<Card className="pt-0">
			<CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
				<div className="grid flex-1 gap-1">
					<CardTitle>Security - Interactive</CardTitle>
					<CardDescription>
						Showing total security score for the last 3 months
					</CardDescription>
				</div>
				<Select value={timeRange} onValueChange={setTimeRange}>
					<SelectTrigger
						className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
						aria-label="Select a value"
					>
						<SelectValue placeholder="Last 3 months" />
					</SelectTrigger>
					<SelectContent className="rounded-xl">
						<SelectItem value="90d" className="rounded-lg">
							Last 3 months
						</SelectItem>
						<SelectItem value="30d" className="rounded-lg">
							Last 30 days
						</SelectItem>
						<SelectItem value="7d" className="rounded-lg">
							Last 7 days
						</SelectItem>
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				<ChartContainer
					config={chartConfig}
					className="aspect-auto h-[250px] w-full"
				>
					<AreaChart data={filteredData}>
						<defs>
							<linearGradient
								id="fillDesktop"
								x1="0"
								y1="0"
								x2="0"
								y2="1"
							>
								<stop
									offset="5%"
									stopColor="var(--color-desktop)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-desktop)"
									stopOpacity={0.1}
								/>
							</linearGradient>
							<linearGradient
								id="fillMobile"
								x1="0"
								y1="0"
								x2="0"
								y2="1"
							>
								<stop
									offset="5%"
									stopColor="var(--color-mobile)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-mobile)"
									stopOpacity={0.1}
								/>
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value) => {
								const date = new Date(value);
								return date.toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
								});
							}}
						/>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									labelFormatter={(value) => {
										return new Date(
											value
										).toLocaleDateString("en-US", {
											month: "short",
											day: "numeric",
										});
									}}
									indicator="dot"
								/>
							}
						/>
						<Area
							dataKey="mobile"
							type="natural"
							fill="url(#fillMobile)"
							stroke="var(--color-mobile)"
							stackId="a"
						/>
						<Area
							dataKey="desktop"
							type="natural"
							fill="url(#fillDesktop)"
							stroke="var(--color-desktop)"
							stackId="a"
						/>
						<ChartLegend content={<ChartLegendContent />} />
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}

function RiskDetails({
	data,
	extendColumns,
}: {
	data: any[];
	extendColumns: any[];
}) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<ShieldCheck className="w-5 h-5 text-green-600" /> Risk
					Details
				</CardTitle>
			</CardHeader>
			<CardContent>
				<DataTable columns={extendColumns} data={data} />
			</CardContent>
		</Card>
	);
}

// function CompanyProfile() {
// 	return (
// 		<Card>
// 			<CardHeader className="flex flex-row items-start bg-muted/50">
// 				<div className="grid gap-0.5">
// 					<CardTitle className="group flex items-center gap-2 text-lg">
// 						Company Profile
// 					</CardTitle>
// 					<CardDescription>
// 						Last Updated: 22 May, 2025
// 					</CardDescription>
// 				</div>
// 				<div className="ml-auto flex items-center gap-1">
// 					<Button size="sm" variant="outline" className="h-8 gap-1">
// 						<PenBoxIcon className="h-3.5 w-3.5" />
// 						<span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
// 							Edit
// 						</span>
// 					</Button>
// 				</div>
// 			</CardHeader>

// 			<CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
// 				<div className="grid gap-3">
// 					<ul className="grid gap-3">
// 						<li className="flex items-center justify-between">
// 							<span className="text-muted-foreground">Name</span>
// 							<span>{customer.name}</span>
// 						</li>
// 						<li className="flex items-center justify-between">
// 							<span className="text-muted-foreground">
// 								Primary domain
// 							</span>
// 							<span>{customer.domain}</span>
// 						</li>
// 						<li className="flex items-center justify-between">
// 							<span className="text-muted-foreground">
// 								Industry
// 							</span>
// 							<span>{customer.industry}</span>
// 						</li>
// 						<li className="flex items-center justify-between">
// 							<span className="text-muted-foreground">
// 								Overall security rating
// 							</span>

// 							<Badge variant="outline">
// 								{customer.ratingGrade} {customer.rating}
// 							</Badge>
// 						</li>
// 					</ul>
// 				</div>
// 				<div className="grid gap-3">
// 					<ul className="grid gap-3">
// 						<li className="flex items-center justify-between">
// 							<span className="text-muted-foreground">
// 								Employees
// 							</span>
// 							<span>{customer.employees}</span>
// 						</li>
// 						<li className="flex items-center justify-between">
// 							<span className="text-muted-foreground">
// 								Headquarters
// 							</span>
// 							<span>{customer.headquarters}</span>
// 						</li>
// 						<li className="flex items-center justify-between">
// 							<span className="text-muted-foreground">
// 								Contract end date
// 							</span>
// 							<span>-</span>
// 						</li>
// 						<li className="flex items-center justify-between">
// 							<span className="text-muted-foreground">
// 								Internal owner
// 							</span>

// 							<span>-</span>
// 						</li>
// 					</ul>
// 				</div>
// 			</CardContent>
// 		</Card>
// 	);
// }

// function SubsidiariesTable() {
// 	return (
// 		<Card>
// 			<CardHeader>
// 				<CardTitle className="flex items-center gap-2">
// 					<Building2 className="w-5 h-5 text-muted-foreground" />{" "}
// 					Subsidiaries
// 				</CardTitle>
// 			</CardHeader>
// 			<CardContent>
// 				<div className="overflow-x-auto">
// 					<table className="min-w-full text-sm">
// 						<thead>
// 							<tr className="text-muted-foreground">
// 								<th className="text-left py-2 px-4 flex items-center gap-1">
// 									<Building2 className="w-4 h-4" /> Customer
// 								</th>
// 								<th className="text-left py-2 px-4">
// 									<Globe className="w-4 h-4 inline" /> Website
// 								</th>
// 								<th className="text-left py-2 px-4">
// 									<ShieldCheck className="w-4 h-4 inline" />{" "}
// 									Score
// 								</th>
// 							</tr>
// 						</thead>
// 						<tbody className="text-sm">
// 							{subsidiaries.map((sub) => (
// 								<tr
// 									key={sub.name}
// 									className="border-b last:border-0"
// 								>
// 									<td className="py-2 px-4 flex items-center gap-1">
// 										<Building2 className="w-4 h-4 text-muted-foreground" />
// 										{sub.name}
// 									</td>
// 									<td className="py-2 px-4">{sub.website}</td>
// 									<td className="py-2 px-4">
// 										<Badge
// 											variant="outline"
// 											className={
// 												sub.grade === "C"
// 													? "border-yellow-500 text-yellow-600"
// 													: "border-green-500 text-green-600"
// 											}
// 										>
// 											{sub.grade} {sub.score}
// 										</Badge>
// 									</td>
// 								</tr>
// 							))}
// 						</tbody>
// 					</table>
// 				</div>
// 			</CardContent>
// 		</Card>
// 	);
// }

// function RiskCharts() {
// 	return (
// 		<Card>
// 			<CardHeader>
// 				<CardTitle className="flex items-center gap-2">
// 					<PieChartIcon className="w-5 h-5 text-blue-500" /> Risk
// 					Ratings Overview
// 				</CardTitle>
// 			</CardHeader>
// 			<CardContent>
// 				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// 					{pieData.map((data) => (
// 						<ChartContainer
// 							key={data.name}
// 							config={{
// 								value: { label: data.name, color: data.color },
// 							}}
// 							className="min-h-[200px] w-full"
// 						>
// 							<PieChart width={200} height={200}>
// 								<ChartTooltip
// 									content={<ChartTooltipContent />}
// 								/>
// 								<Pie
// 									data={[data]}
// 									dataKey="value"
// 									nameKey="name"
// 									cx="50%"
// 									cy="50%"
// 									innerRadius={60}
// 									outerRadius={80}
// 									fill={data.color}
// 									label
// 								>
// 									<Cell
// 										key={`cell-${data.name}`}
// 										fill={data.color}
// 									/>
// 								</Pie>
// 							</PieChart>
// 						</ChartContainer>
// 					))}
// 				</div>
// 			</CardContent>
// 		</Card>
// 	);
// }
