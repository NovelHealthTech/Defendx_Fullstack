import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import SidebarLayout from "@/layouts/sidebar-layout";
import {
	Building2,
	Globe,
	FileWarning,
	FolderKanban,
	AlertTriangle,
	CheckCircle2,
	Filter,
	Download,
} from "lucide-react";
import { Link } from "react-router";
import SectionCard from "@/components/customer-summary/SectionCard";
import CompanyProfile from "@/components/customer-summary/CompanyProfile";
import SubsidiariesTable from "@/components/customer-summary/SubsidiariesTable";
import RiskManagementSection from "@/components/customer-summary/RiskManagementSection";
import RiskOverview from "@/components/customer-summary/RiskOverview";
import PageHeader from "@/components/PageHeader";
import DrawerSheet from "@/components/DrawerSheet";
import ExportDialog from "@/components/ExportDialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

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

// Dummy chart data for all sections
const sectionData = [
	{
		title: "UpGuard Cyber Risk Rating",
		rating: 794,
		grade: "B",
		max: 950,
		chart: [
			{ date: "Jun '24", value: 800 },
			{ date: "Aug '24", value: 820 },
			{ date: "Oct '24", value: 810 },
			{ date: "Dec '24", value: 790 },
			{ date: "Feb '25", value: 794 },
		],
		breakdown: [
			{
				label: "Critical",
				value: 1,
				color: "#dc2626",
				icon: AlertTriangle,
			},
			{ label: "High", value: 5, color: "#f59e42", icon: FileWarning },
			{
				label: "Medium",
				value: 18,
				color: "#fbbf24",
				icon: FolderKanban,
			},
			{ label: "Low", value: 12, color: "#22c55e", icon: CheckCircle2 },
		],
	},
	{
		title: "Website",
		rating: 716,
		grade: "B",
		max: 950,
		chart: [
			{ date: "Jun '24", value: 700 },
			{ date: "Aug '24", value: 710 },
			{ date: "Oct '24", value: 715 },
			{ date: "Dec '24", value: 720 },
			{ date: "Feb '25", value: 716 },
		],
		breakdown: [
			{
				label: "Critical",
				value: 0,
				color: "#dc2626",
				icon: AlertTriangle,
			},
			{ label: "High", value: 0, color: "#f59e42", icon: FileWarning },
			{ label: "Medium", value: 6, color: "#fbbf24", icon: FolderKanban },
			{ label: "Low", value: 5, color: "#22c55e", icon: CheckCircle2 },
		],
	},
	{
		title: "IP/Domain Reputation",
		rating: 950,
		grade: "A",
		max: 950,
		chart: [
			{ date: "Jun '24", value: 950 },
			{ date: "Aug '24", value: 950 },
			{ date: "Oct '24", value: 950 },
			{ date: "Dec '24", value: 950 },
			{ date: "Feb '25", value: 950 },
		],
		breakdown: [
			{
				label: "Critical",
				value: 0,
				color: "#dc2626",
				icon: AlertTriangle,
			},
			{ label: "High", value: 0, color: "#f59e42", icon: FileWarning },
			{ label: "Medium", value: 0, color: "#fbbf24", icon: FolderKanban },
			{ label: "Low", value: 0, color: "#22c55e", icon: CheckCircle2 },
		],
	},
	{
		title: "Encryption",
		rating: 653,
		grade: "B",
		max: 950,
		chart: [
			{ date: "Jun '24", value: 650 },
			{ date: "Aug '24", value: 655 },
			{ date: "Oct '24", value: 660 },
			{ date: "Dec '24", value: 655 },
			{ date: "Feb '25", value: 653 },
		],
		breakdown: [
			{
				label: "Critical",
				value: 1,
				color: "#dc2626",
				icon: AlertTriangle,
			},
			{ label: "High", value: 4, color: "#f59e42", icon: FileWarning },
			{ label: "Medium", value: 6, color: "#fbbf24", icon: FolderKanban },
			{ label: "Low", value: 2, color: "#22c55e", icon: CheckCircle2 },
		],
	},
	{
		title: "Data Leakage",
		rating: 950,
		grade: "A",
		max: 950,
		chart: [
			{ date: "Jun '24", value: 950 },
			{ date: "Aug '24", value: 950 },
			{ date: "Oct '24", value: 950 },
			{ date: "Dec '24", value: 950 },
			{ date: "Feb '25", value: 950 },
		],
		breakdown: [
			{
				label: "Critical",
				value: 0,
				color: "#dc2626",
				icon: AlertTriangle,
			},
			{ label: "High", value: 0, color: "#f59e42", icon: FileWarning },
			{ label: "Medium", value: 0, color: "#fbbf24", icon: FolderKanban },
			{ label: "Low", value: 0, color: "#22c55e", icon: CheckCircle2 },
		],
	},
	{
		title: "DNS",
		rating: 939,
		grade: "A",
		max: 950,
		chart: [
			{ date: "Jun '24", value: 939 },
			{ date: "Aug '24", value: 939 },
			{ date: "Oct '24", value: 939 },
			{ date: "Dec '24", value: 939 },
			{ date: "Feb '25", value: 939 },
		],
		breakdown: [
			{
				label: "Critical",
				value: 0,
				color: "#dc2626",
				icon: AlertTriangle,
			},
			{ label: "High", value: 0, color: "#f59e42", icon: FileWarning },
			{ label: "Medium", value: 0, color: "#fbbf24", icon: FolderKanban },
			{ label: "Low", value: 3, color: "#22c55e", icon: CheckCircle2 },
		],
	},
	{
		title: "Brand Reputation",
		rating: 950,
		grade: "A",
		max: 950,
		chart: [
			{ date: "Jun '24", value: 950 },
			{ date: "Aug '24", value: 950 },
			{ date: "Oct '24", value: 950 },
			{ date: "Dec '24", value: 950 },
			{ date: "Feb '25", value: 950 },
		],
		breakdown: [
			{
				label: "Critical",
				value: 0,
				color: "#dc2626",
				icon: AlertTriangle,
			},
			{ label: "High", value: 0, color: "#f59e42", icon: FileWarning },
			{ label: "Medium", value: 0, color: "#fbbf24", icon: FolderKanban },
			{ label: "Low", value: 0, color: "#22c55e", icon: CheckCircle2 },
		],
	},
	{
		title: "Network",
		rating: 942,
		grade: "A",
		max: 950,
		chart: [
			{ date: "Jun '24", value: 940 },
			{ date: "Aug '24", value: 942 },
			{ date: "Oct '24", value: 942 },
			{ date: "Dec '24", value: 942 },
			{ date: "Feb '25", value: 942 },
		],
		breakdown: [
			{
				label: "Critical",
				value: 0,
				color: "#dc2626",
				icon: AlertTriangle,
			},
			{ label: "High", value: 0, color: "#f59e42", icon: FileWarning },
			{ label: "Medium", value: 6, color: "#fbbf24", icon: FolderKanban },
			{ label: "Low", value: 0, color: "#22c55e", icon: CheckCircle2 },
		],
	},
	{
		title: "Email",
		rating: 798,
		grade: "B",
		max: 950,
		chart: [
			{ date: "Jun '24", value: 800 },
			{ date: "Aug '24", value: 798 },
			{ date: "Oct '24", value: 798 },
			{ date: "Dec '24", value: 798 },
			{ date: "Feb '25", value: 798 },
		],
		breakdown: [
			{
				label: "Critical",
				value: 0,
				color: "#dc2626",
				icon: AlertTriangle,
			},
			{ label: "High", value: 1, color: "#f59e42", icon: FileWarning },
			{ label: "Medium", value: 0, color: "#fbbf24", icon: FolderKanban },
			{ label: "Low", value: 2, color: "#22c55e", icon: CheckCircle2 },
		],
	},
	{
		title: "Vulnerability Management",
		rating: 950,
		grade: "A",
		max: 950,
		chart: [
			{ date: "Jun '24", value: 950 },
			{ date: "Aug '24", value: 950 },
			{ date: "Oct '24", value: 950 },
			{ date: "Dec '24", value: 950 },
			{ date: "Feb '25", value: 950 },
		],
		breakdown: [
			{
				label: "Critical",
				value: 0,
				color: "#dc2626",
				icon: AlertTriangle,
			},
			{ label: "High", value: 0, color: "#f59e42", icon: FileWarning },
			{ label: "Medium", value: 0, color: "#fbbf24", icon: FolderKanban },
			{ label: "Low", value: 0, color: "#22c55e", icon: CheckCircle2 },
		],
	},
	{
		title: "Attack Surface",
		rating: 950,
		grade: "A",
		max: 950,
		chart: [
			{ date: "Jun '24", value: 950 },
			{ date: "Aug '24", value: 950 },
			{ date: "Oct '24", value: 950 },
			{ date: "Dec '24", value: 950 },
			{ date: "Feb '25", value: 950 },
		],
		breakdown: [
			{
				label: "Critical",
				value: 0,
				color: "#dc2626",
				icon: AlertTriangle,
			},
			{ label: "High", value: 0, color: "#f59e42", icon: FileWarning },
			{ label: "Medium", value: 0, color: "#fbbf24", icon: FolderKanban },
			{ label: "Low", value: 0, color: "#22c55e", icon: CheckCircle2 },
		],
	},
];

export default function CustomerSummary() {
	// Filter sidebar state
	const [openFilterSidebar, setOpenFilterSidebar] = React.useState(false);
	const [labelMatchType, setLabelMatchType] = React.useState("any");
	const [labelSearch, setLabelSearch] = React.useState("");
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
				<PageHeader
					title={
						<div>
							<h2 className="text-2xl font-bold flex items-center gap-2">
								<Building2 className="w-6 h-6 text-muted-foreground" />{" "}
								Customer Summary
							</h2>
							<div className="flex items-center gap-2">
								<Avatar>
									<AvatarFallback>
										{customer.name[0]}
									</AvatarFallback>
								</Avatar>
								<span className="text-md flex items-center gap-2">
									<Building2 className="w-5 h-5 text-muted-foreground" />
									{customer.name}
									<Link
										to={"#"}
										className="text-xs flex items-center gap-1 hover:underline text-blue-500"
									>
										<Globe className="w-3 h-3" />{" "}
										{customer.domain}
									</Link>
								</span>
							</div>
						</div>
					}
					actions={
						<>
							<Button
								variant="outline"
								onClick={() => setOpenFilterSidebar(true)}
							>
								Apply Filter <Filter className="w-4 h-4" />
							</Button>
							<Button
								variant="outline"
								onClick={() => setOpenExportDialog(true)}
							>
								Export <Download className="w-4 h-4" />
							</Button>
						</>
					}
				/>
				<RiskOverview />
				<CompanyProfile />
				<SubsidiariesTable />
				<RiskManagementSection />
				{sectionData.map((section) => (
					<SectionCard key={section.title} section={section} />
				))}

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
									onChange={(e) =>
										setLabelSearch(e.target.value)
									}
								/>
							</div>
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
			</div>
		</SidebarLayout>
	);
}
