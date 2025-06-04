import React from "react";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	customerScore: number[];
	setCustomerScore: (val: number[]) => void;
	portfolio: string[];
	setPortfolio: (val: string[]) => void;
	tier: string[];
	setTier: (val: string[]) => void;
	dateAddedType: string;
	setDateAddedType: (val: string) => void;
	dateAdded: string;
	setDateAdded: (val: string) => void;
	fourthPartyProduct: string;
	setFourthPartyProduct: (val: string) => void;
	assessmentStatus: string[];
	setAssessmentStatus: (val: string[]) => void;
	assessmentAuthorType: string;
	setAssessmentAuthorType: (val: string) => void;
	assessmentAuthor: string;
	setAssessmentAuthor: (val: string) => void;
	reassessmentType: string;
	setReassessmentType: (val: string) => void;
	reassessmentDate: string;
	setReassessmentDate: (val: string) => void;
	labelType: string;
	setLabelType: (val: string) => void;
	label: string;
	setLabel: (val: string) => void;
	contractEndType: string;
	setContractEndType: (val: string) => void;
	contractEndDate: string;
	setContractEndDate: (val: string) => void;
	internalOwner: string;
	setInternalOwner: (val: string) => void;
	assessorType: string;
	setAssessorType: (val: string) => void;
	assessor: string;
	setAssessor: (val: string) => void;
	clientIdType: string;
	setClientIdType: (val: string) => void;
	clientId: string;
	setClientId: (val: string) => void;
	evidenceTypes: string;
	setEvidenceTypes: (val: string) => void;
	questionnaireTypes: string;
	setQuestionnaireTypes: (val: string) => void;
	onReset: () => void;
	onApply: () => void;
};

const CustomerPortfolioFilterSidebar: React.FC<Props> = (props) => {
	// Destructure all props for easier use
	const {
		open,
		onOpenChange,
		customerScore,
		setCustomerScore,
		portfolio,
		setPortfolio,
		tier,
		setTier,
		dateAddedType,
		setDateAddedType,
		dateAdded,
		setDateAdded,
		fourthPartyProduct,
		setFourthPartyProduct,
		assessmentStatus,
		setAssessmentStatus,
		assessmentAuthorType,
		setAssessmentAuthorType,
		assessmentAuthor,
		setAssessmentAuthor,
		reassessmentType,
		setReassessmentType,
		reassessmentDate,
		setReassessmentDate,
		labelType,
		setLabelType,
		label,
		setLabel,
		contractEndType,
		setContractEndType,
		contractEndDate,
		setContractEndDate,
		internalOwner,
		setInternalOwner,
		assessorType,
		setAssessorType,
		assessor,
		setAssessor,
		clientIdType,
		setClientIdType,
		clientId,
		setClientId,
		evidenceTypes,
		setEvidenceTypes,
		questionnaireTypes,
		setQuestionnaireTypes,
		onReset,
		onApply,
	} = props;

	const handlePortfolioChange = (value: string) => {
		setPortfolio(
			portfolio.includes(value)
				? portfolio.filter((v) => v !== value)
				: [...portfolio, value]
		);
	};
	const handleTierChange = (value: string) => {
		setTier(
			tier.includes(value)
				? tier.filter((v) => v !== value)
				: [...tier, value]
		);
	};
	const handleAssessmentStatusChange = (value: string) => {
		setAssessmentStatus(
			assessmentStatus.includes(value)
				? assessmentStatus.filter((v) => v !== value)
				: [...assessmentStatus, value]
		);
	};

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent
				side="right"
				className="max-w-md w-full flex flex-col bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
			>
				<SheetHeader className="flex flex-row items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
					<SheetTitle>Filter by</SheetTitle>
				</SheetHeader>
				<div className="flex-1 overflow-y-auto px-6 py-4">
					<Accordion
						type="multiple"
						className="w-full"
						defaultValue={[]}
					>
						{" "}
						{/* All closed by default */}
						<AccordionItem value="score">
							<AccordionTrigger>Customer score</AccordionTrigger>
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
										Customers
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
										IT vendors
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
										Marketing
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
											checked={tier.includes("Tier 1")}
											onCheckedChange={() =>
												handleTierChange("Tier 1")
											}
										/>
										Tier 1
									</label>
									<label className="flex items-center gap-2">
										<Checkbox
											checked={tier.includes("Tier 2")}
											onCheckedChange={() =>
												handleTierChange("Tier 2")
											}
										/>
										Tier 2
									</label>
									<label className="flex items-center gap-2">
										<Checkbox
											checked={tier.includes("Tier 3")}
											onCheckedChange={() =>
												handleTierChange("Tier 3")
											}
										/>
										Tier 3
									</label>
									<label className="flex items-center gap-2">
										<Checkbox
											checked={tier.includes("Untiered")}
											onCheckedChange={() =>
												handleTierChange("Untiered")
											}
										/>
										Untiered
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
									/>{" "}
									<label htmlFor="date-added-before">
										Before
									</label>
									<RadioGroupItem
										value="between"
										id="date-added-between"
									/>{" "}
									<label htmlFor="date-added-between">
										Between
									</label>
									<RadioGroupItem
										value="after"
										id="date-added-after"
									/>{" "}
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
										setFourthPartyProduct(e.target.value)
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
										Not assessed
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
										In progress
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
										Overdue
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
										Due in next 30 days
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
										Due in &gt; 30 days
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
										Reassessment not scheduled
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
									/>{" "}
									<label htmlFor="assessment-author-any">
										Match any
									</label>
									<RadioGroupItem
										value="exclude"
										id="assessment-author-exclude"
									/>{" "}
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
									/>{" "}
									<label htmlFor="reassessment-before">
										Before
									</label>
									<RadioGroupItem
										value="between"
										id="reassessment-between"
									/>{" "}
									<label htmlFor="reassessment-between">
										Between
									</label>
									<RadioGroupItem
										value="after"
										id="reassessment-after"
									/>{" "}
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
									/>{" "}
									<label htmlFor="label-any">Match any</label>
									<RadioGroupItem
										value="all"
										id="label-all"
									/>{" "}
									<label htmlFor="label-all">Match all</label>
									<RadioGroupItem
										value="exclude"
										id="label-exclude"
									/>{" "}
									<label htmlFor="label-exclude">
										Do not include
									</label>
								</RadioGroup>
								<Input
									placeholder="Type to search labels"
									value={label}
									onChange={(e) => setLabel(e.target.value)}
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
									/>{" "}
									<label htmlFor="contract-end-before">
										Before
									</label>
									<RadioGroupItem
										value="between"
										id="contract-end-between"
									/>{" "}
									<label htmlFor="contract-end-between">
										Between
									</label>
									<RadioGroupItem
										value="after"
										id="contract-end-after"
									/>{" "}
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
							<AccordionTrigger>Internal owner</AccordionTrigger>
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
									/>{" "}
									<label htmlFor="assessor-any">
										Match any
									</label>
									<RadioGroupItem
										value="exclude"
										id="assessor-exclude"
									/>{" "}
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
									/>{" "}
									<label htmlFor="clientid-any">
										Match any
									</label>
									<RadioGroupItem
										value="exclude"
										id="clientid-exclude"
									/>{" "}
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
							<AccordionTrigger>Evidence types</AccordionTrigger>
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
										setQuestionnaireTypes(e.target.value)
									}
									className="w-full"
									aria-label="Questionnaire types"
								/>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
				<div className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 flex gap-2 justify-end bg-white dark:bg-zinc-900">
					<Button variant="outline" onClick={onReset}>
						Reset
					</Button>
					<Button onClick={onApply}>Apply</Button>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default CustomerPortfolioFilterSidebar;
