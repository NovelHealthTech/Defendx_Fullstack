import React, { useState } from "react";
import SidebarLayout from "@/layouts/sidebar-layout";
import { Button } from "@/components/ui/button";
import {
	Download,
	ExternalLink,
	Filter,
	Globe,
	ChevronDown,
	Info,
	ArrowUp,
	RotateCw,
	Check,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

import PageHeader from "@/components/PageHeader";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { CardTitle } from "@/components/ui/card";
import { Link } from "react-router";
import ExportDialog from "@/components/ExportDialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

import DrawerSheet from "@/components/DrawerSheet";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CustomAccordion from "@/components/CustomAccordion";
import type { Domain, IPAddress, IPRange } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import IPAddressDetails from "../IPAddresses/IPAddressDetails";
import IPRangeDetails from "../IPAddresses/IPRangeDetails";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import DomainDetails from "@/components/domains/DomainDetails";

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

export default function Domains() {
	const [openFilterSidebar, setOpenFilterSidebar] = React.useState(false);
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
	const [labelMatchType, setLabelMatchType] = useState("any");
	const [labelSearch, setLabelSearch] = useState("");
	const [findingSearch, setFindingSearch] = useState("");
	const [selectedIp, setSelectedIp] = useState<IPAddress | null>(null);
	const [activeTab, setActiveTab] = useState("total-domains");
	const [selectedIpRange, setSelectedIpRange] = useState<IPRange | null>(
		null
	);
	const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
	const [showInfo, setShowInfo] = useState(true);
	const activeDomains: Domain[] = [
		{
			id: 1,
			domain: "adani.com",
			primary: true,
			score: 722,
			grade: "B",
			scannedOn: "Jun 20, 2025",
			firstScanned: "May 11, 2020 11:59",
			maxScore: 950,
			scannedOnTime: "23:45",
			ipAddresses: [
				{
					ip: "23.216.147.197",
					domains: ["adani.com", "www.adani.com"],
				},
				{
					ip: "23.216.147.202",
					domains: ["adani.com", "www.adani.com"],
				},
			],
			risks: [
				{
					title: "HTTP Strict Transport Security (HSTS) not enforced",
					severity: "high",
					description: "HSTS is not enforced on this domain.",
				},
				{
					title: "X-Frame-Options is not deny or sameorigin",
					severity: "high",
					description:
						"X-Frame-Options header is not configured to deny or sameorigin.",
				},
				{
					title: "Content Security Policy (CSP) not implemented",
					severity: "medium",
					description:
						"The Content Security Policy is not implemented.",
				},
				{
					title: "Missing security.txt file",
					severity: "low",
					description: "The security.txt file was not found.",
				},
				{
					title: "Missing HSTS headers",
					severity: "high",
					description: "The HSTS headers are missing.",
				},
				{
					title: "Cookies without SameSite attribute",
					severity: "medium",
					description: "Cookies are missing the SameSite attribute.",
				},
			],
		},
		{
			id: 2,
			domain: "accacldevpi.adani.com",
			primary: false,
			score: 646,
			grade: "B",
			scannedOn: "Jun 20, 2025",
		},
		{
			id: 3,
			domain: "accaclfioridev.adani.com",
			primary: false,
			score: 646,
			grade: "B",
			scannedOn: "Jun 20, 2025",
		},
		{
			id: 4,
			domain: "accaclpi.adani.com",
			primary: false,
			score: 646,
			grade: "B",
			scannedOn: "Jun 21, 2025",
		},
	];

	const totalDomains: Domain[] = [
		{
			id: 1,
			domain: "adani.com",
			primary: true,
			inactive: false,
			score: 722,
			grade: "B",
			scannedOn: "Jun 20, 2025",
			firstScanned: "May 11, 2020 11:59",
			maxScore: 950,
			scannedOnTime: "23:45",
			ipAddresses: [
				{
					ip: "23.216.147.197",
					domains: ["adani.com", "www.adani.com"],
				},
				{
					ip: "23.216.147.202",
					domains: ["adani.com", "www.adani.com"],
				},
			],
			risks: [
				{
					title: "HTTP Strict Transport Security (HSTS) not enforced",
					severity: "high",
					description: "HSTS is not enforced on this domain.",
				},
				{
					title: "X-Frame-Options is not deny or sameorigin",
					severity: "high",
					description:
						"X-Frame-Options header is not configured to deny or sameorigin.",
				},
				{
					title: "Content Security Policy (CSP) not implemented",
					severity: "medium",
					description:
						"The Content Security Policy is not implemented.",
				},
				{
					title: "Missing security.txt file",
					severity: "low",
					description: "The security.txt file was not found.",
				},
				{
					title: "Missing HSTS headers",
					severity: "high",
					description: "The HSTS headers are missing.",
				},
				{
					title: "Cookies without SameSite attribute",
					severity: "medium",
					description: "Cookies are missing the SameSite attribute.",
				},
			],
		},
		{
			id: 2,
			domain: "10of1._domainkey.adani.com",
			primary: false,
			inactive: true,
			score: null,
			grade: null,
			scannedOn: null,
		},
		{
			id: 3,
			domain: "1601ixevicibi1.adani.com",
			primary: false,
			inactive: true,
			score: null,
			grade: null,
			scannedOn: null,
		},
		{
			id: 4,
			domain: "1601ixevicibi2.adani.com",
			primary: false,
			inactive: true,
			score: null,
			grade: null,
			scannedOn: null,
		},
	];

	const inactiveDomains: Domain[] = [
		{
			id: 1,
			domain: "10of1._domainkey.adani.com",
			primary: false,
			inactive: true,
			score: null,
			grade: null,
			scannedOn: null,
		},
		{
			id: 2,
			domain: "1601ixevicibi1.adani.com",
			primary: false,
			inactive: true,
			score: null,
			grade: null,
			scannedOn: null,
		},
		{
			id: 3,
			domain: "1601ixeviclbi2.adani.com",
			primary: false,
			inactive: true,
			score: null,
			grade: null,
			scannedOn: null,
		},
		{
			id: 4,
			domain: "1601ixevicucm.adani.com",
			primary: false,
			inactive: true,
			score: null,
			grade: null,
			scannedOn: null,
		},
	];

	const handleDomainRowClick = (domain: Domain) => {
		setSelectedDomain(domain);
	};

	const handleCloseDetails = () => {
		setSelectedDomain(null);
	};

	const handleCloseIpRangeDetails = () => {
		setSelectedIpRange(null);
	};

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
					onOpenFilterSidebar={() => setOpenFilterSidebar(true)}
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

			<DrawerSheet
				open={openFilterSidebar}
				onOpenChange={setOpenFilterSidebar}
				className="w-[350px] px-4 sm:min-w-[400px]"
				side="right"
				title="Filter by"
			>
				<div className="space-y-4">
					<CustomAccordion
						items={[
							{
								title: "Label",
								content: (
									<div className="space-y-2">
										<RadioGroup
											value={labelMatchType}
											onValueChange={setLabelMatchType}
											className="flex flex-col gap-1"
										>
											<div className="flex items-center justify-between">
												<label className="flex items-center gap-2 text-sm">
													<RadioGroupItem
														value="any"
														id="label-any"
													/>
													Match any
												</label>
												<Info className="w-4 h-4 text-muted-foreground" />
											</div>
											<div className="flex items-center justify-between">
												<label className="flex items-center gap-2 text-sm">
													<RadioGroupItem
														value="all"
														id="label-all"
													/>
													Match all
												</label>
												<Info className="w-4 h-4 text-muted-foreground" />
											</div>
											<div className="flex items-center justify-between">
												<label className="flex items-center gap-2 text-sm">
													<RadioGroupItem
														value="exclude"
														id="label-exclude"
													/>
													Do not include
												</label>
												<Info className="w-4 h-4 text-muted-foreground" />
											</div>
										</RadioGroup>
										<Input
											type="text"
											placeholder="Type to search labels"
											className="w-full mt-2"
											value={labelSearch}
											onChange={(e) =>
												setLabelSearch(e.target.value)
											}
										/>
									</div>
								),
							},
						]}
					/>
					<CustomAccordion
						items={[
							{
								title: "Finding",
								content: (
									<Input
										type="text"
										placeholder="Type to search for findings"
										className="w-full"
										value={findingSearch}
										onChange={(e) =>
											setFindingSearch(e.target.value)
										}
									/>
								),
							},
						]}
					/>
				</div>
				<div className="flex justify-between gap-2 mt-8 absolute bottom-5 right-5 left-5">
					<Button
						variant="outline"
						className="flex-1"
						onClick={() => {
							setLabelMatchType("any");
							setLabelSearch("");
							setFindingSearch("");
						}}
					>
						<RotateCw className="w-4 h-4 mr-1" /> Reset
					</Button>
					<Button
						className="flex-1"
						onClick={() => setOpenFilterSidebar(false)}
					>
						<Check className="w-4 h-4 mr-1" /> Apply
					</Button>
				</div>
			</DrawerSheet>
			<IPAddressDetails
				isOpen={!!selectedIp}
				onClose={handleCloseDetails}
				ipAddress={selectedIp}
			/>
			<IPRangeDetails
				isOpen={!!selectedIpRange}
				onClose={handleCloseIpRangeDetails}
				ipRange={selectedIpRange}
			/>
			<DomainDetails
				isOpen={!!selectedDomain}
				onClose={handleCloseDetails}
				domain={selectedDomain}
			/>

			<Tabs
				defaultValue="total-domains"
				className="w-full"
				onValueChange={setActiveTab}
			>
				<TabsList className="mb-2 h-auto p-2 w-full">
					<TabsTrigger
						value="total-domains"
						className="flex-col h-auto py-1"
					>
						1234
						<small>Total Domains Scanned</small>
					</TabsTrigger>
					<TabsTrigger
						value="active-domains"
						className="flex-col h-auto py-1"
					>
						284
						<small>Active Domains</small>
					</TabsTrigger>
					<TabsTrigger
						value="inactive-domains"
						className="flex-col h-auto py-1"
					>
						284
						<small>Inactive Domains</small>
					</TabsTrigger>
				</TabsList>
				<TabsContent value="total-domains">
					<div className="overflow-x-auto rounded-lg border bg-card">
						<table className="min-w-full text-sm">
							<thead>
								<tr className="text-muted-foreground border-b">
									<th className="py-2 px-4 font-normal">
										<div className="flex items-center gap-2">
											<Checkbox />
											<ChevronDown className="w-4 h-4" />
										</div>
									</th>
									<th className="text-left py-2 px-4 font-normal">
										<div className="flex items-center gap-1">
											Domain
											<ArrowUp className="w-4 h-4" />
										</div>
									</th>
									<th className="text-left py-2 px-4 font-normal">
										Score
									</th>
									<th className="text-left py-2 px-4 font-normal">
										Scanned on
									</th>
									<th className="text-left py-2 px-4 font-normal">
										Labels
									</th>
									<th className="py-2 px-4 font-normal" />
								</tr>
							</thead>
							<tbody>
								{totalDomains.map((d) => (
									<tr
										key={d.id}
										className="border-b last:border-0 cursor-pointer"
										onClick={() => handleDomainRowClick(d)}
									>
										<td className="py-3 px-4">
											<Checkbox />
										</td>
										<td className="py-3 px-4">
											<div className="flex items-center gap-2">
												<span>{d.domain}</span>
												{d.primary && (
													<Badge
														variant="outline"
														className="rounded-full border-blue-500 text-blue-500 bg-blue-50"
													>
														Primary domain
													</Badge>
												)}
												{d.inactive && (
													<Badge
														variant="outline"
														className="rounded-full"
													>
														Inactive
													</Badge>
												)}
											</div>
										</td>
										<td className="py-3 px-4">
											{d.score && d.grade && (
												<div className="flex items-center gap-2">
													<Badge
														variant="outline"
														className="w-6 h-6 justify-center p-0 rounded-full bg-green-100 text-green-800 border-green-200"
													>
														{d.grade}
													</Badge>
													<span className="text-green-600 font-medium">
														{d.score}
													</span>
												</div>
											)}
										</td>
										<td className="py-3 px-4">
											{d.scannedOn}
										</td>
										<td className="py-3 px-4">
											<Button
												variant="outline"
												size="sm"
												className="border-dashed text-muted-foreground"
											>
												+ Add label
											</Button>
										</td>
										<td className="py-3 px-4 text-center">
											{d.inactive && (
												<Button
													variant="ghost"
													size="icon"
												>
													<RotateCw className="w-4 h-4 text-muted-foreground" />
												</Button>
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</TabsContent>
				<TabsContent value="active-domains">
					<div className="overflow-x-auto rounded-lg border bg-card">
						<table className="min-w-full text-sm">
							<thead>
								<tr className="text-muted-foreground border-b">
									<th className="py-2 px-4 font-normal">
										<div className="flex items-center gap-2">
											<Checkbox />
											<ChevronDown className="w-4 h-4" />
										</div>
									</th>
									<th className="text-left py-2 px-4 font-normal">
										<div className="flex items-center gap-1">
											Domain
											<ArrowUp className="w-4 h-4" />
										</div>
									</th>
									<th className="text-left py-2 px-4 font-normal">
										Score
									</th>
									<th className="text-left py-2 px-4 font-normal">
										Scanned on
									</th>
									<th className="text-left py-2 px-4 font-normal">
										Labels
									</th>
								</tr>
							</thead>
							<tbody>
								{activeDomains.map((d) => (
									<tr
										key={d.id}
										className="border-b last:border-0 cursor-pointer"
										onClick={() => handleDomainRowClick(d)}
									>
										<td className="py-3 px-4">
											<Checkbox />
										</td>
										<td className="py-3 px-4">
											<div className="flex items-center gap-2">
												<span>{d.domain}</span>
												{d.primary && (
													<Badge
														variant="outline"
														className="rounded-full border-blue-500 text-blue-500 bg-blue-50"
													>
														Primary domain
													</Badge>
												)}
											</div>
										</td>
										<td className="py-3 px-4">
											<div className="flex items-center gap-2">
												<Badge
													variant="outline"
													className="w-6 h-6 justify-center p-0 rounded-full bg-green-100 text-green-800 border-green-200"
												>
													{d.grade}
												</Badge>
												<span className="text-green-600 font-medium">
													{d.score}
												</span>
											</div>
										</td>
										<td className="py-3 px-4">
											{d.scannedOn}
										</td>
										<td className="py-3 px-4">
											<Button
												variant="outline"
												size="sm"
												className="border-dashed text-muted-foreground"
											>
												+ Add label
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</TabsContent>
				<TabsContent value="inactive-domains">
					<div className="overflow-x-auto rounded-lg border bg-card">
						<table className="min-w-full text-sm">
							<thead>
								<tr className="text-muted-foreground border-b">
									<th className="py-2 px-4 font-normal">
										<div className="flex items-center gap-2">
											<Checkbox />
											<ChevronDown className="w-4 h-4" />
										</div>
									</th>
									<th className="text-left py-2 px-4 font-normal">
										<div className="flex items-center gap-1">
											Domain
											<ArrowUp className="w-4 h-4" />
										</div>
									</th>
									<th className="text-left py-2 px-4 font-normal">
										Labels
									</th>
									<th className="py-2 px-4 font-normal" />
								</tr>
							</thead>
							<tbody>
								{inactiveDomains.map((d) => (
									<tr
										key={d.id}
										className="border-b last:border-0 cursor-pointer"
										onClick={() => handleDomainRowClick(d)}
									>
										<td className="py-3 px-4">
											<Checkbox />
										</td>
										<td className="py-3 px-4">
											<div className="flex items-center gap-2">
												<span>{d.domain}</span>
												<Badge
													variant="outline"
													className="rounded-full"
												>
													Inactive
												</Badge>
											</div>
										</td>
										<td className="py-3 px-4">
											<Button
												variant="outline"
												size="sm"
												className="border-dashed text-muted-foreground"
											>
												+ Add label
											</Button>
										</td>
										<td className="py-3 px-4 text-center">
											<Button variant="ghost" size="icon">
												<RotateCw className="w-4 h-4 text-muted-foreground" />
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<Pagination className="mt-4">
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious />
							</PaginationItem>
							<PaginationItem>
								<PaginationLink isActive>1</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink>2</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink>3</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
							<PaginationItem>
								<PaginationNext />
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</TabsContent>
			</Tabs>
		</SidebarLayout>
	);
}

// Reusable Section Components
function CustomerHeader({
	onOpenExportDialog,
	onOpenFilterSidebar,
	showInfo,
	setShowInfo,
}: {
	onOpenExportDialog: () => void;
	onOpenFilterSidebar: () => void;
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
				title="Domains"
				info={
					showInfo
						? "Your customer's IP addresses helps you instantly to understand their security posture. Monnitor your customer's IP addresses to ensure they are compliant with your security policies, drill into their IP addresses to understand their security posture and take action to improve their security posture."
						: null
				}
				actions={
					<>
						<Button variant="outline" onClick={onOpenExportDialog}>
							Export <Download className="w-4 h-4" />
						</Button>
						<Button
							variant="outline"
							size="sm"
							className="flex items-center gap-1"
							onClick={onOpenFilterSidebar}
						>
							Apply Filter <Filter className="w-4 h-4" />
						</Button>
						<Button
							variant="outline"
							size="sm"
							className="flex items-center gap-1"
							onClick={() => setShowInfo(!showInfo)}
						>
							<Info className="w-4 h-4" />
						</Button>
					</>
				}
			/>
			<p className="text-sm text-muted-foreground/80 flex items-center gap-1">
				View Support Articles <ExternalLink className="w-4 h-4" />
			</p>

			<Separator className="my-4" />
		</>
	);
}

// Tabs
