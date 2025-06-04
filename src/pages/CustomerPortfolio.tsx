import { Button } from "@/components/ui/button";
import SidebarLayout from "@/layouts/sidebar-layout";
import {
	InfoIcon,
	ChevronDown,
	Search,
	Trash2,
	ArrowUpRight,
	ArrowDownRight,
	Plus,
	BadgePlus,
	Filter,
	Download,
	Users,
	Columns3,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetClose,
} from "@/components/ui/sheet";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const customers = [
	{
		name: "Adani Group",
		domain: "adani.com",
		logo: "https://logo.clearbit.com/adani.com",
		score: 794,
		grade: "B",
		trend: 17,
		trendUp: true,
		lastAssessed: "Not assessed",
		reassessment: "-",
		labels: [],
	},
	{
		name: "Birlasoft",
		domain: "birlasoft.com",
		logo: "https://logo.clearbit.com/birlasoft.com",
		score: 861,
		grade: "A",
		trend: 4,
		trendUp: true,
		lastAssessed: "Not assessed",
		reassessment: "-",
		labels: [],
	},
	{
		name: "Google",
		domain: "google.com",
		logo: "https://logo.clearbit.com/google.com",
		score: 672,
		grade: "B",
		trend: 23,
		trendUp: false,
		lastAssessed: "Not assessed",
		reassessment: "-",
		labels: [],
	},
];

export default function CustomerPortfolio() {
	const [search, setSearch] = useState("");
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

	const handleOpenFilters = () => setIsFilterSidebarOpen(true);
	const handleCloseFilters = () => setIsFilterSidebarOpen(false);

	const handlePortfolioChange = (value: string) => {
		setPortfolio((prev) =>
			prev.includes(value)
				? prev.filter((v) => v !== value)
				: [...prev, value]
		);
	};
	const handleTierChange = (value: string) => {
		setTier((prev) =>
			prev.includes(value)
				? prev.filter((v) => v !== value)
				: [...prev, value]
		);
	};

	const handleAssessmentStatusChange = (value: string) => {
		setAssessmentStatus((prev) =>
			prev.includes(value)
				? prev.filter((v) => v !== value)
				: [...prev, value]
		);
	};

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
				{/* Header */}
				<div className="flex items-center justify-between flex-wrap gap-2">
					<div className="flex flex-col gap-1">
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<span>Zoom Insurance Brokers</span>
							<span className="text-blue-600 underline cursor-pointer">
								(zoominsurancebrokers.com)
							</span>
						</div>
						<div className="flex items-center gap-2 mt-1">
							<span className="text-xs text-muted-foreground">
								Current Portfolio:
							</span>
							<Button
								variant="outline"
								size="sm"
								className="flex items-center gap-1"
							>
								All Portfolios{" "}
								<ChevronDown className="w-4 h-4" />
							</Button>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							size="sm"
							className="flex items-center gap-1"
							onClick={handleOpenFilters}
							aria-label="Apply filters"
						>
							<Filter className="w-4 h-4" /> Apply filters
						</Button>
						<Button
							variant="outline"
							size="sm"
							className="flex items-center gap-1"
						>
							<Download className="w-4 h-4" /> Export
						</Button>
						<Button variant="outline" size="icon">
							<InfoIcon className="w-4 h-4" />
						</Button>
					</div>
				</div>
				{/* Description */}
				<div className="flex flex-col gap-2">
					<h2 className="text-2xl font-bold">Customer Portfolio</h2>
					<p className="text-sm text-muted-foreground">
						Customer Portfolio helps you find, track, and monitor
						the security posture of any organization instantly. You
						can categorize customers, compare them against industry
						benchmarks, and see how their security posture is
						changing over time.
					</p>
				</div>
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
								<span className="text-xs text-muted-foreground">
									10 / 50 customers monitored
								</span>
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
								<Button
									variant="outline"
									size="sm"
									className="flex items-center gap-1"
								>
									Tier Summary{" "}
									<ChevronDown className="w-4 h-4" />
								</Button>
								<Button
									variant="outline"
									size="sm"
									className="flex items-center gap-1"
								>
									<Columns3 className="w-4 h-4" /> Columns
									(6/16)
								</Button>
							</div>
							<div className="flex items-center gap-2">
								<Button
									variant="outline"
									size="sm"
									className="flex items-center gap-1"
								>
									Import
								</Button>
								<Button
									size="sm"
									className="flex items-center gap-1"
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
											Year Trend
										</th>
										<th className="text-left py-2 px-4 font-normal">
											Last Assessed
										</th>
										<th className="text-left py-2 px-4 font-normal">
											Reassessment date
										</th>
										<th className="text-left py-2 px-4 font-normal">
											Labels
										</th>
										<th className="text-center py-2 px-4 font-normal"></th>
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
												<td className="py-2 px-4 flex items-center gap-2">
													<Avatar className="w-7 h-7">
														<AvatarImage
															src={c.logo}
															alt={c.name}
														/>
														<AvatarFallback>
															{c.name[0]}
														</AvatarFallback>
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
												<td className="py-2 px-4 flex items-center gap-1">
													{c.trendUp ? (
														<ArrowUpRight className="w-4 h-4 text-green-600" />
													) : (
														<ArrowDownRight className="w-4 h-4 text-red-600" />
													)}
													<span
														className={
															c.trendUp
																? "text-green-600"
																: "text-red-600"
														}
													>
														{c.trend}
													</span>
												</td>
												<td className="py-2 px-4">
													{c.lastAssessed}
												</td>
												<td className="py-2 px-4">
													{c.reassessment}
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
														<Trash2 className="w-4 h-4 text-muted-foreground" />
													</Button>
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

			{/* Filter Sheet */}
			<Sheet
				open={isFilterSidebarOpen}
				onOpenChange={setIsFilterSidebarOpen}
			>
				<SheetContent
					side="right"
					className="max-w-md w-full flex flex-col bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
				>
					<SheetHeader className="flex flex-row items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
						<SheetTitle>Filter by</SheetTitle>
						{/* <SheetClose asChild>
							<Button
								variant="ghost"
								size="icon"
								onClick={handleCloseFilters}
								aria-label="Close filter sidebar"
							>
								<span className="sr-only">Close</span>
								&times;
							</Button>
						</SheetClose> */}
					</SheetHeader>
					<div className="flex-1 overflow-y-auto px-6 py-4">
						<Accordion
							type="multiple"
							className="w-full"
							defaultValue={[]}
						>
							<AccordionItem value="score">
								<AccordionTrigger>
									Customer score
								</AccordionTrigger>
								<AccordionContent>
									<div className="flex flex-col gap-2">
										<Slider
											min={0}
											max={1000}
											step={1}
											value={customerScore}
											onValueChange={setCustomerScore}
											className="my-4"
										/>
										<div className="flex justify-between text-xs text-muted-foreground">
											<span>Min: {customerScore[0]}</span>
											<span>Max: {customerScore[1]}</span>
										</div>
									</div>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="portfolio">
								<AccordionTrigger>Portfolio</AccordionTrigger>
								<AccordionContent>
									<div className="flex flex-col gap-2">
										<label className="flex items-center gap-2">
											<Checkbox
												checked={portfolio.includes(
													"Customers"
												)}
												onCheckedChange={() =>
													handlePortfolioChange(
														"Customers"
													)
												}
											/>
											<span>Customers</span>
										</label>
										<label className="flex items-center gap-2">
											<Checkbox
												checked={portfolio.includes(
													"IT vendors"
												)}
												onCheckedChange={() =>
													handlePortfolioChange(
														"IT vendors"
													)
												}
											/>
											<span>IT vendors</span>
										</label>
										<label className="flex items-center gap-2">
											<Checkbox
												checked={portfolio.includes(
													"Marketing"
												)}
												onCheckedChange={() =>
													handlePortfolioChange(
														"Marketing"
													)
												}
											/>
											<span>Marketing</span>
										</label>
									</div>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="tier">
								<AccordionTrigger>Tier</AccordionTrigger>
								<AccordionContent>
									<div className="flex flex-col gap-2">
										<label className="flex items-center gap-2">
											<Checkbox
												checked={tier.includes(
													"Tier 1"
												)}
												onCheckedChange={() =>
													handleTierChange("Tier 1")
												}
											/>
											<span>Tier 1</span>
										</label>
										<label className="flex items-center gap-2">
											<Checkbox
												checked={tier.includes(
													"Tier 2"
												)}
												onCheckedChange={() =>
													handleTierChange("Tier 2")
												}
											/>
											<span>Tier 2</span>
										</label>
										<label className="flex items-center gap-2">
											<Checkbox
												checked={tier.includes(
													"Tier 3"
												)}
												onCheckedChange={() =>
													handleTierChange("Tier 3")
												}
											/>
											<span>Tier 3</span>
										</label>
										<label className="flex items-center gap-2">
											<Checkbox
												checked={tier.includes(
													"Untiered"
												)}
												onCheckedChange={() =>
													handleTierChange("Untiered")
												}
											/>
											<span>Untiered</span>
										</label>
									</div>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="date-added">
								<AccordionTrigger>Date added</AccordionTrigger>
								<AccordionContent>
									<RadioGroup
										value={dateAddedType}
										onValueChange={setDateAddedType}
										className="flex flex-row gap-4 mb-2"
									>
										<RadioGroupItem
											value="before"
											id="date-added-before"
										/>
										<label htmlFor="date-added-before">
											Before
										</label>
										<RadioGroupItem
											value="between"
											id="date-added-between"
										/>
										<label htmlFor="date-added-between">
											Between
										</label>
										<RadioGroupItem
											value="after"
											id="date-added-after"
										/>
										<label htmlFor="date-added-after">
											After
										</label>
									</RadioGroup>
									<Input
										type="date"
										value={dateAdded}
										onChange={(e) =>
											setDateAdded(e.target.value)
										}
										className="w-full"
										aria-label="Date added"
									/>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="fourth-party-product">
								<AccordionTrigger>
									Fourth Party product
								</AccordionTrigger>
								<AccordionContent>
									<Input
										placeholder="Type to search..."
										value={fourthPartyProduct}
										onChange={(e) =>
											setFourthPartyProduct(
												e.target.value
											)
										}
										className="w-full"
										aria-label="Fourth Party product"
									/>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="assessment-status">
								<AccordionTrigger>
									Assessment status
								</AccordionTrigger>
								<AccordionContent>
									<div className="flex flex-col gap-2">
										<label className="flex items-center gap-2">
											<Checkbox
												checked={assessmentStatus.includes(
													"Not assessed"
												)}
												onCheckedChange={() =>
													handleAssessmentStatusChange(
														"Not assessed"
													)
												}
											/>
											<span>Not assessed</span>
										</label>
										<label className="flex items-center gap-2">
											<Checkbox
												checked={assessmentStatus.includes(
													"In progress"
												)}
												onCheckedChange={() =>
													handleAssessmentStatusChange(
														"In progress"
													)
												}
											/>
											<span>In progress</span>
										</label>
										<label className="flex items-center gap-2">
											<Checkbox
												checked={assessmentStatus.includes(
													"Overdue"
												)}
												onCheckedChange={() =>
													handleAssessmentStatusChange(
														"Overdue"
													)
												}
											/>
											<span>Overdue</span>
										</label>
										<label className="flex items-center gap-2">
											<Checkbox
												checked={assessmentStatus.includes(
													"Due in next 30 days"
												)}
												onCheckedChange={() =>
													handleAssessmentStatusChange(
														"Due in next 30 days"
													)
												}
											/>
											<span>Due in next 30 days</span>
										</label>
										<label className="flex items-center gap-2">
											<Checkbox
												checked={assessmentStatus.includes(
													"Due in > 30 days"
												)}
												onCheckedChange={() =>
													handleAssessmentStatusChange(
														"Due in > 30 days"
													)
												}
											/>
											<span>Due in &gt; 30 days</span>
										</label>
										<label className="flex items-center gap-2">
											<Checkbox
												checked={assessmentStatus.includes(
													"Reassessment not scheduled"
												)}
												onCheckedChange={() =>
													handleAssessmentStatusChange(
														"Reassessment not scheduled"
													)
												}
											/>
											<span>
												Reassessment not scheduled
											</span>
										</label>
									</div>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="assessment-author">
								<AccordionTrigger>
									Assessment author
								</AccordionTrigger>
								<AccordionContent>
									<RadioGroup
										value={assessmentAuthorType}
										onValueChange={setAssessmentAuthorType}
										className="flex flex-row gap-4 mb-2"
									>
										<RadioGroupItem
											value="any"
											id="assessment-author-any"
										/>
										<label htmlFor="assessment-author-any">
											Match any
										</label>
										<RadioGroupItem
											value="exclude"
											id="assessment-author-exclude"
										/>
										<label htmlFor="assessment-author-exclude">
											Do not include
										</label>
									</RadioGroup>
									<Input
										placeholder="Type to search..."
										value={assessmentAuthor}
										onChange={(e) =>
											setAssessmentAuthor(e.target.value)
										}
										className="w-full"
										aria-label="Assessment author"
									/>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="reassessment-date">
								<AccordionTrigger>
									Reassessment date
								</AccordionTrigger>
								<AccordionContent>
									<RadioGroup
										value={reassessmentType}
										onValueChange={setReassessmentType}
										className="flex flex-row gap-4 mb-2"
									>
										<RadioGroupItem
											value="before"
											id="reassessment-before"
										/>
										<label htmlFor="reassessment-before">
											Before
										</label>
										<RadioGroupItem
											value="between"
											id="reassessment-between"
										/>
										<label htmlFor="reassessment-between">
											Between
										</label>
										<RadioGroupItem
											value="after"
											id="reassessment-after"
										/>
										<label htmlFor="reassessment-after">
											After
										</label>
									</RadioGroup>
									<Input
										type="date"
										value={reassessmentDate}
										onChange={(e) =>
											setReassessmentDate(e.target.value)
										}
										className="w-full"
										aria-label="Reassessment date"
									/>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="label">
								<AccordionTrigger>Label</AccordionTrigger>
								<AccordionContent>
									<RadioGroup
										value={labelType}
										onValueChange={setLabelType}
										className="flex flex-row gap-4 mb-2"
									>
										<RadioGroupItem
											value="any"
											id="label-any"
										/>
										<label htmlFor="label-any">
											Match any
										</label>
										<RadioGroupItem
											value="all"
											id="label-all"
										/>
										<label htmlFor="label-all">
											Match all
										</label>
										<RadioGroupItem
											value="exclude"
											id="label-exclude"
										/>
										<label htmlFor="label-exclude">
											Do not include
										</label>
									</RadioGroup>
									<Input
										placeholder="Type to search labels"
										value={label}
										onChange={(e) =>
											setLabel(e.target.value)
										}
										className="w-full"
										aria-label="Label"
									/>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="contract-end-date">
								<AccordionTrigger>
									Contract end date
								</AccordionTrigger>
								<AccordionContent>
									<RadioGroup
										value={contractEndType}
										onValueChange={setContractEndType}
										className="flex flex-row gap-4 mb-2"
									>
										<RadioGroupItem
											value="before"
											id="contract-end-before"
										/>
										<label htmlFor="contract-end-before">
											Before
										</label>
										<RadioGroupItem
											value="between"
											id="contract-end-between"
										/>
										<label htmlFor="contract-end-between">
											Between
										</label>
										<RadioGroupItem
											value="after"
											id="contract-end-after"
										/>
										<label htmlFor="contract-end-after">
											After
										</label>
									</RadioGroup>
									<Input
										type="date"
										value={contractEndDate}
										onChange={(e) =>
											setContractEndDate(e.target.value)
										}
										className="w-full"
										aria-label="Contract end date"
									/>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="internal-owner">
								<AccordionTrigger>
									Internal owner
								</AccordionTrigger>
								<AccordionContent>
									<Input
										placeholder="Type to search..."
										value={internalOwner}
										onChange={(e) =>
											setInternalOwner(e.target.value)
										}
										className="w-full"
										aria-label="Internal owner"
									/>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="assessor">
								<AccordionTrigger>Assessor</AccordionTrigger>
								<AccordionContent>
									<RadioGroup
										value={assessorType}
										onValueChange={setAssessorType}
										className="flex flex-row gap-4 mb-2"
									>
										<RadioGroupItem
											value="any"
											id="assessor-any"
										/>
										<label htmlFor="assessor-any">
											Match any
										</label>
										<RadioGroupItem
											value="exclude"
											id="assessor-exclude"
										/>
										<label htmlFor="assessor-exclude">
											Do not include
										</label>
									</RadioGroup>
									<Input
										placeholder="Type to search..."
										value={assessor}
										onChange={(e) =>
											setAssessor(e.target.value)
										}
										className="w-full"
										aria-label="Assessor"
									/>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="clientid">
								<AccordionTrigger>ClientID</AccordionTrigger>
								<AccordionContent>
									<RadioGroup
										value={clientIdType}
										onValueChange={setClientIdType}
										className="flex flex-row gap-4 mb-2"
									>
										<RadioGroupItem
											value="any"
											id="clientid-any"
										/>
										<label htmlFor="clientid-any">
											Match any
										</label>
										<RadioGroupItem
											value="exclude"
											id="clientid-exclude"
										/>
										<label htmlFor="clientid-exclude">
											Do not include
										</label>
									</RadioGroup>
									<Input
										placeholder="Type to search..."
										value={clientId}
										onChange={(e) =>
											setClientId(e.target.value)
										}
										className="w-full"
										aria-label="ClientID"
									/>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="evidence-types">
								<AccordionTrigger>
									Evidence types
								</AccordionTrigger>
								<AccordionContent>
									<Input
										placeholder="Type to search..."
										value={evidenceTypes}
										onChange={(e) =>
											setEvidenceTypes(e.target.value)
										}
										className="w-full"
										aria-label="Evidence types"
									/>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="questionnaire-types">
								<AccordionTrigger>
									Questionnaire types
								</AccordionTrigger>
								<AccordionContent>
									<Input
										placeholder="Type to search..."
										value={questionnaireTypes}
										onChange={(e) =>
											setQuestionnaireTypes(
												e.target.value
											)
										}
										className="w-full"
										aria-label="Questionnaire types"
									/>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
					<div className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 flex gap-2 justify-end bg-white dark:bg-zinc-900">
						<Button
							variant="outline"
							onClick={() => {
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
						>
							Reset
						</Button>
						<Button onClick={handleCloseFilters}>Apply</Button>
					</div>
				</SheetContent>
			</Sheet>
		</SidebarLayout>
	);
}
