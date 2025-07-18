import { Button } from "@/components/ui/button";
import SidebarLayout from "@/layouts/sidebar-layout";
import axios from "axios";
import {
	ChevronDown,
	Search,
	Plus,
	BadgePlus,
	Users,
	Columns3,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import type { Vendor, Customer } from "@/lib/types";
import { useState, useEffect } from "react";
import CustomerPortfolioHeader from "@/components/customer-portfolio/CustomerPortfolioHeader";
import CustomerPortfolioDescription from "@/components/customer-portfolio/CustomerPortfolioDescription";
import ExportDialog from "@/components/ExportDialog";
import ImportCustomersDialog from "@/components/customer-portfolio/ImportCustomersDialog";
import MonitorCustomerDialog from "@/components/customer-portfolio/MonitorCustomerDialog";
import CustomerPortfolioFilterSidebar from "@/components/customer-portfolio/CustomerPortfolioFilterSidebar";


export default function CustomerPortfolio() {
	const [customers, setCustomers] = useState<Customer[]>([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		const fetchCustomers = async () => {
			try {
				const token = localStorage.getItem("token");

				const response = await axios.post(
					"https://cyber.defendx.co.in/api/upguard/overview",
					{ labels: [] },
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				);

				const vendors: Vendor[] = response.data.data.vendors || [];
				const transformedCustomers: Customer[] = vendors.map((vendor: Vendor) => ({
					id: vendor.id,
					name: vendor.name,
					domain: vendor.primary_hostname,
					logo: `https://logo.clearbit.com/${vendor.primary_hostname}`,
					score: vendor.score,
					grade: vendor.score >= 800 ? "A" : vendor.score >= 700 ? "B" : "C",
					automatedScore: vendor.automatedScore,
					automatedGrade: vendor.automatedScore >= 800 ? "A" : vendor.automatedScore >= 700 ? "B" : "C",
					trend: 0,
					trendUp: false,
					lastAssessed: vendor.assessmentStatus,
				}));

				setCustomers(transformedCustomers);
			} catch (error) {
				console.error("Error fetching customer data:", error);
			}
		};

		fetchCustomers();

	}, []);
	const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
	const [customerScore, setCustomerScore] = useState([0, 100]);
	const [portfolio, setPortfolio] = useState<string[]>([]);
	const [tier, setTier] = useState<string[]>([]);
	const [dateAddedType, setDateAddedType] = useState("after");
	const [dateAdded, setDateAdded] = useState("");
	const [reassessmentType, setReassessmentType] = useState("after");
	const [reassessmentDate, setReassessmentDate] = useState("");
	const [contractEndType, setContractEndType] = useState("after");
	const [contractEndDate, setContractEndDate] = useState("");
	const [assessmentStatus, setAssessmentStatus] = useState<string[]>([]);
	const [assessmentAuthorType, setAssessmentAuthorType] = useState("any");
	const [assessmentAuthor, setAssessmentAuthor] = useState("");
	const [labelType, setLabelType] = useState("any");
	const [label, setLabel] = useState("");
	const [internalOwner, setInternalOwner] = useState("");
	const [assessorType, setAssessorType] = useState("any");
	const [assessor, setAssessor] = useState("");
	const [clientIdType, setClientIdType] = useState("any");
	const [clientId, setClientId] = useState("");
	const [fourthPartyProduct, setFourthPartyProduct] = useState("");
	const [evidenceTypes, setEvidenceTypes] = useState("");
	const [questionnaireTypes, setQuestionnaireTypes] = useState("");
	const [isMonitorDialogOpen, setIsMonitorDialogOpen] = useState(false);
	const [monitorSearch, setMonitorSearch] = useState("");
	const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
	const [exportFormat, setExportFormat] = useState<"pdf" | "excel">("pdf");
	const [exportFrequency, setExportFrequency] = useState<
		"once" | "recurring"
	>("once");
	const [exportDelivery, setExportDelivery] = useState<"email" | "save">(
		"save"
	);
	const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
	const [importTab, setImportTab] = useState<"manual" | "csv">("manual");
	const [importDomains, setImportDomains] = useState("");
	const [showCustomerProfile, setShowCustomerProfile] = useState(true);

	const handleOpenFilters = () => setIsFilterSidebarOpen(true);
	const handleCloseFilters = () => setIsFilterSidebarOpen(false);

	return (
		<SidebarLayout
			breadcrumbs={[
				{
					label: "Customer Portfolio",
					href: "/customer-portfolio",
				},
			]}
		>
			<div className="flex flex-1 flex-col gap-4">
				<CustomerPortfolioHeader
					onOpenFilters={handleOpenFilters}
					onOpenExport={() => setIsExportDialogOpen(true)}
					onToggleInfo={() => setShowCustomerProfile((v) => !v)}
				/>
				<CustomerPortfolioDescription show={showCustomerProfile}>
					Customer Portfolio helps you find, track, and monitor the
					security posture of any organization instantly. You can
					categorize customers, compare them against industry
					benchmarks, and see how their security posture is changing
					over time.
				</CustomerPortfolioDescription>
				{/* Tabs */}
				<Tabs defaultValue="portfolio" className="w-full">
					<TabsList className="mb-2">
						<TabsTrigger value="portfolio">Portfolio</TabsTrigger>
						<TabsTrigger value="snapshots">
							Snapshots (0)
						</TabsTrigger>
					</TabsList>
					<TabsContent value="portfolio">
						{/* Controls */}
						<div className="flex flex-wrap items-center justify-between gap-2 mb-2">
							<div className="flex items-center gap-2">
								<Button
									variant="outline"
									size="sm"
									className="flex items-center gap-1"
								>
									<Users className="w-4 h-4" /> All Portfolios{" "}
									<ChevronDown className="w-4 h-4" />
								</Button>
								{/* <span className="text-xs text-muted-foreground">
									10 / 50 customers monitored
								</span> */}
							</div>
							<div className="flex items-center gap-2">
								<div className="relative">
									<Input
										placeholder="Search..."
										value={search}
										onChange={(e) =>
											setSearch(e.target.value)
										}
										className="h-8 w-48 pl-8"
									/>
									<Search className="absolute left-2 top-2 w-4 h-4 text-muted-foreground pointer-events-none" />
								</div>
								{/* <Button
									variant="outline"
									size="sm"
									className="flex items-center gap-1"
								>
									Tier Summary{" "}
									<ChevronDown className="w-4 h-4" />
								</Button> */}
								<Button
									variant="outline"
									size="sm"
									className="flex items-center gap-1"
								>
									<Columns3 className="w-4 h-4" /> Columns
									(6/6)
								</Button>
							</div>
							<div className="flex items-center gap-2">
								{/* <Button
									variant="outline"
									size="sm"
									className="flex items-center gap-1"
									onClick={() => setIsImportDialogOpen(true)}
								>
									Import
								</Button> */}
								<Button
									size="sm"
									className="flex items-center gap-1"
									onClick={() => setIsMonitorDialogOpen(true)}
								>
									<BadgePlus className="w-4 h-4" /> Monitor
									new customer
								</Button>
							</div>
						</div>
						{/* Table */}
						<div className="overflow-x-auto rounded-lg border bg-card">
							<table className="min-w-full text-sm">
								<thead>
									<tr className="text-muted-foreground border-b">
										<th className="text-left py-2 px-4 font-normal">
											Tier
										</th>
										<th className="text-left py-2 px-4 font-normal">
											Customer
										</th>
										<th className="text-left py-2 px-4 font-normal">
											Score
										</th>
										<th className="text-left py-2 px-4 font-normal">
											Automated Score
										</th>
										<th className="text-left py-2 px-4 font-normal">
											Last Assessed
										</th>

									</tr>
								</thead>
								<tbody>
									{customers
										.filter(
											(c) =>
												c.name
													.toLowerCase()
													.includes(
														search.toLowerCase()
													) ||
												c.domain
													.toLowerCase()
													.includes(
														search.toLowerCase()
													)
										)
										.map((c) => (
											<tr
												key={c.domain}
												className="border-b last:border-0"
											>
												<td className="py-2 px-4">
													<Button
														variant="ghost"
														size="icon"
														className="rounded-full"
													>
														<Plus className="w-4 h-4" />
													</Button>
												</td>
												<td
													className="py-2 px-4 flex items-center gap-2 cursor-pointer"
													onClick={() => {
														// Save to local storage
														localStorage.setItem('customerId', c.id);
														localStorage.setItem('customerDomain', c.domain);

														// Navigate to the customer summary route
														window.location.href = `/customer-summary/${c.id}/${c.domain}`;
													}}
												>
													<Avatar className="w-7 h-7">
														<AvatarImage src={c.logo} alt={c.name} />
														<AvatarFallback>{c.name[0]}</AvatarFallback>
													</Avatar>
													<div className="flex flex-col">
														<span className="font-medium text-foreground leading-tight">
															{c.name}
														</span>
														<span className="text-xs text-muted-foreground leading-tight">
															{c.domain}
														</span>
													</div>
												</td>

												<td className="py-2 px-4">
													<Badge
														variant="outline"
														className={
															c.grade === "A"
																? "border-green-500 text-green-600"
																: "border-yellow-500 text-yellow-600"
														}
													>
														{c.grade} {c.score}
													</Badge>
												</td>
												<td className="py-2 px-4">
													<Badge
														variant="outline"
														className={
															c.automatedGrade === "A"
																? "border-green-500 text-green-600"
																: "border-yellow-500 text-yellow-600"
														}
													>
														{c.automatedGrade} {c.automatedScore}
													</Badge>
												</td>
												<td className="py-2 px-4">
													{c.lastAssessed}
												</td>

												
											</tr>
										))}
								</tbody>
							</table>
						</div>
					</TabsContent>
					<TabsContent value="snapshots">
						<div className="text-muted-foreground text-center py-8">
							No snapshots available.
						</div>
					</TabsContent>
				</Tabs>
			</div>

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

			<ImportCustomersDialog
				open={isImportDialogOpen}
				onOpenChange={setIsImportDialogOpen}
				importTab={importTab}
				setImportTab={setImportTab}
				importDomains={importDomains}
				setImportDomains={setImportDomains}
			/>

			<MonitorCustomerDialog
				open={isMonitorDialogOpen}
				onOpenChange={setIsMonitorDialogOpen}
				monitorSearch={monitorSearch}
				setMonitorSearch={setMonitorSearch}
			/>

			<CustomerPortfolioFilterSidebar
				open={isFilterSidebarOpen}
				onOpenChange={setIsFilterSidebarOpen}
				customerScore={customerScore}
				setCustomerScore={setCustomerScore}
				portfolio={portfolio}
				setPortfolio={setPortfolio}
				tier={tier}
				setTier={setTier}
				dateAddedType={dateAddedType}
				setDateAddedType={setDateAddedType}
				dateAdded={dateAdded}
				setDateAdded={setDateAdded}
				fourthPartyProduct={fourthPartyProduct}
				setFourthPartyProduct={setFourthPartyProduct}
				assessmentStatus={assessmentStatus}
				setAssessmentStatus={setAssessmentStatus}
				assessmentAuthorType={assessmentAuthorType}
				setAssessmentAuthorType={setAssessmentAuthorType}
				assessmentAuthor={assessmentAuthor}
				setAssessmentAuthor={setAssessmentAuthor}
				reassessmentType={reassessmentType}
				setReassessmentType={setReassessmentType}
				reassessmentDate={reassessmentDate}
				setReassessmentDate={setReassessmentDate}
				labelType={labelType}
				setLabelType={setLabelType}
				label={label}
				setLabel={setLabel}
				contractEndType={contractEndType}
				setContractEndType={setContractEndType}
				contractEndDate={contractEndDate}
				setContractEndDate={setContractEndDate}
				internalOwner={internalOwner}
				setInternalOwner={setInternalOwner}
				assessorType={assessorType}
				setAssessorType={setAssessorType}
				assessor={assessor}
				setAssessor={setAssessor}
				clientIdType={clientIdType}
				setClientIdType={setClientIdType}
				clientId={clientId}
				setClientId={setClientId}
				evidenceTypes={evidenceTypes}
				setEvidenceTypes={setEvidenceTypes}
				questionnaireTypes={questionnaireTypes}
				setQuestionnaireTypes={setQuestionnaireTypes}
				onReset={() => {
					setCustomerScore([0, 1000]);
					setPortfolio([]);
					setTier([]);
					setDateAdded("");
					setDateAddedType("after");
					setFourthPartyProduct("");
					setAssessmentStatus([]);
					setAssessmentAuthorType("any");
					setAssessmentAuthor("");
					setReassessmentType("after");
					setReassessmentDate("");
					setLabelType("any");
					setLabel("");
					setContractEndType("after");
					setContractEndDate("");
					setInternalOwner("");
					setAssessorType("any");
					setAssessor("");
					setClientIdType("any");
					setClientId("");
					setEvidenceTypes("");
					setQuestionnaireTypes("");
				}}
				onApply={handleCloseFilters}
			/>
		</SidebarLayout>
	);
}
