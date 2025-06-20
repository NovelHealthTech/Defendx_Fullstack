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
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const steps = [
	{ label: "Select type", icon: <ClipboardList className="w-4 h-4" /> },
	{ label: "Select schedule", icon: <CalendarDays className="w-4 h-4" /> },
	{ label: "Assign recipient", icon: <Users className="w-4 h-4" /> },
	{ label: "Title & message", icon: <MessageCircle className="w-4 h-4" /> },
	{ label: "Review & send", icon: <Eye className="w-4 h-4" /> },
];

function getToday() {
	return new Date().toISOString().split("T")[0];
}

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
					className={`flex items-center gap-2 focus:outline-none ${i === step
							? "text-blue-600 font-bold"
							: i < step
								? "text-blue-600"
								: "text-muted-foreground"
						} ${i === step ? "underline" : ""}`}
					onClick={() => onStep(i)}
				>
					<div
						className={`rounded-full w-7 h-7 flex items-center justify-center border ${i <= step
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

interface QuestionnaireType {
	questionnaire_type_id: number;
	questionnaire_type_name: string;
	description?: string;
}

export default function CreateSecurityQuestionnaire() {
	const navigate = useNavigate();
	const [step, setStep] = useState(0);
	const [questionnaireTypes, setQuestionnaireTypes] = useState<QuestionnaireType[]>([]);
	const [selectedType, setSelectedType] = useState<number | "">("");
	const [riskVisibility, setRiskVisibility] = useState("ShowAllRiskInformation");
	const [dueDate, setDueDate] = useState("");
	const [reminderEnabled, setReminderEnabled] = useState(true);
	const [reminderDate, setReminderDate] = useState("");
	const [resendEnabled, setResendEnabled] = useState(false);
	// Only one recipient, always checked, editable, required
	const [recipients, setRecipients] = useState([
		{ name: "", email: "", selected: true }
	]);
	const [title, setTitle] = useState("");
	const [message] = useState(
		"Please complete this security questionnaire. If you are not the right person to complete a questionnaire, don't worry. You'll be able to invite your colleague to answer the questionnaire from within the UpGuard platform."
	);
	const [loadingTypes, setLoadingTypes] = useState(true);
	const [errorTypes, setErrorTypes] = useState<string | null>(null);
	const [sending, setSending] = useState(false);

	const today = getToday();

	useEffect(() => {
		const fetchTypes = async () => {
			setLoadingTypes(true);
			setErrorTypes(null);
			try {
				const token = localStorage.getItem("token");
				const response = await axios.post(
					"https://cyber.defendx.co.in/api/upguard/question-types",
					{},
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setQuestionnaireTypes(response.data.data || []);
				if (response.data.data && response.data.data.length > 0) {
					setSelectedType(response.data.data[0].questionnaire_type_id);
					setTitle(response.data.data[0].questionnaire_type_name);
				}
			} catch (err) {
				setErrorTypes("Failed to fetch questionnaire types.");
			} finally {
				setLoadingTypes(false);
			}
		};
		fetchTypes();
	}, []);

	// Send questionnaire API call
	const handleSendQuestionnaire = async () => {
		setSending(true);
		try {
			const token = localStorage.getItem("token");
			const payload = {
				due_date: dueDate,
				questionnaire_type_id: selectedType,
				recipient_email: recipients[0]?.email,
				risk_information_visiblity: riskVisibility,
				vendor_id: parseInt(localStorage.getItem("customerId") || "0", 10)
			};
			await axios.post(
				"https://cyber.defendx.co.in/api/upguard/send-vendor-questionnaires",
				payload,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			// On success, redirect
			navigate("/security-questionnaires");
		} catch (error: any) {
			alert("Failed to send questionnaire.");
		} finally {
			setSending(false);
		}
	};

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
					{loadingTypes ? (
						<div>Loading...</div>
					) : errorTypes ? (
						<div className="text-red-600">{errorTypes}</div>
					) : (
						<>
							<select
								className="w-full border rounded px-3 py-2 dark:bg-zinc-900"
								value={selectedType}
								onChange={(e) => {
									setSelectedType(Number(e.target.value));
									const found = questionnaireTypes.find(
										(q) =>
											q.questionnaire_type_id ===
											Number(e.target.value)
									);
									if (found) setTitle(found.questionnaire_type_name);
								}}
							>
								<option value="">Select a questionnaire type...</option>
								{questionnaireTypes.map((q) => (
									<option
										key={q.questionnaire_type_id}
										value={q.questionnaire_type_id}
									>
										{q.questionnaire_type_name}
									</option>
								))}
							</select>
							<div className="bg-muted/50 rounded p-3 mt-3">
								<div className="font-medium flex items-center gap-2">
									{
										questionnaireTypes.find(
											(q) =>
												q.questionnaire_type_id ===
												selectedType
										)?.questionnaire_type_name
									}{" "}
									<span className="text-xs text-blue-600">
										Preview
									</span>
								</div>
								<div className="text-xs text-muted-foreground mt-1">
									{
										questionnaireTypes.find(
											(q) =>
												q.questionnaire_type_id ===
												selectedType
										)?.description
									}
								</div>
							</div>
						</>
					)}
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
						<option value="ShowAllRiskInformation">
							Show all risk information
						</option>
						<option value="HideAllRiskInformation">
							Hide all risk information
						</option>
						<option value="HideSeverity">
							Hide severity
						</option>
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
						Set a due date
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
							min={today}
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
							min={today}
						/>
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
						Assign recipient
					</div>
					<div className="text-xs text-muted-foreground mb-2">
						Enter the recipient for this questionnaire. You must add one recipient to proceed.
					</div>
				</div>
				<div className="bg-muted/50 rounded p-4">
					<div className="font-semibold text-xs mb-2">
						Recipient details
					</div>
					<div className="flex flex-col gap-2">
						<div className="flex items-center gap-2">
							<Checkbox checked readOnly />
							<Input
								placeholder="Name"
								value={recipients[0]?.name || ""}
								onChange={e => {
									const val = e.target.value;
									setRecipients(r =>
										r.length === 0
											? [{ name: val, email: "", selected: true }]
											: [{ ...r[0], name: val, selected: true }]
									);
								}}
								className="w-32"
							/>
							<Input
								placeholder="Email"
								value={recipients[0]?.email || ""}
								onChange={e => {
									const val = e.target.value;
									setRecipients(r =>
										r.length === 0
											? [{ name: "", email: val, selected: true }]
											: [{ ...r[0], email: val, selected: true }]
									);
								}}
								className="w-48"
							/>
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
							readOnly
							className="mt-1 min-h-[100px] bg-gray-100 dark:bg-zinc-800 cursor-not-allowed"
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
											(q) =>
												q.questionnaire_type_id ===
												selectedType
										)?.questionnaire_type_name
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
									Recipient
								</td>
								<td className="py-2">
									{recipients[0]?.name && recipients[0]?.email
										? `${recipients[0].name} (${recipients[0].email})`
										: "—"}
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

	// Validation for disabling Next button
	const disableNext =
		(step === 0 && !selectedType) ||
		(step === 1 && (!dueDate || new Date(dueDate) < new Date(today))) ||
		(step === 2 &&
			(!recipients[0]?.name?.trim() ||
				!recipients[0]?.email?.trim())
		);

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
						{step === steps.length - 1 ? (
							<Button
								onClick={handleSendQuestionnaire}
								className="w-full sm:w-auto"
								disabled={disableNext || sending}
							>
								<Send className="w-4 h-4 mr-1" />
								{sending ? "Sending..." : "Send questionnaire"}
							</Button>
						) : (
							<Button
								onClick={() =>
									setStep((s) =>
										Math.min(s + 1, steps.length - 1)
									)
								}
								className="w-full sm:w-auto"
								disabled={disableNext}
							>
								Next <ArrowRight className="w-4 h-4 ml-1" />
							</Button>
						)}
					</div>
				</div>
			</div>
		</SidebarLayout>
	);
}