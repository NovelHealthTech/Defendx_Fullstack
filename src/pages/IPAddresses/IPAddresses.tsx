import React, { useState } from "react";
import SidebarLayout from "@/layouts/sidebar-layout";
import { Button } from "@/components/ui/button";
import {
	BadgePlus,
	Download,
	ExternalLink,
	Filter,
	Globe,
	Plus,
	Search,
	Trash2,
	ArrowUpRight,
	ArrowDownRight,
	ChevronDown,
	Columns3,
	Users,
	ChevronRight,
	ArrowRight,
	ArrowDown,
	Info,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

import PageHeader from "@/components/PageHeader";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { CardTitle } from "@/components/ui/card";
import { Link } from "react-router";
import ExportDialog from "@/components/ExportDialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
	IPAddresses as ipAddressesData,
	ipRanges as ipRangesData,
} from "@/lib/DATA";
import DrawerSheet from "@/components/DrawerSheet";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CustomAccordion from "@/components/CustomAccordion";
import IPAddressDetails from "./IPAddressDetails";
import type { IPAddress, IPRange } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import IPRangeDetails from "./IPRangeDetails";

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

export default function IPAddresses() {
	const [search, setSearch] = useState("");
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
	const [findingSearch, setFindingSearch] = useState("");
	const [selectedIp, setSelectedIp] = useState<IPAddress | null>(null);
	const [ipRangeSearch, setIpRangeSearch] = useState("");
	const [ipRangeLabelMatchType, setIpRangeLabelMatchType] = useState("any");
	const [ipRangeLabelSearch, setIpRangeLabelSearch] = useState("");
	const [ipRangeSourceSearch, setIpRangeSourceSearch] = useState("");
	const [ipRangeOwnerSearch, setIpRangeOwnerSearch] = useState("");
	const [ipRangeAsnSearch, setIpRangeAsnSearch] = useState("");
	const [ipRangeCountrySearch, setIpRangeCountrySearch] = useState("");
	const [activeTab, setActiveTab] = useState("portfolio");
	const [selectedIpRange, setSelectedIpRange] = useState<IPRange | null>(
		null
	);
	const [showInfo, setShowInfo] = useState(true);
	const handleRowClick = (ip: IPAddress) => {
		setSelectedIp(ip);
	};

	const handleCloseDetails = () => {
		setSelectedIp(null);
	};

	const handleIpRangeRowClick = (ipRange: IPRange) => {
		setSelectedIpRange(ipRange);
	};

	const handleCloseIpRangeDetails = () => {
		setSelectedIpRange(null);
	};

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
				{activeTab === "portfolio" ? (
					<>
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
					</>
				) : (
					<>
						<div className="space-y-2">
							<CustomAccordion
								items={[
									{
										title: "Label",
										content: (
											<div className="space-y-2">
												<RadioGroup
													value={
														ipRangeLabelMatchType
													}
													onValueChange={
														setIpRangeLabelMatchType
													}
													className="flex flex-col gap-1"
												>
													<label className="flex items-center gap-2 text-sm">
														<RadioGroupItem
															value="any"
															id="label-any-range"
														/>
														Match any
													</label>
													<label className="flex items-center gap-2 text-sm">
														<RadioGroupItem
															value="all"
															id="label-all-range"
														/>
														Match all
													</label>
													<label className="flex items-center gap-2 text-sm">
														<RadioGroupItem
															value="exclude"
															id="label-exclude-range"
														/>
														Do not include
													</label>
												</RadioGroup>
												<Input
													type="text"
													placeholder="Type to search labels"
													className="w-full mt-2"
													value={ipRangeLabelSearch}
													onChange={(e) =>
														setIpRangeLabelSearch(
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
												value={ipRangeSourceSearch}
												onChange={(e) =>
													setIpRangeSourceSearch(
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
												value={ipRangeOwnerSearch}
												onChange={(e) =>
													setIpRangeOwnerSearch(
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
												value={ipRangeAsnSearch}
												onChange={(e) =>
													setIpRangeAsnSearch(
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
										title: "IP country",
										content: (
											<Input
												type="text"
												placeholder="Type to search for country"
												className="w-full"
												value={ipRangeCountrySearch}
												onChange={(e) =>
													setIpRangeCountrySearch(
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
									setIpRangeLabelMatchType("any");
									setIpRangeLabelSearch("");
									setIpRangeSourceSearch("");
									setIpRangeOwnerSearch("");
									setIpRangeAsnSearch("");
									setIpRangeCountrySearch("");
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
					</>
				)}
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

			<Tabs
				defaultValue="portfolio"
				className="w-full"
				onValueChange={setActiveTab}
			>
				<TabsList className="mb-2 h-auto p-2 w-full">
					<TabsTrigger
						value="portfolio"
						className="flex-col h-auto py-1"
					>
						IP Address
						<small>123 RANGES MONITORED</small>
					</TabsTrigger>
					<TabsTrigger
						value="snapshots"
						className="flex-col h-auto py-1"
					>
						IP Ranges
						<small>12 RANGES MONITORED</small>
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
									<th className="text-left py-2 px-4 font-normal">
										Labels
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
											c.range
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
												<Badge variant="outline">
													{c.source}
												</Badge>
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
														{c.range}
													</span>
												</div>
											</td>
											<td className="py-2 px-4 flex items-center gap-1">
												{c.asn}
											</td>
											<td className="py-2 px-4">
												{c.country}
											</td>
											<td className="py-2 px-4">
												{c.score ?? "N/A"}
											</td>
											<td className="py-2 px-4">
												{c.protocol === "HTTPS" ? (
													<Badge
														variant="outline"
														className="bg-green-500 text-white border-0"
													>
														{c.protocol}
													</Badge>
												) : (
													<Badge
														variant="outline"
														className="bg-red-500 text-white border-0"
													>
														{c.protocol}
													</Badge>
												)}
											</td>
											<td className="py-2 px-4">
												<Button
													variant="outline"
													size="sm"
													className="border-dashed text-muted-foreground"
												>
													+ Add label
												</Button>
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
					</div>
				</TabsContent>
				<TabsContent value="snapshots">
					<div className="space-y-4">
						<div className="flex justify-between items-start">
							<div>
								<h2 className="text-xl font-semibold">
									IP ranges
								</h2>
								<p className="text-muted-foreground text-sm">
									The IP ranges listed here are those owned by
									the customer. The full range is scanned, and
									any active IPs found will be listed on the
									IP Addresses tab.
								</p>
							</div>
							<Button
								variant="outline"
								size="sm"
								onClick={() => setOpenFilterSidebar(true)}
							>
								Apply filters{" "}
								<Filter className="w-4 h-4 ml-2" />
							</Button>
						</div>

						<div className="relative">
							<Input
								placeholder="Search IP ranges"
								value={ipRangeSearch}
								onChange={(e) =>
									setIpRangeSearch(e.target.value)
								}
								className="h-9 w-full pl-8"
							/>
							<Search className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground pointer-events-none" />
						</div>

						{/* Table */}
						<div className="overflow-x-auto rounded-lg border bg-card">
							<table className="min-w-full text-sm">
								<thead>
									<tr className="text-muted-foreground border-b">
										<th className="py-2 px-4 font-normal">
											<Checkbox />
										</th>
										<th className="text-left py-2 px-4 font-normal">
											Source
										</th>
										<th className="text-left py-2 px-4 font-normal">
											Range start
										</th>
										<th className="text-left py-2 px-4 font-normal">
											Range end
										</th>
										<th className="text-left py-2 px-4 font-normal">
											Owner
										</th>
										<th className="text-left py-2 px-4 font-normal">
											Autonomous System{" "}
											<Info className="inline w-3 h-3" />
										</th>
										<th className="text-left py-2 px-4 font-normal">
											Registrant Country
										</th>
										<th className="text-left py-2 px-4 font-normal">
											IP addresses{" "}
											<ArrowDown className="inline w-3 h-3" />
										</th>
										<th className="text-left py-2 px-4 font-normal">
											Labels
										</th>
										<th className="text-center py-2 px-4 font-normal"></th>
									</tr>
								</thead>
								<tbody>
									{ipRangesData
										.filter(
											(range) =>
												range.owner
													.toLowerCase()
													.includes(
														ipRangeSearch.toLowerCase()
													) &&
												(ipRangeSourceSearch === "" ||
													range.sources.some(
														(source) =>
															source
																.toLowerCase()
																.includes(
																	ipRangeSourceSearch.toLowerCase()
																)
													)) &&
												(ipRangeOwnerSearch === "" ||
													range.owner
														.toLowerCase()
														.includes(
															ipRangeOwnerSearch.toLowerCase()
														)) &&
												(ipRangeAsnSearch === "" ||
													range.autonomousSystemNumber
														.toLowerCase()
														.includes(
															ipRangeAsnSearch.toLowerCase()
														) ||
													range.autonomousSystem
														.toLowerCase()
														.includes(
															ipRangeAsnSearch.toLowerCase()
														)) &&
												(ipRangeCountrySearch === "" ||
													range.country
														.toLowerCase()
														.includes(
															ipRangeCountrySearch.toLowerCase()
														))
										)
										.map((range, index) => (
											<tr
												key={index}
												className="border-b last:border-0 cursor-pointer"
												onClick={() =>
													handleIpRangeRowClick(range)
												}
											>
												<td className="py-2 px-4">
													<Checkbox />
												</td>
												<td className="py-2 px-4">
													<div className="flex flex-wrap gap-1">
														{range.sources.map(
															(source, i) => (
																<Badge
																	key={i}
																	variant={
																		i === 0
																			? "destructive"
																			: i ===
																			  1
																			? "outline"
																			: "default"
																	}
																	className={
																		source ===
																		"Owned Range"
																			? "bg-green-100 text-green-800"
																			: ""
																	}
																>
																	{source}
																</Badge>
															)
														)}
													</div>
												</td>
												<td className="py-2 px-4">
													{range.rangeStart}
												</td>
												<td className="py-2 px-4 flex items-center gap-2">
													{range.rangeEnd}
													<ArrowRight className="h-4 w-4 text-muted-foreground" />
												</td>
												<td className="py-2 px-4">
													{range.owner}
												</td>
												<td className="py-2 px-4">
													<div className="flex flex-col">
														<span className="font-medium text-foreground leading-tight">
															{
																range.autonomousSystem
															}
														</span>
														<span className="text-xs text-muted-foreground leading-tight">
															{
																range.autonomousSystemNumber
															}
														</span>
													</div>
												</td>
												<td className="py-2 px-4">
													{range.country}
												</td>
												<td className="py-2 px-4">
													{range.ipCount}
												</td>
												<td className="py-2 px-4">
													<Button
														variant="outline"
														size="sm"
														className="border-dashed text-muted-foreground"
													>
														+ Add label
													</Button>
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
						</div>
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
