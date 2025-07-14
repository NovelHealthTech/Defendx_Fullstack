import React, { useState, useEffect } from "react";
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
	Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

import PageHeader from "@/components/PageHeader";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { CardTitle } from "@/components/ui/card";
import { Link, useParams } from "react-router";
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
import axios from "axios";

// API Types
interface ApiDomain {
	hostname: string;
	active: boolean;
	primary_domain: boolean;
	automated_score?: number;
	scanned_at?: string;
}

interface CheckResult {
	id: string;
	pass: boolean;
	expected: Array<{
		property: string;
		value: string;
	}>;
	actual: Array<{
		property: string;
		value: string;
	}>;
	severity: number;
	severityName: string;
	category: string;
	title: string;
	description: string;
	checked_at: string;
	sources: string[];
	riskType: string;
	riskSubtype: string;
}

interface DomainDetailResponse {
	success: boolean;
	data: {
		hostname: string;
		scanned_at: string;
		a_records: string[];
		automated_score: number;
		check_results: CheckResult[];
	};
}

interface ApiResponse {
	success: boolean;
	data: {
		domains: ApiDomain[];
	};
}

// Helper function to convert API domain to our Domain type
const convertApiDomainToDomain = (apiDomain: ApiDomain, index: number): Domain => {
	const getGradeFromScore = (score?: number): string => {
		if (!score) return "";
		if (score >= 800) return "A";
		if (score >= 700) return "B";
		if (score >= 600) return "C";
		if (score >= 500) return "D";
		return "F";
	};

	const formatScanDate = (dateString?: string): string => {
		if (!dateString) return "";
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric"
		});
	};

	return {
		id: index + 1,
		domain: apiDomain.hostname,
		primary: apiDomain.primary_domain,
		inactive: !apiDomain.active,
		score: apiDomain.automated_score || null,
		grade: apiDomain.automated_score ? getGradeFromScore(apiDomain.automated_score) : null,
		scannedOn: apiDomain.scanned_at ? formatScanDate(apiDomain.scanned_at) : null,
		maxScore: 950,
	};
};

const customer = {
	name: "Customer",
	domain: "",
	industry: "Technology",
	rating: 794,
	ratingGrade: "B",
	ratingMax: 950,
	employees: 29200,
	headquarters: "Global",
};

export default function Domains() {
	const { domains: customerDomain } = useParams();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [allDomains, setAllDomains] = useState<Domain[]>([]);
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
	const [selectedIp] = useState<IPAddress | null>(null);
	const [selectedIpRange, setSelectedIpRange] = useState<IPRange | null>(
		null
	);
	const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
	const [showInfo, setShowInfo] = useState(true);
	const [loadingDomainDetails, setLoadingDomainDetails] = useState(false);

	// API call to fetch domain details
	const fetchDomainDetails = async (domain: Domain): Promise<DomainDetailResponse | null> => {
		try {
			setLoadingDomainDetails(true);

			const token = localStorage.getItem("token");
			const vendorPrimaryHostname = localStorage.getItem("customerDomain") || customerDomain;

			if (!token) {
				throw new Error("No authentication token found");
			}

			if (!vendorPrimaryHostname) {
				throw new Error("No vendor primary hostname found");
			}

			const response = await axios.post<DomainDetailResponse>(
				"https://cyber.defendx.co.in/api/upguard/get-vendor-domain-detail",
				{
					vendor_primary_hostname: vendorPrimaryHostname,
					hostname: domain.domain
				},
				{
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${token}`
					}
				}
			);

			if (response.data.success) {
				return response.data;
			} else {
				throw new Error("Invalid response format");
			}
		} catch (err) {
			console.error("Error fetching domain details:", err);
			if (axios.isAxiosError(err)) {
				const errorMessage = err.response?.data?.message || err.message || 'Unknown API error';
				console.error("API Error:", errorMessage);
			} else {
				console.error("Unexpected error:", err instanceof Error ? err.message : String(err));
			}
			return null;
		} finally {
			setLoadingDomainDetails(false);
		}
	};

	// API call to fetch domains
	const fetchDomains = async () => {
		try {
			setLoading(true);
			setError(null);

			const token = localStorage.getItem("token");
			const storedCustomerDomain = localStorage.getItem("customerDomain");
			
			// Use customerDomain from URL params or fallback to localStorage
			const domainToQuery = customerDomain || storedCustomerDomain;

			if (!token) {
				throw new Error("No authentication token found");
			}

			if (!domainToQuery) {
				throw new Error("No customer domain found");
			}

			const response = await axios.post<ApiResponse>(
				"https://cyber.defendx.co.in/api/upguard/get-vendor-domain",
				{
					hostname: domainToQuery
				},
				{
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${token}`
					}
				}
			);

			if (response.data.success && response.data.data.domains) {
				const convertedDomains = response.data.data.domains.map(convertApiDomainToDomain);
				setAllDomains(convertedDomains);
				
				// Update customer info with the domain
				customer.domain = domainToQuery;
				customer.name = `Customer - ${domainToQuery}`;
			} else {
				throw new Error("Invalid response format");
			}
		} catch (err) {
			console.error("Error fetching domains:", err);
			if (axios.isAxiosError(err)) {
				const errorMessage = err.response?.data?.message || err.message || 'Unknown API error';
				setError(`API Error: ${errorMessage}`);
			} else {
				const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
				setError(errorMessage);
			}
		} finally {
			setLoading(false);
		}
	};

	// Load data on component mount
	useEffect(() => {
		fetchDomains();
	}, [customerDomain]);

	// Filter domains based on activity status
	const activeDomains = allDomains.filter(domain => !domain.inactive);
	const inactiveDomains = allDomains.filter(domain => domain.inactive);
	const totalDomains = allDomains;

	// Mock data fallback (keep original data structure for development)
	const mockActiveDomains: Domain[] = [
		{
			id: 1,
			domain: "example.com",
			primary: true,
			score: 722,
			grade: "B",
			scannedOn: "Jun 20, 2025",
			firstScanned: "May 11, 2020 11:59",
			maxScore: 950,
			scannedOnTime: "23:45",
		},
	];

	// Use API data if available, otherwise fall back to mock data
	const displayActiveDomains = loading ? [] : (activeDomains.length > 0 ? activeDomains : mockActiveDomains);
	const displayInactiveDomains = loading ? [] : inactiveDomains;
	const displayTotalDomains = loading ? [] : totalDomains;

	const handleDomainRowClick = async (domain: Domain) => {
		// Check if domain is inactive
		if (domain.inactive) {
			alert('Domain details are only available for active domains.');
			return;
		}
		
		// Only fetch details for active domains
		const domainDetails = await fetchDomainDetails(domain);
		if (domainDetails) {
			// Enhance the domain object with detailed information
			const enhancedDomain: Domain = {
				...domain,
				ipAddresses: domainDetails.data.a_records.map(ip => ({
					ip,
					domains: [domain.domain]
				})),
				risks: domainDetails.data.check_results.map(result => ({
					title: result.title,
					severity: (result.severityName?.toLowerCase() || 'low') as "low" | "medium" | "high",
					description: result.description
				})),
				scannedAt: domainDetails.data.scanned_at,
				checkResults: domainDetails.data.check_results
			};
			setSelectedDomain(enhancedDomain);
		} else {
			// Fallback to basic domain info if API fails
			setSelectedDomain(domain);
		}
	};

	const handleCloseDetails = () => {
		setSelectedDomain(null);
	};

	const handleCloseIpRangeDetails = () => {
		setSelectedIpRange(null);
	};

	if (loading) {
		return (
			<SidebarLayout
				breadcrumbs={[
					{
						label: "Domains",
						href: "/domains",
					},
				]}
			>
				<div className="flex items-center justify-center h-64">
					<div className="flex items-center gap-2">
						<Loader2 className="w-6 h-6 animate-spin" />
						<span>Loading domains...</span>
					</div>
				</div>
			</SidebarLayout>
		);
	}

	if (error) {
		return (
			<SidebarLayout
				breadcrumbs={[
					{
						label: "Domains",
						href: "/domains",
					},
				]}
			>
				<div className="flex items-center justify-center h-64">
					<div className="text-center">
						<p className="text-red-600 mb-4">Error loading domains: {error}</p>
						<Button onClick={fetchDomains}>
							<RotateCw className="w-4 h-4 mr-2" />
							Retry
						</Button>
					</div>
				</div>
			</SidebarLayout>
		);
	}

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
				onValueChange={() => {}}
			>
				<TabsList className="mb-2 h-auto p-2 w-full">
					<TabsTrigger
						value="total-domains"
						className="flex-col h-auto py-1"
					>
						{displayTotalDomains.length}
						<small>Total Domains Scanned</small>
					</TabsTrigger>
					<TabsTrigger
						value="active-domains"
						className="flex-col h-auto py-1"
					>
						{displayActiveDomains.length}
						<small>Active Domains</small>
					</TabsTrigger>
					<TabsTrigger
						value="inactive-domains"
						className="flex-col h-auto py-1"
					>
						{displayInactiveDomains.length}
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
									<th className="py-2 px-4 font-normal" />
								</tr>
							</thead>
							<tbody>
								{displayTotalDomains.map((d) => (
									<tr
										key={d.id}
										className="border-b last:border-0 cursor-pointer hover:bg-muted/50"
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
												{loadingDomainDetails && selectedDomain?.id === d.id && (
													<Loader2 className="w-4 h-4 animate-spin" />
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
								</tr>
							</thead>
							<tbody>
								{displayActiveDomains.map((d) => (
									<tr
										key={d.id}
										className="border-b last:border-0 cursor-pointer hover:bg-muted/50"
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
												{loadingDomainDetails && selectedDomain?.id === d.id && (
													<Loader2 className="w-4 h-4 animate-spin" />
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
									<th className="py-2 px-4 font-normal" />
								</tr>
							</thead>
							<tbody>
								{displayInactiveDomains.map((d) => (
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
