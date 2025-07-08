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
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

import { Stepper } from "@/components/Stepper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/components/ui/accordion";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";

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

// Mock risk categories
const riskCategories = [
	{ label: "Show all", value: "all", count: 49 },
	{ label: "Website", value: "website", count: 10 },
	{ label: "Encryption", value: "encryption", count: 12 },
	{ label: "Vulnerability Management", value: "vuln", count: 14 },
	{ label: "Attack Surface", value: "attack", count: 1 },
	{ label: "Network", value: "network", count: 5 },
	{ label: "Email", value: "email", count: 3 },
	{ label: "Data Leakage", value: "leakage", count: 1 },
	{ label: "DNS", value: "dns", count: 3 },
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
	const [selectedCategory, setSelectedCategory] = useState("all");

	// Filter risks by category
	const filteredRisks = risks.filter((risk) => {
		if (selectedCategory === "all") return true;
		// For demo, assign categories by id or title (customize as needed)
		if (selectedCategory === "website")
			return (
				risk.title.toLowerCase().includes("ssl") ||
				risk.title.toLowerCase().includes("http")
			);
		if (selectedCategory === "encryption")
			return (
				risk.title.toLowerCase().includes("encryption") ||
				risk.title.toLowerCase().includes("ssl")
			);
		if (selectedCategory === "vuln")
			return (
				risk.title.toLowerCase().includes("vulnerab") ||
				risk.title.toLowerCase().includes("nginx")
			);
		if (selectedCategory === "attack")
			return risk.title.toLowerCase().includes("attack");
		if (selectedCategory === "network")
			return risk.title.toLowerCase().includes("network");
		if (selectedCategory === "email")
			return (
				risk.title.toLowerCase().includes("email") ||
				risk.title.toLowerCase().includes("dmarc")
			);
		if (selectedCategory === "leakage")
			return risk.title.toLowerCase().includes("leak");
		if (selectedCategory === "dns")
			return risk.title.toLowerCase().includes("dns");
		return false;
	});

	return (
		<div className="w-full mx-auto flex gap-4">
			<div className="w-3/4">
				<div className="mb-4 flex justify-between gap-4">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button
								className="border rounded px-3 py-2 w-full flex items-center justify-between bg-background text-foreground text-sm"
								aria-label="Select risk category"
							>
								{
									riskCategories.find(
										(c) => c.value === selectedCategory
									)?.label
								}{" "}
								(
								{
									riskCategories.find(
										(c) => c.value === selectedCategory
									)?.count
								}
								)
								<svg
									className="w-4 h-4 ml-2"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="start"
							className="w-full min-w-[220px]"
						>
							{riskCategories.map((cat) => (
								<DropdownMenuItem
									key={cat.value}
									onSelect={() =>
										setSelectedCategory(cat.value)
									}
									className={
										selectedCategory === cat.value
											? "bg-accent text-accent-foreground"
											: ""
									}
								>
									{cat.label} ({cat.count})
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
					<Input placeholder="Search risks" type="search" />
				</div>
				<Accordion type="multiple" className="border rounded-md">
					{filteredRisks.map((risk, idx) => {
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
											value={
												riskStates[idx].selectedRadio
											}
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
												<span>
													Selected domains & IPs
												</span>
											</label>
										</RadioGroup>
										<p className="text-xs text-muted-foreground mt-2 ml-6">
											This risk will only ever be waived
											for the selected{" "}
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
															setRiskStates(
																(prev) =>
																	prev.map(
																		(
																			r,
																			i
																		) =>
																			i ===
																			idx
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
											{
												riskStates[idx].selectedDomains
													.length
											}
											/{domainList.length} domains & IPs
										</p>
									</div>
								</AccordionContent>
							</AccordionItem>
						);
					})}
				</Accordion>
			</div>
			<div className="w-1/4">
				<Card className="mb-4">
					<CardHeader>
						<CardTitle className="text-base font-semibold">
							Your remediation plan
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex gap-4 mb-4">
							<div className="flex-1 border py-2 rounded-lg text-center">
								<div className="text-xs text-muted-foreground mb-1">
									Risks selected
								</div>
								<div className="text-2xl font-bold">
									{
										riskStates.filter(
											(r) =>
												r.selectedRadio ===
													"selected" &&
												r.selectedDomains.length > 0
										).length
									}
								</div>
							</div>
							<div className="flex-1 border py-2 rounded-lg text-center">
								<div className="text-xs text-muted-foreground mb-1">
									Affected assets
								</div>
								<div className="text-2xl font-bold">
									{riskStates.reduce(
										(acc, r) =>
											acc +
											(r.selectedRadio === "selected"
												? r.selectedDomains.length
												: 0),
										0
									)}
								</div>
							</div>
						</div>
						<div>
							<div className="text-md text-muted-foreground mb-1 font-semibold text-center">
								Score impact for Sportskeeda
							</div>
							<div className="border rounded-lg p-4 text-center">
								<p className="text-sm text-muted-foreground mb-2">
									Potential New Score
								</p>
								<div className="flex items-center gap-2 justify-center">
									<span className="text-2xl font-bold text-green-600">
										B
									</span>
									<span className="text-2xl font-bold">
										689
									</span>
									<span className="text-green-600 font-semibold">
										(+17)
									</span>
								</div>
								<p className="text-xs text-muted-foreground">
									Based on the risks and assets you've
									selected the score will likely increase by
									17 points if all risks are remediated.
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

// Step 2 Settings (new)
interface Recipient {
	name: string;
	title?: string;
	email: string;
}

interface Step2SettingsProps {
	requestName: string;
	setRequestName: (v: string) => void;
	recipients: Recipient[];
	setRecipients: (v: Recipient[]) => void;
	allContacts: Recipient[];
	setAllContacts: (v: Recipient[]) => void;
	dueDateEnabled: boolean;
	setDueDateEnabled: (v: boolean) => void;
	dueDate: Date | undefined;
	setDueDate: (v: Date | undefined) => void;
	message: string;
	setMessage: (v: string) => void;
}

const Step2Settings: React.FC<Step2SettingsProps> = ({
	requestName,
	setRequestName,
	recipients,
	setRecipients,
	allContacts,
	setAllContacts,
	dueDateEnabled,
	setDueDateEnabled,
	dueDate,
	setDueDate,
	message,
	setMessage,
}) => {
	const [showNewRecipient, setShowNewRecipient] = useState(false);
	const [newRecipient, setNewRecipient] = useState<Recipient>({
		name: "",
		title: "",
		email: "",
	});
	const [recipientSearch, setRecipientSearch] = useState("");

	const handleAddRecipient = () => {
		if (!newRecipient.name || !newRecipient.email) return;
		setAllContacts([...allContacts, newRecipient]);
		setRecipients([...recipients, newRecipient]);
		setNewRecipient({ name: "", title: "", email: "" });
		setShowNewRecipient(false);
	};

	const handleCancelAddRecipient = () => {
		setShowNewRecipient(false);
		setNewRecipient({ name: "", title: "", email: "" });
	};

	const handleToggleRecipient = (contact: Recipient) => {
		if (recipients.some((r) => r.email === contact.email)) {
			setRecipients(recipients.filter((r) => r.email !== contact.email));
		} else {
			setRecipients([...recipients, contact]);
		}
	};

	const filteredContacts = allContacts.filter(
		(contact) =>
			contact.name
				.toLowerCase()
				.includes(recipientSearch.toLowerCase()) ||
			contact.email.toLowerCase().includes(recipientSearch.toLowerCase())
	);

	return (
		<Card className="w-full mx-auto mt-8">
			<CardHeader>
				<CardTitle className="text-lg font-semibold">
					Settings
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6">
					<label
						htmlFor="requestName"
						className="md:col-span-2 font-medium text-sm"
					>
						Request name
					</label>
					<Input
						id="requestName"
						aria-label="Request name"
						placeholder="Enter request name"
						className="md:col-span-10 border rounded p-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-primary"
						value={requestName}
						onChange={(e) => setRequestName(e.target.value)}
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6">
					<label
						htmlFor="recipients"
						className="md:col-span-2 font-medium text-sm"
					>
						Recipients
					</label>
					<div className="md:col-span-10 w-full flex flex-col gap-2">
						<Popover>
							<PopoverTrigger asChild>
								<Button
									type="button"
									variant="outline"
									className="w-fit"
									aria-label="Select recipients"
								>
									{recipients.length > 0
										? recipients
												.map((r) => r.name)
												.join(", ")
										: "Select a contact"}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-72">
								<Input
									placeholder="Search contacts..."
									value={recipientSearch}
									onChange={(e) =>
										setRecipientSearch(e.target.value)
									}
									className="mb-2"
									aria-label="Search recipients"
									autoFocus
								/>
								<div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
									{filteredContacts.length === 0 && (
										<span className="text-xs text-muted-foreground px-2">
											No contacts found.
										</span>
									)}
									{filteredContacts.map((contact) => (
										<label
											key={contact.email}
											className="flex items-center gap-2 cursor-pointer"
										>
											<Checkbox
												checked={recipients.some(
													(r) =>
														r.email ===
														contact.email
												)}
												onCheckedChange={() =>
													handleToggleRecipient(
														contact
													)
												}
												id={`recipient-${contact.email}`}
												aria-label={`Select recipient ${contact.name}`}
											/>
											<span>
												{contact.name}
												<span className="text-xs text-muted-foreground">
													({contact.email})
												</span>
											</span>
										</label>
									))}
								</div>
							</PopoverContent>
						</Popover>
						<Popover
							open={showNewRecipient}
							onOpenChange={setShowNewRecipient}
						>
							<PopoverTrigger asChild>
								<Button
									type="button"
									variant="outline"
									className="w-fit mt-1"
									aria-label="Add new recipient"
								>
									+ New Recipient
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-80">
								<div className="flex flex-col gap-2">
									<Input
										placeholder="Name"
										value={newRecipient.name}
										onChange={(e) =>
											setNewRecipient({
												...newRecipient,
												name: e.target.value,
											})
										}
										aria-label="Recipient name"
										autoFocus
									/>
									<Input
										placeholder="Title (optional)"
										value={newRecipient.title}
										onChange={(e) =>
											setNewRecipient({
												...newRecipient,
												title: e.target.value,
											})
										}
										aria-label="Recipient title"
									/>
									<Input
										placeholder="Email"
										value={newRecipient.email}
										onChange={(e) =>
											setNewRecipient({
												...newRecipient,
												email: e.target.value,
											})
										}
										aria-label="Recipient email"
										type="email"
									/>
									<div className="flex gap-2 mt-1">
										<Button
											type="button"
											onClick={handleAddRecipient}
											aria-label="Add recipient"
										>
											Add
										</Button>
										<Button
											type="button"
											variant="outline"
											onClick={handleCancelAddRecipient}
											aria-label="Cancel add recipient"
										>
											Cancel
										</Button>
									</div>
								</div>
							</PopoverContent>
						</Popover>
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6">
					<label
						htmlFor="dueDate"
						className="md:col-span-2 font-medium text-sm"
					>
						Schedule
					</label>
					<div className="md:col-span-10 w-full flex flex-col gap-2">
						<label className="flex items-center gap-2 cursor-pointer">
							<Checkbox
								checked={dueDateEnabled}
								onCheckedChange={(v) => setDueDateEnabled(!!v)}
								id="dueDateCheckbox"
								aria-label="Set a due date"
							/>
							<span>Set a due date</span>
						</label>
						{dueDateEnabled && (
							<div className="mt-2">
								<Calendar
									mode="single"
									selected={dueDate}
									onSelect={setDueDate}
									aria-label="Select due date"
								/>
							</div>
						)}
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6">
					<label
						htmlFor="message"
						className="md:col-span-2 font-medium text-sm"
					>
						Message
					</label>
					<Textarea
						id="message"
						aria-label="Message"
						placeholder="Include a custom message with your request."
						className="md:col-span-10 border rounded p-2 w-full min-h-[80px] text-sm focus:outline-none focus:ring-2 focus:ring-primary"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
				</div>
			</CardContent>
		</Card>
	);
};

// Step 3 Review
interface Step3ReviewProps {
	risks: typeof risksList;
	riskStates: RiskFormState[];
	requestName: string;
	recipients: Recipient[];
	dueDateEnabled: boolean;
	dueDate: Date | undefined;
	message: string;
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
	requestName,
	recipients,
	dueDateEnabled,
	dueDate,
	message,
	onSubmit,
	submitting,
	submitted,
}) => {
	return (
		<Card className="w-full mx-auto mt-8">
			<CardHeader>
				<CardTitle className="text-lg font-semibold">
					Review & Send
				</CardTitle>
			</CardHeader>
			<CardContent>
				{submitted ? (
					<div className="text-green-600 font-semibold text-center py-8">
						Remediation request submitted successfully!
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-12 gap-8">
						{/* Left: Review details */}
						<div className="md:col-span-8 flex flex-col gap-6">
							<div>
								<div className="font-semibold text-base mb-1">
									Vendor
								</div>
								<p className="text-sm text-muted-foreground mb-2">
									Sportskeeda
								</p>
							</div>
							<div>
								<div className="font-semibold text-base mb-1">
									Risks and assets
								</div>
								{risks.map((risk, idx) => {
									const selected = riskStates[idx];
									if (
										selected.selectedRadio === "selected" &&
										selected.selectedDomains.length === 0
									) {
										return null;
									}
									return (
										<div
											key={risk.id}
											className="mb-4 border rounded p-4 bg-muted/30"
										>
											<div className="flex items-center gap-2 mb-1">
												<span
													className={`w-4 h-4 rounded-full ${
														risk.severity ===
														"critical"
															? "bg-red-500"
															: "bg-orange-400"
													} flex items-center justify-center text-white text-xs`}
													aria-label={risk.severity}
													tabIndex={0}
												>
													!
												</span>
												<span className="font-semibold text-base">
													{risk.title}
												</span>
											</div>
											<div className="text-xs text-muted-foreground mb-1">
												{risk.subtitle}
											</div>
											<div className="text-sm mb-1">
												{selected.selectedRadio ===
												"all"
													? "All domains & IPs selected"
													: selected.selectedDomains.join(
															", "
													  )}
											</div>
										</div>
									);
								})}
							</div>
							<div>
								<div className="font-semibold text-base mb-1">
									Request name
								</div>
								<p className="text-sm text-muted-foreground mb-2">
									{requestName}
								</p>
							</div>
							<div>
								<div className="font-semibold text-base mb-1">
									Recipients
								</div>
								{recipients.length === 0 ? (
									<p className="text-sm italic text-muted-foreground">
										(none selected)
									</p>
								) : (
									<ul className="text-sm text-muted-foreground">
										{recipients.map((r) => (
											<li key={r.email} className="mb-1">
												<span className="font-medium text-foreground">
													{r.name}
												</span>{" "}
												<span className="text-xs">
													({r.email})
												</span>
											</li>
										))}
									</ul>
								)}
							</div>
							<div>
								<div className="font-semibold text-base mb-1">
									Due date
								</div>
								<p className="text-sm text-muted-foreground mb-2">
									{dueDateEnabled && dueDate ? (
										dueDate.toLocaleDateString()
									) : (
										<span className="italic">
											(none set)
										</span>
									)}
								</p>
							</div>
							<div>
								<div className="font-semibold text-base mb-1">
									Message
								</div>
								<p className="text-sm text-muted-foreground mb-2 whitespace-pre-line">
									{message || (
										<span className="italic">
											(none provided)
										</span>
									)}
								</p>
							</div>
						</div>
						{/* Right: Remediation plan summary */}
						<div className="md:col-span-4">
							<Card className="mb-4">
								<CardHeader>
									<CardTitle className="text-base font-semibold">
										Your remediation plan
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="flex gap-4 mb-4">
										<div className="flex-1 border py-2 rounded-lg text-center">
											<div className="text-xs text-muted-foreground mb-1">
												Risks selected
											</div>
											<div className="text-2xl font-bold">
												{
													riskStates.filter(
														(r) =>
															r.selectedRadio ===
																"selected" &&
															r.selectedDomains
																.length > 0
													).length
												}
											</div>
										</div>
										<div className="flex-1 border py-2 rounded-lg text-center">
											<div className="text-xs text-muted-foreground mb-1">
												Affected assets
											</div>
											<div className="text-2xl font-bold">
												{riskStates.reduce(
													(acc, r) =>
														acc +
														(r.selectedRadio ===
														"selected"
															? r.selectedDomains
																	.length
															: 0),
													0
												)}
											</div>
										</div>
									</div>
									<div>
										<div className="text-md text-muted-foreground mb-1 font-semibold text-center">
											Score impact for Sportskeeda
										</div>
										<div className="border rounded-lg p-4 text-center">
											<p className="text-sm text-muted-foreground mb-2">
												Potential new score
											</p>
											<div className="flex items-center gap-2 justify-center">
												<span className="text-2xl font-bold text-green-600">
													B
												</span>
												<span className="text-2xl font-bold">
													692
												</span>
												<span className="text-green-600 font-semibold">
													(+20)
												</span>
											</div>
											<p className="text-xs text-muted-foreground">
												Based on the risks and assets
												you've selected the score will
												likely increase by 20 points if
												all risks are remediated.
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
							<div className="flex justify-end mt-8">
								<Button
									type="button"
									className="px-6"
									onClick={onSubmit}
									disabled={submitting}
									aria-label="Submit remediation request"
								>
									{submitting
										? "Submitting..."
										: "Submit remediation request"}
								</Button>
							</div>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default function CreateRemediation() {
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

	// Step 2 Settings state
	const [requestName, setRequestName] = React.useState(
		"Sportskeeda Remediation Request"
	);
	const [allContacts, setAllContacts] = React.useState<Recipient[]>([
		{
			name: "Ankit Sharma",
			email: "ankit.sharma@zoominsurancebrokers.com",
		},
		{ name: "Priya Patel", email: "priya.patel@cybermail.com" },
		{ name: "Rahul Mehra", email: "rahul.mehra@securecorp.com" },
		{ name: "Emily Chen", email: "emily.chen@infosec.com" },
		{ name: "Sofia Garcia", email: "sofia.garcia@riskwatch.com" },
		{ name: "David Kim", email: "david.kim@threatlabs.com" },
	]);
	const [recipients, setRecipients] = React.useState<Recipient[]>([]);
	const [dueDateEnabled, setDueDateEnabled] = React.useState(false);
	const [dueDate, setDueDate] = React.useState<Date | undefined>(undefined);
	const [message, setMessage] = React.useState("");

	// Submission state
	const [submitting, setSubmitting] = React.useState(false);
	const [submitted, setSubmitted] = React.useState(false);

	const handleSubmit = () => {
		setSubmitting(true);
		// Simulate API call
		setTimeout(() => {
			// Log the data for now
			console.log({ riskStates });
			setSubmitting(false);
			setSubmitted(true);
		}, 1200);
	};

	const steps = [
		{
			title: "Select Risk & Assets",
			description: "Select Risk & Assets to manage",
			content: (
				<Step1AllRisks
					risks={risksList}
					riskStates={riskStates}
					setRiskStates={setRiskStates}
				/>
			),
		},
		{
			title: "Settings",
			description: "Configure Settings",
			content: (
				<Step2Settings
					requestName={requestName}
					setRequestName={setRequestName}
					recipients={recipients}
					setRecipients={setRecipients}
					allContacts={allContacts}
					setAllContacts={setAllContacts}
					dueDateEnabled={dueDateEnabled}
					setDueDateEnabled={setDueDateEnabled}
					dueDate={dueDate}
					setDueDate={setDueDate}
					message={message}
					setMessage={setMessage}
				/>
			),
		},
		{
			title: "Review & Submit",
			description: "Review & Submit",
			content: (
				<Step3Review
					risks={risksList}
					riskStates={riskStates}
					requestName={requestName}
					recipients={recipients}
					message={message}
					dueDateEnabled={dueDateEnabled}
					dueDate={dueDate}
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
				<CustomerHeader />
			</div>
			<div className="mx-auto py-10">
				<Stepper
					// hasAdditionalSection={
					// 	<div className="flex flex-col gap-4 mb-4">
					// 	</div>
					// }
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
			<PageHeader title="Request Remediation" />

			<Separator className="my-4" />
		</>
	);
}
