import React, { useState } from "react";
import SidebarLayout from "@/layouts/sidebar-layout";
import { Button } from "@/components/ui/button";
import {
	Download,
	ExternalLink,
	Globe,
	Info,
	RotateCw,
	Check,
} from "lucide-react";

import PageHeader from "@/components/PageHeader";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { CardTitle, Card, CardHeader } from "@/components/ui/card";
import { Link } from "react-router";
import ExportDialog from "@/components/ExportDialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/DataTable";
import type { ColumnDef } from "@tanstack/react-table";

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

export default function Remediation() {
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
	const [status, setStatus] = useState("active");
	const [search, setSearch] = useState("");
	const [showInfo, setShowInfo] = useState(true);
	// Mock remediation requests data
	const requests = [
		{
			id: "1",
			name: "Update SSL Certificate",
			risksOpen: 2,
			assets: 5,
			lastUpdated: "2024-06-01",
			due: "2024-06-10",
			status: "active",
			percentComplete: 40,
			messages: 1,
		},
		{
			id: "2",
			name: "Patch NGINX Servers",
			risksOpen: 1,
			assets: 3,
			lastUpdated: "2024-05-28",
			due: "2024-06-15",
			status: "in-progress",
			percentComplete: 60,
			messages: 2,
		},
		{
			id: "3",
			name: "Renew Domain Certificates",
			risksOpen: 0,
			assets: 2,
			lastUpdated: "2024-05-20",
			due: "2024-06-05",
			status: "completed",
			percentComplete: 100,
			messages: 0,
		},
		// Add more mock data as needed
	];

	const statusMap = {
		active: "Active",
		"in-progress": "In progress",
		"awaiting-review": "Awaiting review",
		completed: "Completed",
		archived: "Archived",
		drafts: "Drafts",
	};

	const filteredRequests = requests.filter(
		(r) =>
			(status === "active"
				? r.status === "active"
				: r.status === status) &&
			(search === "" ||
				r.name.toLowerCase().includes(search.toLowerCase()))
	);

	// Define columns for DataTable
	const columns: ColumnDef<(typeof requests)[0]>[] = [
		{
			accessorKey: "name",
			header: () => <span>Request name</span>,
			cell: ({ row }) => (
				<span className="font-medium">{row.original.name}</span>
			),
		},
		{
			accessorKey: "risksOpen",
			header: () => <span>Risks open</span>,
			cell: ({ row }) => row.original.risksOpen,
		},
		{
			accessorKey: "assets",
			header: () => <span>Assets</span>,
			cell: ({ row }) => row.original.assets,
		},
		{
			accessorKey: "lastUpdated",
			header: () => <span>Last updated</span>,
			cell: ({ row }) => row.original.lastUpdated,
		},
		{
			accessorKey: "due",
			header: () => <span>Due</span>,
			cell: ({ row }) => row.original.due,
		},
		{
			accessorKey: "status",
			header: () => <span>Status</span>,
			cell: ({ row }) =>
				statusMap[row.original.status as keyof typeof statusMap] ||
				row.original.status,
		},
		{
			accessorKey: "percentComplete",
			header: () => <span>% complete</span>,
			cell: ({ row }) => `${row.original.percentComplete}%`,
		},
		{
			accessorKey: "messages",
			header: () => <span>Messages</span>,
			cell: ({ row }) => row.original.messages,
		},
	];

	return (
		<SidebarLayout
			breadcrumbs={[
				{
					label: "Domains",
					href: "/domains",
				},
			]}
		>
			<div className="space-y-4">
				<CustomerHeader
					onOpenExportDialog={() => setOpenExportDialog(true)}
					showInfo={showInfo}
					setShowInfo={setShowInfo}
				/>
			</div>

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

			<Card className="p-6 mt-4">
				<CardHeader className="px-0">
					<div className="flex items-center justify-between">
						<CardTitle>Remediation Requests</CardTitle>
						<Link to="/remediation/create">
							<Button className="ml-auto" variant="default">
								+ Request remediation
							</Button>
						</Link>
					</div>
				</CardHeader>
				<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
					<div className="flex gap-2">
						<Tabs value={status} onValueChange={setStatus}>
							<TabsList className="bg-muted">
								<TabsTrigger value="active">
									Active (
									{
										requests.filter(
											(r) => r.status === "active"
										).length
									}
									)
								</TabsTrigger>
								<TabsTrigger value="in-progress">
									In progress (
									{
										requests.filter(
											(r) => r.status === "in-progress"
										).length
									}
									)
								</TabsTrigger>
								<TabsTrigger value="awaiting-review">
									Awaiting review (
									{
										requests.filter(
											(r) =>
												r.status === "awaiting-review"
										).length
									}
									)
								</TabsTrigger>
								<TabsTrigger value="completed">
									Completed (
									{
										requests.filter(
											(r) => r.status === "completed"
										).length
									}
									)
								</TabsTrigger>
								<TabsTrigger value="archived">
									Archived (
									{
										requests.filter(
											(r) => r.status === "archived"
										).length
									}
									)
								</TabsTrigger>
								<TabsTrigger value="drafts">
									Drafts (
									{
										requests.filter(
											(r) => r.status === "drafts"
										).length
									}
									)
								</TabsTrigger>
							</TabsList>
						</Tabs>
					</div>
					<div className="flex gap-2 items-center">
						<Input
							placeholder="Search remediation requests"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="w-72"
							aria-label="Search remediation requests"
						/>
					</div>
				</div>
				<div className="overflow-x-auto">
					<DataTable columns={columns} data={filteredRequests} />
				</div>
			</Card>
		</SidebarLayout>
	);
}

// Reusable Section Components
function CustomerHeader({
	onOpenExportDialog,
	showInfo,
	setShowInfo,
}: {
	onOpenExportDialog: () => void;
	showInfo: boolean;
	setShowInfo: (showInfo: boolean) => void;
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
				title="Remediation"
				info={
					showInfo
						? "Request remediation for risks identified through automated scanning, security questionnaires, and additional evidence to remove them from the customer's risk profile. Or, adjust the severity of risks raised in security questionnaires and evidence."
						: null
				}
				actions={
					<>
						<Button variant="outline" onClick={onOpenExportDialog}>
							Export <Download className="w-4 h-4" />
						</Button>
						<Button
							variant="outline"
							onClick={() => setShowInfo(!showInfo)}
						>
							<Info className="w-4 h-4" />
						</Button>
					</>
				}
			/>
			<p className="text-sm text-muted-foreground/80 flex items-center gap-1">
				Learn more about risk remediation{" "}
				<ExternalLink className="w-4 h-4" />
			</p>

			<Separator className="my-4" />
		</>
	);
}

// Tabs
