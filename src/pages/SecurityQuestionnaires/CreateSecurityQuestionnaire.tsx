import SidebarLayout from "@/layouts/sidebar-layout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
	ChevronRight,
	ChevronLeft,
	CalendarDays,
	Users,
	FileText,
	Eye,
	MessageCircle,
	Info,
	ClipboardList,
	ArrowRight,
	Send,
	X,
	Plus,
} from "lucide-react";
import { useState } from "react";

const steps = [
	{ label: "Select type", icon: <ClipboardList className="w-4 h-4" /> },
	{ label: "Select schedule", icon: <CalendarDays className="w-4 h-4" /> },
	{ label: "Assign recipients", icon: <Users className="w-4 h-4" /> },
	{ label: "Title & message", icon: <MessageCircle className="w-4 h-4" /> },
	{ label: "Review & send", icon: <Eye className="w-4 h-4" /> },
];

function Stepper({
	step,
	onStep,
}: {
	step: number;
	onStep: (i: number) => void;
}) {
	return (
		<div className="flex flex-wrap gap-2 mb-6 w-full overflow-x-auto">
			{steps.map((s, i) => (
				<button
					key={i}
					type="button"
					className={`flex items-center gap-2 focus:outline-none ${
						i === step
							? "text-blue-600 font-bold"
							: i < step
							? "text-blue-600"
							: "text-muted-foreground"
					} ${i === step ? "underline" : ""}`}
					onClick={() => onStep(i)}
				>
					<div
						className={`rounded-full w-7 h-7 flex items-center justify-center border ${
							i <= step
								? "bg-blue-600 text-white border-blue-600"
								: "bg-card border-muted"
						}`}
					>
						{s.icon}
					</div>
					<span className="text-xs font-medium whitespace-nowrap">
						{s.label}
					</span>
					{i < steps.length - 1 && (
						<ChevronRight className="w-4 h-4" />
					)}
				</button>
			))}
		</div>
	);
}

export default function CreateSecurityQuestionnaire() {
	const [step, setStep] = useState(0);
	const [selectedType, setSelectedType] = useState("pci");
	const [riskVisibility, setRiskVisibility] = useState(
		"Show all risk information"
	);
	const [dueDate, setDueDate] = useState("2025-06-20");
	const [reminderEnabled, setReminderEnabled] = useState(true);
	const [reminderDate, setReminderDate] = useState("2025-06-13");
	const [resendEnabled, setResendEnabled] = useState(false);
	const [recipients, setRecipients] = useState([
		{ name: "John Doe", email: "john.doe@example.com", selected: true },
		{
			name: "Jane Smith",
			email: "jane.smith@example.com",
			selected: false,
		},
	]);
	const [newRecipientName, setNewRecipientName] = useState("");
	const [newRecipientEmail, setNewRecipientEmail] = useState("");
	const [title, setTitle] = useState("PCI DSS v4 - SAQ C-VT");
	const [message, setMessage] = useState(
		"Please complete this security questionnaire. If you are not the right person to complete a questionnaire, don't worry. You'll be able to invite your colleague to answer the questionnaire from within the UpGuard platform."
	);

	const questionnaireTypes = [
		{
			value: "pci",
			label: "PCI DSS v4 - SAQ C-VT",
			description:
				"Evaluate an organization's alignment with PCI DSS v4 requirements specific to SAQ C-VT, which applies to merchants using web-based virtual payment terminals on dedicated, isolated workstations. This questionnaire is designed for businesses processing transactions via a browser-based interface provided by a PCI DSS-compliant third party, without local storage of cardholder data.",
		},
	];

	// Step content
	let content = null;
	if (step === 0) {
		content = (
			<div className="flex flex-col gap-6">
				<div>
					<div className="font-semibold mb-2 flex items-center gap-2">
						<ClipboardList className="w-4 h-4" />
						Select questionnaire type
					</div>
					<div className="text-xs text-muted-foreground mb-2">
						Select from our list of questionnaires below. Preview,
						manage, and create questionnaire types via the
						questionnaire library.
					</div>
					<select
						className="w-full border rounded px-3 py-2 dark:bg-zinc-900"
						value={selectedType}
						onChange={(e) => setSelectedType(e.target.value)}
					>
						{questionnaireTypes.map((q) => (
							<option key={q.value} value={q.value}>
								{q.label}
							</option>
						))}
					</select>
					<div className="bg-muted/50 rounded p-3 mt-3">
						<div className="font-medium flex items-center gap-2">
							{questionnaireTypes[0].label}{" "}
							<span className="text-xs text-blue-600">
								Preview
							</span>
						</div>
						<div className="text-xs text-muted-foreground mt-1">
							{questionnaireTypes[0].description}
						</div>
					</div>
				</div>
				<div>
					<div className="font-semibold mb-2 flex items-center gap-2">
						<Info className="w-4 h-4" />
						Risk information visibility
					</div>
					<select
						className="w-full border rounded px-3 py-2 dark:bg-zinc-900"
						value={riskVisibility}
						onChange={(e) => setRiskVisibility(e.target.value)}
					>
						<option>Show all risk information</option>
						<option>Hide all risk information</option>
					</select>
				</div>
			</div>
		);
	} else if (step === 1) {
		content = (
			<div className="flex flex-col gap-6">
				<div>
					<div className="font-semibold mb-2 flex items-center gap-2">
						<CalendarDays className="w-4 h-4" />
						Select schedule
					</div>
					<div className="text-xs text-muted-foreground mb-2">
						Let the vendor know when the questionnaire should be
						completed by. Optionally, you can set reminders to
						resend the questionnaire.
					</div>
				</div>
				<div className="bg-muted/50 rounded p-4 flex flex-col gap-4">
					<div>
						<label className="text-xs font-medium flex items-center gap-2">
							<CalendarDays className="w-4 h-4" />
							Set a due date
						</label>
						<Input
							type="date"
							value={dueDate}
							onChange={(e) => setDueDate(e.target.value)}
							className="mt-1"
						/>
					</div>
					<div>
						<label className="flex items-center gap-2 text-xs font-medium">
							<Checkbox
								checked={reminderEnabled}
								onCheckedChange={(v) => setReminderEnabled(!!v)}
							/>
							Add a reminder
						</label>
						<Input
							type="date"
							value={reminderDate}
							onChange={(e) => setReminderDate(e.target.value)}
							className="mt-1"
							disabled={!reminderEnabled}
						/>
					</div>
					<div>
						<label className="flex items-center gap-2 text-xs font-medium">
							<Checkbox
								checked={resendEnabled}
								onCheckedChange={(v) => setResendEnabled(!!v)}
							/>
							Resend questionnaire
						</label>
					</div>
				</div>
			</div>
		);
	} else if (step === 2) {
		content = (
			<div className="flex flex-col gap-6">
				<div>
					<div className="font-semibold mb-2 flex items-center gap-2">
						<Users className="w-4 h-4" />
						Assign recipients
					</div>
					<div className="text-xs text-muted-foreground mb-2">
						Select at least one recipient for this questionnaire.
					</div>
				</div>
				<div className="bg-muted/50 rounded p-4">
					<div className="font-semibold text-xs mb-2">
						Choose recipients
					</div>
					<div className="flex flex-col gap-2">
						{recipients.map((r, i) => (
							<div
								key={r.email}
								className="flex items-center gap-2"
							>
								<Checkbox
									checked={r.selected}
									onCheckedChange={(v) =>
										setRecipients((recipients) =>
											recipients.map((rec, idx) =>
												idx === i
													? { ...rec, selected: !!v }
													: rec
											)
										)
									}
								/>
								<span className="font-medium">{r.name}</span>
								<span className="text-xs text-muted-foreground">
									{r.email}
								</span>
								<Button
									variant="ghost"
									size="icon"
									aria-label="Remove recipient"
									onClick={() =>
										setRecipients((recipients) =>
											recipients.filter(
												(_, idx) => idx !== i
											)
										)
									}
								>
									<X className="w-4 h-4" />
								</Button>
							</div>
						))}
						<div className="flex gap-2 mt-2">
							<Input
								placeholder="Name"
								value={newRecipientName}
								onChange={(e) =>
									setNewRecipientName(e.target.value)
								}
								className="w-32"
							/>
							<Input
								placeholder="Email"
								value={newRecipientEmail}
								onChange={(e) =>
									setNewRecipientEmail(e.target.value)
								}
								className="w-48"
							/>
							<Button
								variant="outline"
								size="icon"
								aria-label="Add recipient"
								onClick={() => {
									if (newRecipientName && newRecipientEmail) {
										setRecipients((recipients) => [
											...recipients,
											{
												name: newRecipientName,
												email: newRecipientEmail,
												selected: false,
											},
										]);
										setNewRecipientName("");
										setNewRecipientEmail("");
									}
								}}
							>
								<Plus className="w-4 h-4" />
							</Button>
						</div>
					</div>
				</div>
			</div>
		);
	} else if (step === 3) {
		content = (
			<div className="flex flex-col gap-6">
				<div>
					<div className="font-semibold mb-2 flex items-center gap-2">
						<MessageCircle className="w-4 h-4" />
						Title & message
					</div>
					<div className="text-xs text-muted-foreground mb-2">
						The title and message will be visible to recipients when
						they receive the questionnaire.
					</div>
				</div>
				<div className="bg-muted/50 rounded p-4 flex flex-col gap-4">
					<div>
						<label className="text-xs font-medium">
							Add a title
						</label>
						<Input
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="mt-1"
						/>
					</div>
					<div>
						<label className="text-xs font-medium">
							Add a message
						</label>
						<Textarea
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							className="mt-1 min-h-[100px]"
						/>
						<div className="text-xs text-muted-foreground mt-2">
							The variable{" "}
							<span className="font-mono">
								{"{{VendorName}}"}
							</span>{" "}
							can be used to personalize your message.
						</div>
					</div>
				</div>
			</div>
		);
	} else if (step === 4) {
		content = (
			<div className="flex flex-col gap-6">
				<div>
					<div className="font-semibold mb-2 flex items-center gap-2">
						<Eye className="w-4 h-4" />
						Review & send
					</div>
					<div className="text-xs text-muted-foreground mb-2">
						Please review this carefully before sending.
					</div>
				</div>
				<div className="bg-muted/50 rounded p-4 overflow-x-auto">
					<table className="min-w-full text-sm">
						<tbody>
							<tr>
								<td className="py-2 pr-4 font-medium">
									Questionnaire
								</td>
								<td className="py-2">
									{
										questionnaireTypes.find(
											(q) => q.value === selectedType
										)?.label
									}
								</td>
							</tr>
							<tr>
								<td className="py-2 pr-4 font-medium">
									Risk Visibility
								</td>
								<td className="py-2">{riskVisibility}</td>
							</tr>
							<tr>
								<td className="py-2 pr-4 font-medium">
									Due date
								</td>
								<td className="py-2">{dueDate}</td>
							</tr>
							<tr>
								<td className="py-2 pr-4 font-medium">
									Reminder
								</td>
								<td className="py-2">
									{reminderEnabled ? reminderDate : "—"}
								</td>
							</tr>
							<tr>
								<td className="py-2 pr-4 font-medium">
									Recipients
								</td>
								<td className="py-2">
									<div className="flex flex-col md:flex-row gap-2">
										<div>
											<div className="text-xs text-muted-foreground">
												Customers
											</div>
											<div>Acme Corp</div>
										</div>
										<div>
											<div className="text-xs text-muted-foreground">
												Recipient(s)
											</div>
											<div>
												{recipients
													.filter((r) => r.selected)
													.map(
														(r) =>
															`${r.name} (${r.email})`
													)
													.join(", ") || "—"}
											</div>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<td className="py-2 pr-4 font-medium">Title</td>
								<td className="py-2">{title}</td>
							</tr>
							<tr>
								<td className="py-2 pr-4 font-medium">
									Message
								</td>
								<td className="py-2">{message}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	}

	return (
		<SidebarLayout
			breadcrumbs={[
				{ label: "Security Questionnaires", href: "/questionnaires" },
				{ label: "Send Questionnaires", href: "" },
			]}
		>
			<PageHeader
				title={
					<span className="flex items-center gap-2">
						<FileText className="w-5 h-5" />
						Send questionnaires
					</span>
				}
				info="Send a pre-built security questionnaire based on a variety of security standards."
				actions={null}
			/>
			<div className="w-full mx-auto px-2 sm:px-4">
				<div className="mb-6">
					<Stepper step={step} onStep={setStep} />
				</div>
				<div className="bg-white dark:bg-zinc-900 border rounded-2xl shadow-lg p-8 min-h-[340px] mb-8 transition-colors">
					{content}
				</div>
				<div className="flex flex-col sm:flex-row justify-between gap-2">
					<Button
						variant="ghost"
						onClick={() => setStep(Math.max(0, step - 1))}
						disabled={step === 0}
						className="w-full sm:w-auto"
					>
						<ChevronLeft className="w-4 h-4 mr-1" /> Previous
					</Button>
					<div className="flex gap-2 w-full sm:w-auto justify-end">
						<Button variant="ghost" className="w-full sm:w-auto">
							Cancel
						</Button>
						<Button
							onClick={() =>
								setStep((s) =>
									Math.min(s + 1, steps.length - 1)
								)
							}
							className="w-full sm:w-auto"
						>
							{step === steps.length - 1 ? (
								<>
									<Send className="w-4 h-4 mr-1" />
									Send questionnaire
								</>
							) : (
								<>
									Next <ArrowRight className="w-4 h-4 ml-1" />
								</>
							)}
						</Button>
					</div>
				</div>
			</div>
		</SidebarLayout>
	);
}
