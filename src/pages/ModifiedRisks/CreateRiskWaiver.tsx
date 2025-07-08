import React, { useState } from "react";
import SidebarLayout from "@/layouts/sidebar-layout";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, Globe } from "lucide-react";

import PageHeader from "@/components/PageHeader";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router";
import ExportDialog from "@/components/ExportDialog";
import { Separator } from "@/components/ui/separator";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

import { Stepper } from "@/components/Stepper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/components/ui/accordion";

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

const domainList = [
	"amp-ad-targeting.sportskeeda.com",
	"api.sportskeeda.com",
	"apic.sportskeeda.com",
	"aspera.mediaprima.com.my",
	"campaigns-scorecard.sportskeeda.com",
	"cmc2.sportskeeda.com",
	"cmc3.sportskeeda.com",
	"digitaldelivery.mediaprima.com.my",
	"dsg-origin.sportskeeda.com",
	"feed.proxy.sportskeeda.com",
];

// Risks data
const risksList = [
	{
		id: "ssl-not-available",
		severity: "critical",
		title: "SSL not available",
		subtitle: "Susceptible to man-in-the-middle attacks",
		relatedAssets: 31,
		overview:
			"SSL is the standard encryption method for browsing websites. Enabling SSL requires installing an SSL certificate on the site.",
	},
	{
		id: "nginx-eol",
		severity: "high",
		title: "End-of-life version of NGINX detected",
		subtitle: "Vulnerabilities",
		relatedAssets: 107,
		overview:
			"The detected NGINX version is no longer supported and may have unpatched vulnerabilities.",
	},
	{
		id: "ssl-expired",
		severity: "high",
		title: "SSL expired",
		subtitle: "Susceptible to man-in-the-middle attacks",
		relatedAssets: 8,
		overview:
			"The SSL certificate for this site has expired, making it vulnerable to attacks.",
	},
	{
		id: "hostname-mismatch",
		severity: "high",
		title: "Hostname does not match SSL certificate",
		subtitle: "Susceptible to man-in-the-middle attacks",
		relatedAssets: 15,
		overview:
			"The SSL certificate does not match the hostname, which can allow attackers to intercept data.",
	},
];

// Step 1: Multiple accordions
interface Step1AllRisksProps {
	risks: typeof risksList;
	riskStates: RiskFormState[];
	setRiskStates: React.Dispatch<React.SetStateAction<RiskFormState[]>>;
}
interface RiskFormState {
	selectedRadio: string;
	selectedDomains: string[];
}
const Step1AllRisks: React.FC<Step1AllRisksProps> = ({
	risks,
	riskStates,
	setRiskStates,
}) => {
	return (
		<div className="w-full mx-auto">
			<Accordion type="multiple" className="border rounded-md">
				{risks.map((risk, idx) => {
					const sevColor =
						risk.severity === "critical"
							? "bg-red-500"
							: "bg-orange-400";
					return (
						<AccordionItem key={risk.id} value={risk.id}>
							<AccordionTrigger className="flex items-center gap-3 px-6 py-4">
								<span
									className={`w-4 h-4 rounded-full ${sevColor} flex items-center justify-center text-white text-xs mr-2`}
									aria-label={risk.severity}
									tabIndex={0}
								>
									!
								</span>
								<span className="font-semibold text-base">
									{risk.title}
								</span>
								<span className="ml-2 text-xs text-muted-foreground">
									{risk.subtitle}
								</span>
								<span className="ml-auto text-xs text-muted-foreground">
									{risk.relatedAssets} domains & IPs
								</span>
							</AccordionTrigger>
							<AccordionContent className="bg-background px-6 pb-6">
								{/* Overview */}
								<div className="mb-4 mt-2">
									<div className="font-semibold text-sm mb-1">
										Overview
									</div>
									<p className="text-sm text-muted-foreground">
										{risk.overview}
									</p>
								</div>
								{/* Select Domains & IPs */}
								<div className="mb-4">
									<div className="font-semibold text-sm mb-1">
										Select Domains & IPs
									</div>
									<RadioGroup
										value={riskStates[idx].selectedRadio}
										onValueChange={(v) =>
											setRiskStates((prev) =>
												prev.map((r, i) =>
													i === idx
														? {
																...r,
																selectedRadio:
																	v,
														  }
														: r
												)
											)
										}
										className="flex flex-col gap-2 mt-2"
										aria-label="Select domains and IPs"
									>
										<label className="flex items-center gap-2 cursor-pointer">
											<RadioGroupItem
												value="all"
												id={`${risk.id}-all-domains`}
											/>
											<span>All domains & IPs</span>
										</label>
										<label className="flex items-center gap-2 cursor-pointer">
											<RadioGroupItem
												value="selected"
												id={`${risk.id}-selected-domains`}
											/>
											<span>Selected domains & IPs</span>
										</label>
									</RadioGroup>
									<p className="text-xs text-muted-foreground mt-2 ml-6">
										This risk will only ever be waived for
										the selected{" "}
										<span className="italic">
											specific domains & IPs
										</span>
										.
									</p>
								</div>
								{/* Domains & IPs */}
								<div className="mb-2">
									<div className="font-semibold text-sm mb-1">
										Domains & IPs
									</div>
									<div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
										{domainList.map((domain) => (
											<label
												key={domain}
												className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded hover:bg-muted focus-within:ring-2"
												tabIndex={0}
												aria-label={`Select domain ${domain}`}
											>
												<Checkbox
													checked={riskStates[
														idx
													].selectedDomains.includes(
														domain
													)}
													onCheckedChange={() =>
														setRiskStates((prev) =>
															prev.map((r, i) =>
																i === idx
																	? {
																			...r,
																			selectedDomains:
																				r.selectedDomains.includes(
																					domain
																				)
																					? r.selectedDomains.filter(
																							(
																								d
																							) =>
																								d !==
																								domain
																					  )
																					: [
																							...r.selectedDomains,
																							domain,
																					  ],
																	  }
																	: r
															)
														)
													}
													id={domain}
												/>
												<span className="text-sm">
													{domain}
												</span>
											</label>
										))}
									</div>
									<p className="text-xs text-muted-foreground mt-2">
										{riskStates[idx].selectedDomains.length}
										/{domainList.length} domains & IPs
									</p>
								</div>
							</AccordionContent>
						</AccordionItem>
					);
				})}
			</Accordion>
		</div>
	);
};

// Step 2 Configure Card now takes props
interface Step2ConfigureProps {
	justification: string;
	setJustification: (v: string) => void;
	expiration: string;
	setExpiration: (v: string) => void;
	approver: string;
	setApprover: (v: string) => void;
}
const Step2Configure: React.FC<Step2ConfigureProps> = ({
	justification,
	setJustification,
	expiration,
	setExpiration,
	approver,
	setApprover,
}) => {
	return (
		<Card className="w-full mx-auto mt-8">
			<CardHeader>
				<CardTitle className="text-lg font-semibold">
					Configure
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6">
					<label
						htmlFor="justification"
						className="md:col-span-2 font-medium text-sm"
					>
						Justification
					</label>
					<textarea
						id="justification"
						aria-label="Justification"
						placeholder="Enter your justification here"
						className="md:col-span-10 border rounded p-2 w-full min-h-[60px] text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
						value={justification}
						onChange={(e) => setJustification(e.target.value)}
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6">
					<label
						htmlFor="expiration"
						className="md:col-span-2 font-medium text-sm"
					>
						Expiration date
					</label>
					<div className="md:col-span-10 w-full">
						<input
							type="text"
							id="expiration"
							aria-label="Expiration date"
							placeholder="YYYY-MM-DD"
							className="border rounded p-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
							value={expiration}
							onChange={(e) => setExpiration(e.target.value)}
						/>
						<div className="text-xs text-muted-foreground mt-1">
							Optional
						</div>
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
					<label
						htmlFor="approver"
						className="md:col-span-2 font-medium text-sm"
					>
						Approval
					</label>
					<div className="md:col-span-10 w-full">
						<input
							type="email"
							id="approver"
							aria-label="Approver email"
							placeholder="Enter the approver's email address"
							className="border rounded p-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
							value={approver}
							onChange={(e) => setApprover(e.target.value)}
						/>
						<div className="text-xs text-muted-foreground mt-1">
							Optional - Approvers will receive an email asking
							them to approve or reject the changes. Any risk
							changes will not be reflected until the waiver is
							approved.
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

// Step 3 Review
interface Step3ReviewProps {
	risks: typeof risksList;
	riskStates: RiskFormState[];
	justification: string;
	expiration: string;
	approver: string;
}
const Step3Review: React.FC<
	Step3ReviewProps & {
		onSubmit: () => void;
		submitting: boolean;
		submitted: boolean;
	}
> = ({
	risks,
	riskStates,
	justification,
	expiration,
	approver,
	onSubmit,
	submitting,
	submitted,
}) => {
	return (
		<Card className="w-full mx-auto mt-8">
			<CardHeader>
				<CardTitle className="text-lg font-semibold">
					Review & Confirm
				</CardTitle>
			</CardHeader>
			<CardContent>
				{submitted ? (
					<div className="text-green-600 font-semibold text-center py-8">
						Risk waiver submitted successfully!
					</div>
				) : (
					<>
						{risks.map((risk, idx) => (
							<div
								key={risk.id}
								className="mb-6 border-b pb-4 last:border-b-0 last:pb-0"
							>
								<div className="font-semibold text-base mb-1 flex items-center gap-2">
									<span
										className={`w-4 h-4 rounded-full ${
											risk.severity === "critical"
												? "bg-red-500"
												: "bg-orange-400"
										} flex items-center justify-center text-white text-xs`}
										aria-label={risk.severity}
										tabIndex={0}
									>
										!
									</span>
									{risk.title}
								</div>
								<div className="font-semibold text-sm mb-1 mt-2">
									Domains & IPs
								</div>
								<p className="text-sm text-muted-foreground mb-2">
									{riskStates[idx].selectedRadio === "all"
										? "All domains & IPs selected"
										: riskStates[idx].selectedDomains
												.length > 0
										? riskStates[idx].selectedDomains.join(
												", "
										  )
										: "No domains selected"}
								</p>
							</div>
						))}
						<div className="mb-4">
							<div className="font-semibold text-sm mb-1">
								Justification
							</div>
							<p className="text-sm text-muted-foreground mb-2">
								{justification || (
									<span className="italic">
										(none provided)
									</span>
								)}
							</p>
						</div>
						<div className="mb-4">
							<div className="font-semibold text-sm mb-1">
								Expiration date
							</div>
							<p className="text-sm text-muted-foreground mb-2">
								{expiration || (
									<span className="italic">
										(none provided)
									</span>
								)}
							</p>
						</div>
						<div>
							<div className="font-semibold text-sm mb-1">
								Approval Email
							</div>
							<p className="text-sm text-muted-foreground mb-2">
								{approver || (
									<span className="italic">
										(none provided)
									</span>
								)}
							</p>
						</div>
						<div className="flex justify-end mt-8">
							<Button
								type="button"
								className="px-6"
								onClick={onSubmit}
								disabled={submitting}
								aria-label="Submit risk waiver"
							>
								{submitting
									? "Submitting..."
									: "Submit risk waiver"}
							</Button>
						</div>
					</>
				)}
			</CardContent>
		</Card>
	);
};

export default function CreateRiskWaiver() {
	const [currentStep, setCurrentStep] = useState(0);
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

	// Stepper state for all risks
	const [riskStates, setRiskStates] = React.useState<RiskFormState[]>(
		risksList.map(() => ({
			selectedRadio: "selected",
			selectedDomains: ["api.sportskeeda.com", "apic.sportskeeda.com"],
		}))
	);
	const [justification, setJustification] = React.useState("");
	const [expiration, setExpiration] = React.useState("");
	const [approver, setApprover] = React.useState("");

	// Submission state
	const [submitting, setSubmitting] = React.useState(false);
	const [submitted, setSubmitted] = React.useState(false);

	const handleSubmit = () => {
		setSubmitting(true);
		// Simulate API call
		setTimeout(() => {
			// Log the data for now
			console.log({ riskStates, justification, expiration, approver });
			setSubmitting(false);
			setSubmitted(true);
		}, 1200);
	};

	const steps = [
		{
			title: "Select Risk",
			description: "Select Risk description",
			content: (
				<Step1AllRisks
					risks={risksList}
					riskStates={riskStates}
					setRiskStates={setRiskStates}
				/>
			),
		},
		{
			title: "Configure",
			description: "Configure description",
			content: (
				<Step2Configure
					justification={justification}
					setJustification={setJustification}
					expiration={expiration}
					setExpiration={setExpiration}
					approver={approver}
					setApprover={setApprover}
				/>
			),
		},
		{
			title: "Review",
			description: "Review description",
			content: (
				<Step3Review
					risks={risksList}
					riskStates={riskStates}
					justification={justification}
					expiration={expiration}
					approver={approver}
					onSubmit={handleSubmit}
					submitting={submitting}
					submitted={submitted}
				/>
			),
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

			<div className="mx-auto py-10">
				<Stepper
					steps={steps}
					currentStep={currentStep}
					onStepChange={setCurrentStep}
					className="w-full"
				/>
			</div>
		</SidebarLayout>
	);
}

// Reusable Section Components
function CustomerHeader({
	onOpenExportDialog,
}: {
	onOpenExportDialog: () => void;
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
			<PageHeader title="Create Risk Waiver" />
			<Separator className="my-4" />
		</>
	);
}
