import React, { useState, useEffect } from "react";
import SidebarLayout from "@/layouts/sidebar-layout";
import { Button } from "@/components/ui/button";
import {
	Download,
	ExternalLink,
	Filter,
	Globe,
	Search,
	Trash2,
	ChevronRight,
	Info,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

import PageHeader from "@/components/PageHeader";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CardTitle } from "@/components/ui/card";
import { Link, useParams } from "react-router";
import ExportDialog from "@/components/ExportDialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import DrawerSheet from "@/components/DrawerSheet";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CustomAccordion from "@/components/CustomAccordion";
import IPAddressDetails from "./IPAddressDetails";
import type { IPAddress, IPAddressDetail } from "@/lib/types";
import apiClient from "@/utils/apiInterceptor";
import { TableLoader } from "@/components/ui/loader";

// API Types
interface ApiIPResponse {
	success: boolean;
	data: {
		ips: IPAddress[];
	};
}

interface ApiIPDetailResponse {
	success: boolean;
	data: IPAddressDetail;
	http_code: number;
}

export default function IPAddresses() {
	const { hostname } = useParams();
	const [search, setSearch] = useState("");
	const [ipAddressesData, setIpAddressesData] = useState<IPAddress[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [customerDomain, setCustomerDomain] = useState<string>("");
	// const [isMonitorDialogOpen, setIsMonitorDialogOpen] = useState(false);
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
	const [sourceSearch, setSourceSearch] = useState("");
	const [servicesSearch, setServicesSearch] = useState("");
	const [ipOwnerSearch, setIpOwnerSearch] = useState("");
	const [asnSearch, setAsnSearch] = useState("");
	const [ipCountrySearch, setIpCountrySearch] = useState("");
	const [selectedIp, setSelectedIp] = useState<IPAddress | null>(null);
	const [selectedIpDetail, setSelectedIpDetail] = useState<IPAddressDetail | null>(null);
	const [loadingDetail, setLoadingDetail] = useState(false);
	const [showInfo, setShowInfo] = useState(true);
	const handleRowClick = (ip: IPAddress) => {
		setSelectedIp(ip);
		fetchIPDetail(ip.ip);
	};

	const handleCloseDetails = () => {
		setSelectedIp(null);
		setSelectedIpDetail(null);
	};

	// API Functions
	const fetchIPAddresses = async (customerHostname: string) => {
		setLoading(true);
		setError(null);
		try {
			const response = await apiClient.post<ApiIPResponse>(
				'https://cyber.defendx.co.in/api/upguard/get-vendor-ip',
				{ hostname: customerHostname },
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (response.data.success) {
				// Transform API response to match our component structure
				const transformedData: IPAddress[] = response.data.data.ips.map((ip: any) => ({
					...ip,
					labels: [], // Initialize empty labels array
					services: ip.services || [], // Ensure services is always an array
					sources: ip.sources || [], // Ensure sources is always an array
				}));
				setIpAddressesData(transformedData);
			} else {
				throw new Error('Failed to fetch IP addresses');
			}
		} catch (err) {
			console.error('Error fetching IP addresses:', err);
			setError(err instanceof Error ? err.message : 'Failed to fetch IP addresses');
			setIpAddressesData([]); // Reset to empty array on error
		} finally {
			setLoading(false);
		}
	};

	const fetchIPDetail = async (ip: string) => {
		setLoadingDetail(true);
		try {
			const response = await apiClient.post<ApiIPDetailResponse>(
				'https://cyber.defendx.co.in/api/upguard/get-vendor-ip-detail',
				{ 
					vendor_primary_hostname: customerDomain,
					ip: ip 
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (response.data.success) {
				setSelectedIpDetail(response.data.data);
			} else {
				throw new Error('Failed to fetch IP details');
			}
		} catch (err) {
			console.error('Error fetching IP details:', err);
		} finally {
			setLoadingDetail(false);
		}
	};

	// Use useEffect to fetch data when component mounts or hostname changes
	useEffect(() => {
		// For now, we'll use a default hostname. In a real app, this would come from route params or props
		const defaultHostname = localStorage.getItem("customerDomain") || "";
		setCustomerDomain(defaultHostname);
		fetchIPAddresses(defaultHostname);
	}, [hostname]);

	return (
		<SidebarLayout
			breadcrumbs={[
				{
					label: "IP Addresses",
					href: "/ip-addresses",
				},
			]}
		>
			<div className="space-y-4">
				<CustomerHeader
					onOpenExportDialog={() => setOpenExportDialog(true)}
					showInfo={showInfo}
					setShowInfo={setShowInfo}
					domain={customerDomain}
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
				<div className="space-y-2">
					<CustomAccordion
						items={[
							{
								title: "Label",
								content: (
									<div className="space-y-2">
										<RadioGroup
											value={labelMatchType}
											onValueChange={
												setLabelMatchType
											}
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
										<Input
											type="text"
											placeholder="Type to search labels"
											className="w-full mt-2"
											value={labelSearch}
											onChange={(e) =>
												setLabelSearch(
													e.target.value
												)
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
								title: "Source",
								content: (
									<Input
										type="text"
										placeholder="Type to search for source"
										className="w-full"
										value={sourceSearch}
										onChange={(e) =>
											setSourceSearch(
												e.target.value
											)
										}
									/>
								),
							},
						]}
					/>
					<CustomAccordion
						items={[
							{
								title: "Services",
								content: (
									<Input
										type="text"
										placeholder="Type to search for service"
										className="w-full"
										value={servicesSearch}
										onChange={(e) =>
											setServicesSearch(
												e.target.value
											)
										}
									/>
								),
							},
						]}
					/>
					<CustomAccordion
						items={[
							{
								title: "IP owner",
								content: (
									<Input
										type="text"
										placeholder="Type to search for owner"
										className="w-full"
										value={ipOwnerSearch}
										onChange={(e) =>
											setIpOwnerSearch(
												e.target.value
											)
										}
									/>
								),
							},
						]}
					/>
					<CustomAccordion
						items={[
							{
								title: "ASN",
								content: (
									<Input
										type="text"
										placeholder="Type to search for ASN"
										className="w-full"
										value={asnSearch}
										onChange={(e) =>
											setAsnSearch(e.target.value)
										}
									/>
								),
							},
						]}
					/>
					<CustomAccordion
						items={[
							{
								title: "IP country",
								content: (
									<Input
										type="text"
										placeholder="Type to search for country"
										className="w-full"
										value={ipCountrySearch}
										onChange={(e) =>
											setIpCountrySearch(
												e.target.value
											)
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
							setSourceSearch("");
							setServicesSearch("");
							setIpOwnerSearch("");
							setAsnSearch("");
							setIpCountrySearch("");
						}}
					>
						<Trash2 className="w-4 h-4 mr-1" /> Reset
					</Button>
					<Button
						className="flex-1"
						onClick={() => setOpenFilterSidebar(false)}
					>
						Apply
					</Button>
				</div>
			</DrawerSheet>
			<IPAddressDetails
				isOpen={!!selectedIp}
				onClose={handleCloseDetails}
				ipAddress={selectedIp}
				ipDetail={selectedIpDetail}
				loading={loadingDetail}
			/>

			<Tabs
				defaultValue="portfolio"
				className="w-full"
			>
				<TabsList className="mb-2 h-auto p-2 w-full">
					<TabsTrigger
						value="portfolio"
						className="flex-col h-auto py-1"
					>
						IP Addresses
						<small>{ipAddressesData.length} IP{ipAddressesData.length !== 1 ? 'S' : ''} MONITORED</small>
					</TabsTrigger>
				</TabsList>
				<TabsContent value="portfolio">
					{/* Controls */}
					<div className="flex flex-wrap items-center justify-between gap-2 mb-2">
						<div className="flex items-center gap-2">
							<div className="relative">
								<Input
									placeholder="Search..."
									value={search}
									onChange={(e) => setSearch(e.target.value)}
									className="h-8 w-48 pl-8"
								/>
								<Search className="absolute left-2 top-2 w-4 h-4 text-muted-foreground pointer-events-none" />
							</div>
							<Button
								variant="outline"
								size="sm"
								className="flex items-center gap-1"
								onClick={() => setOpenFilterSidebar(true)}
							>
								Apply Filter <Filter className="w-4 h-4" />
							</Button>
						</div>
					</div>
					{/* Table */}
					<div className="overflow-x-auto rounded-lg border bg-card">
						{loading ? (
							<div className="p-4">
								<TableLoader rows={8} />
							</div>
						) : error ? (
							<div className="flex items-center justify-center py-8 text-red-500">
								<Info className="w-5 h-5 mr-2" />
								<span>Error: {error}</span>
							</div>
						) : (
							<table className="min-w-full text-sm">
								<thead>
									<tr className="text-muted-foreground border-b">
										<th className="text-left py-2 px-4 font-normal">
											Source
										</th>
										<th className="text-left py-2 px-4 font-normal">
											IP Address
										</th>
										<th className="text-left py-2 px-4 font-normal">
											Owner
										</th>
										<th className="text-left py-2 px-4 font-normal">
											Autonomous System
										</th>
										<th className="text-left py-2 px-4 font-normal">
											Country
										</th>
										<th className="text-left py-2 px-4 font-normal">
											Score
										</th>
										<th className="text-left py-2 px-4 font-normal">
											Services
										</th>
										<th className="text-center py-2 px-4 font-normal"></th>
									</tr>
								</thead>
								<tbody>
									{ipAddressesData
										.filter(
											(c) =>
												c.ip
													.toLowerCase()
													.includes(
														search.toLowerCase()
													) ||
												c.owner
													.toLowerCase()
													.includes(search.toLowerCase())
										)
										.map((c) => (
											<tr
												key={c.ip}
												className="border-b last:border-0 cursor-pointer"
												onClick={() => handleRowClick(c)}
											>
												<td className="py-2 px-4">
													<div className="flex flex-wrap gap-1">
														{(c.sources || []).map((source, i) => (
															<Badge key={i} variant="outline">
																{source}
															</Badge>
														))}
													</div>
												</td>
												<td className="py-2 px-4 flex items-center gap-2">
													{c.ip}
												</td>
												<td className="py-2 px-4">
													<div className="flex flex-col">
														<span className="font-medium text-foreground leading-tight">
															{c.owner}
														</span>
														<span className="text-xs text-muted-foreground leading-tight">
															AS{c.asn} - {c.as_name}
														</span>
													</div>
												</td>
												<td className="py-2 px-4">
													AS{c.asn}
												</td>
												<td className="py-2 px-4">
													{c.country}
												</td>
												<td className="py-2 px-4">
													{c.score ?? "N/A"}
												</td>
												<td className="py-2 px-4">
													<div className="flex flex-wrap gap-1">
														{(c.services || []).map((service, i) => (
															<Badge
																key={i}
																variant="outline"
																className={
																	service === "HTTPS"
																		? "bg-green-500 text-white border-0"
																		: "bg-red-500 text-white border-0"
																}
															>
																{service}
															</Badge>
														))}
													</div>
												</td>
												<td className="py-2 px-4 text-center">
													<Button
														variant="ghost"
														size="icon"
													>
														<ChevronRight className="w-4 h-4 text-muted-foreground" />
													</Button>
												</td>
											</tr>
										))}
								</tbody>
							</table>
						)}
					</div>
				</TabsContent>
			</Tabs>
		</SidebarLayout>
	);
}

// Reusable Section Components
function CustomerHeader({
	onOpenExportDialog,
	showInfo,
	setShowInfo,
	domain,
}: {
	onOpenExportDialog: () => void;
	showInfo: boolean;
	setShowInfo: (showInfo: boolean) => void;
	domain: string;
}) {
	// Extract company name from domain (simple logic)
	const getCompanyName = (domain: string) => {
		if (!domain) return "Company";
		const name = domain.split('.')[0];
		return name.charAt(0).toUpperCase() + name.slice(1);
	};

	const companyName = getCompanyName(domain);

	return (
		<>
			<PageHeader
				title={
					<div className=" -col items-center justify-start">
						<div className="flex items-center gap-2">
							<Avatar>
								<AvatarFallback>
									{companyName[0]}
								</AvatarFallback>
							</Avatar>
							<div>
								<CardTitle className="text-md flex items-center gap-2">
									{companyName}
									<Link
										to={"#"}
										className="text-xs flex items-center gap-1 hover:underline text-blue-500"
									>
										<Globe className="w-3 h-3" />{" "}
										{domain}
									</Link>
								</CardTitle>
							</div>
						</div>
					</div>
				}
				actions={null}
			/>
			<PageHeader
				title="IP Addresses"
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
