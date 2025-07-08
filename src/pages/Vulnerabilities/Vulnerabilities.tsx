import SidebarLayout from "@/layouts/sidebar-layout";
import { useState } from "react";
import {
	Filter,
	Download,
	InfoIcon,
	ChevronDown,
	ChevronUp,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import ExportDialog from "@/components/ExportDialog";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import VulnerabilitiesFilterSidebar from "@/components/vulnerabilities/VulnerabilitiesFilterSidebar";
import VulnerabilitiesDataTable from "@/components/vulnerabilities/VulnerabilitiesDataTable";
import type { ColumnDef } from "@tanstack/react-table";

// Dummy vulnerabilities data matching the images
const vulnerabilitiesData = [
	{
		cvss: 6.1,
		cvssColor: "orange-500",
		epss: 11.8,
		cveId: "CVE-2020-11023",
		verified: false,
		known: true,
		software: "Jquery",
		softwareVersion: "Jquery 2.0.3",
		domains: ["admin-rewardsconnect.adani.com", "gvk.com"],
		firstDetected: "Aug 22, 2024",
		remediation: false,
		description: `In jQuery versions greater than or equal to 1.0.3 and before 3.5.0, passing HTML containing <option> elements from untrusted sources - even after sanitizing it - to one of jQuery's DOM manipulation methods (i.e. .html(), .append(), and others) may execute untrusted code. This problem is patched in jQuery 3.5.0.`,
		learnMore: "#",
	},
	{
		cvss: 9.8,
		cvssColor: "red-600",
		epss: 58.2,
		cveId: "CVE-2023-38408",
		verified: false,
		known: false,
		software: "OpenSSH",
		softwareVersion: "OpenSSH",
		domains: ["gvk.com"],
		firstDetected: "Apr 24, 2025",
		remediation: false,
		description: "",
		learnMore: "#",
	},
	{
		cvss: 7.8,
		cvssColor: "orange-500",
		epss: 66.1,
		cveId: "CVE-2020-15778",
		verified: false,
		known: false,
		software: "OpenSSH",
		softwareVersion: "OpenSSH",
		domains: ["gvk.com"],
		firstDetected: "Apr 24, 2025",
		remediation: false,
		description: "",
		learnMore: "#",
	},
	{
		cvss: 7.0,
		cvssColor: "orange-500",
		epss: 0.3,
		cveId: "CVE-2021-41617",
		verified: false,
		known: false,
		software: "OpenSSH",
		softwareVersion: "OpenSSH",
		domains: ["gvk.com"],
		firstDetected: "Apr 24, 2025",
		remediation: false,
		description: "",
		learnMore: "#",
	},
	{
		cvss: 6.8,
		cvssColor: "orange-500",
		epss: 56.7,
		cveId: "CVE-2025-26465",
		verified: false,
		known: false,
		software: "OpenSSH",
		softwareVersion: "OpenSSH",
		domains: ["gvk.com"],
		firstDetected: "Apr 24, 2025",
		remediation: false,
		description: "",
		learnMore: "#",
	},
	{
		cvss: 6.8,
		cvssColor: "orange-500",
		epss: 48.5,
		cveId: "CVE-2019-6110",
		verified: false,
		known: false,
		software: "OpenSSH",
		softwareVersion: "OpenSSH",
		domains: ["gvk.com"],
		firstDetected: "Apr 24, 2025",
		remediation: false,
		description: "",
		learnMore: "#",
	},
];

export default function Vulnerabilities() {
	const [showInfo, setShowInfo] = useState(true);
	const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
	const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
	const [exportFormat, setExportFormat] = useState<"pdf" | "excel">("pdf");
	const [exportFrequency, setExportFrequency] = useState<
		"once" | "recurring"
	>("once");
	const [exportDelivery, setExportDelivery] = useState<"email" | "save">(
		"save"
	);
	const [search, setSearch] = useState("");
	const [expanded, setExpanded] = useState<number | null>(null);

	// Add expand/collapse column
	const vulnerabilitiesColumns: ColumnDef<any>[] = [
		{
			id: "expand",
			header: "",
			cell: ({ row }: { row: any }) => (
				<Button
					variant="ghost"
					size="icon"
					onClick={() =>
						setExpanded(expanded === row.index ? null : row.index)
					}
					aria-label={expanded === row.index ? "Collapse" : "Expand"}
				>
					{expanded === row.index ? (
						<ChevronUp className="w-4 h-4" />
					) : (
						<ChevronDown className="w-4 h-4" />
					)}
				</Button>
			),
		},
		{
			header: "CVSS",
			accessorKey: "cvss",
			cell: ({ row }: { row: any }) => (
				<span
					className={`font-semibold text-${row.original.cvssColor}`}
				>
					{row.original.cvss}
				</span>
			),
		},
		{
			header: "EPSS",
			accessorKey: "epss",
			cell: ({ row }: { row: any }) => <span>{row.original.epss}%</span>,
		},
		{
			header: "CVE ID",
			accessorKey: "cveId",
			cell: ({ row }: { row: any }) => (
				<span className="font-mono font-medium">
					{row.original.cveId}
				</span>
			),
		},
		{
			header: "Verified status",
			accessorKey: "verified",
			cell: ({ row }: { row: any }) => (
				<div className="flex gap-2">
					<span className="bg-muted px-2 py-0.5 rounded text-xs">
						Unverified
					</span>
					{row.original.known && (
						<span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs">
							Known
						</span>
					)}
				</div>
			),
		},
		{
			header: "Vulnerable software",
			accessorKey: "software",
			cell: ({ row }: { row: any }) => (
				<span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">
					{row.original.software}
				</span>
			),
		},
		{
			header: "First Detected",
			accessorKey: "firstDetected",
			cell: ({ row }: { row: any }) => (
				<span>{row.original.firstDetected}</span>
			),
		},
		{
			header: "Domains & IPs",
			accessorKey: "domains",
			cell: ({ row }: { row: any }) => (
				<span>
					{row.original.domains.length} domain
					{row.original.domains.length > 1 ? "s" : ""}/IP
					{row.original.domains.length > 1 ? "s" : ""}
				</span>
			),
		},
	];

	return (
		<SidebarLayout
			breadcrumbs={[
				{
					label: "Vulnerabilities",
					href: "/customer-portfolio/adani-group/vulnerabilities",
				},
			]}
		>
			<div className="flex flex-col gap-4 flex-1">
				<PageHeader
					title="Vulnerabilities"
					info={
						showInfo
							? "This page lists vulnerabilities identified from information exposed in HTTP headers, website content, and open ports. Verified vulnerabilities are exploitable, while unverified vulnerabilities may be exploitable under certain conditions."
							: ""
					}
					actions={
						<>
							<Button
								variant="outline"
								onClick={() => setIsExportDialogOpen(true)}
							>
								<Download className="w-4 h-4" /> Export
							</Button>
							<Button
								variant="outline"
								onClick={() => setShowInfo((v) => !v)}
							>
								<InfoIcon className="w-4 h-4" /> Info
							</Button>
						</>
					}
				/>
				{/* Search and Apply filters row */}
				<div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-2">
					<div className="relative w-full sm:w-auto">
						<Input
							placeholder="Search..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="h-8 w-full sm:w-48 pl-8"
						/>
						<Filter className="absolute left-2 top-2 w-4 h-4 text-muted-foreground pointer-events-none" />
					</div>
					<Button
						variant="outline"
						onClick={() => setIsFilterSidebarOpen(true)}
						className="w-full sm:w-auto"
					>
						<Filter className="w-4 h-4" /> Apply filters
					</Button>
				</div>
				<VulnerabilitiesFilterSidebar
					open={isFilterSidebarOpen}
					onOpenChange={setIsFilterSidebarOpen}
				/>
				<ExportDialog
					open={isExportDialogOpen}
					onOpenChange={setIsExportDialogOpen}
					exportFormat={exportFormat}
					setExportFormat={setExportFormat}
					exportFrequency={exportFrequency}
					setExportFrequency={setExportFrequency}
					exportDelivery={exportDelivery}
					setExportDelivery={setExportDelivery}
				/>
				<VulnerabilitiesDataTable
					columns={vulnerabilitiesColumns}
					data={vulnerabilitiesData}
					expanded={expanded}
					setExpanded={setExpanded}
				/>
			</div>
		</SidebarLayout>
	);
}
