import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";
import { Plus, ArrowRight, X } from "lucide-react";
import { documentTypes, users } from "@/lib/DATA";
import { Combobox } from "./ui/combobox";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

interface DocumentRequest {
	id: number;
	type: string;
	priority: string;
}

interface Recipient {
	id: number;
	userId: string;
	role: string;
	remarks: string;
}

const RequestDocumentsSheet = ({
	open,
	onOpenChange,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}) => {
	const [step, setStep] = useState(1);
	const [documentRequests, setDocumentRequests] = useState<DocumentRequest[]>(
		[{ id: 1, type: "", priority: "High" }]
	);
	const [recipients, setRecipients] = useState<Recipient[]>([
		{ id: 1, userId: "", role: "Primary Contact", remarks: "" },
	]);
	const [message, setMessage] = useState(
		"Please provide the requested documents for our security assessment. This will help us complete your risk profile in a timely manner."
	);

	const resetForm = () => {
		setStep(1);
		setDocumentRequests([{ id: 1, type: "", priority: "High" }]);
		setRecipients([
			{ id: 1, userId: "", role: "Primary Contact", remarks: "" },
		]);
		setMessage(
			"Please provide the requested documents for our security assessment. This will help us complete your risk profile in a timely manner."
		);
	};

	const handleAddDocumentType = () => {
		setDocumentRequests([
			...documentRequests,
			{ id: Date.now(), type: "", priority: "High" },
		]);
	};

	const handleRequestChange = (
		id: number,
		field: keyof Omit<DocumentRequest, "id">,
		value: string
	) => {
		setDocumentRequests(
			documentRequests.map((req) =>
				req.id === id ? { ...req, [field]: value } : req
			)
		);
	};

	const handleRemoveRequest = (id: number) => {
		setDocumentRequests(documentRequests.filter((req) => req.id !== id));
	};

	const handleAddRecipient = () => {
		setRecipients([
			...recipients,
			{
				id: Date.now(),
				userId: "",
				role: "Primary Contact",
				remarks: "",
			},
		]);
	};

	const handleRecipientChange = (
		id: number,
		field: keyof Omit<Recipient, "id">,
		value: string
	) => {
		setRecipients(
			recipients.map((rec) => {
				if (rec.id !== id) return rec;

				const updatedRecipient = { ...rec, [field]: value };

				if (field === "userId") {
					const selectedUser = users.find((u) => u.value === value);
					if (selectedUser) {
						updatedRecipient.role = selectedUser.role;
					}
				}
				return updatedRecipient;
			})
		);
	};

	const handleRemoveRecipient = (id: number) => {
		setRecipients(recipients.filter((rec) => rec.id !== id));
	};

	const handleSendRequest = () => {
		console.log("Request Sent:", {
			documents: documentRequests,
			recipients,
			message,
		});
		onOpenChange(false);
		setTimeout(resetForm, 300);
	};

	const steps = [
		"Select documents",
		"Assign recipients",
		"Review message and send",
	];

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent
				side="bottom"
				className="h-screen flex flex-col max-w-5xl mx-auto"
			>
				<SheetHeader className="px-6 pt-6">
					<SheetTitle>Request documents from Adani Group</SheetTitle>
					<SheetDescription>
						Request security documentation from your customer to use
						as evidence for risk assessments.
						<a href="#" className="text-primary ml-2">
							Learn more about additional evidence
						</a>
					</SheetDescription>
				</SheetHeader>

				<div className="flex-grow p-6 overflow-y-auto">
					<div className="flex items-center w-full mb-8">
						{steps.map((s, i) => {
							const stepNumber = i + 1;
							const isCurrent = step === stepNumber;
							const isCompleted = step > stepNumber;

							return (
								<div
									key={s}
									className="flex items-center w-full"
								>
									<div
										className={`flex items-center p-2 rounded-l-md ${
											isCurrent
												? "bg-blue-100 dark:bg-blue-900/50"
												: ""
										} ${
											isCompleted ? "bg-gray-100" : ""
										} transition-colors duration-300`}
									>
										<div
											className={`flex items-center justify-center w-6 h-6 mr-2 text-xs border rounded-full shrink-0 ${
												isCurrent
													? "border-primary text-primary"
													: isCompleted
													? "bg-primary text-white border-primary"
													: "border-gray-400"
											}`}
										>
											{isCompleted ? "✓" : stepNumber}
										</div>
										<span
											className={`font-medium ${
												isCurrent
													? "text-primary"
													: isCompleted
													? "text-gray-800"
													: "text-gray-500"
											}`}
										>
											{s}
										</span>
									</div>

									<div
										className={`w-0 h-0 border-y-[24px] border-y-transparent border-l-[16px] ${
											isCurrent
												? "border-l-blue-100 dark:border-l-blue-900/50"
												: isCompleted
												? "border-l-gray-100"
												: "border-l-transparent"
										} transition-colors duration-300`}
									></div>

									<div
										className={`h-px flex-grow ${
											isCompleted
												? "bg-primary"
												: "bg-gray-200"
										}`}
									></div>

									{i === steps.length - 1 && (
										<div
											className={`w-0 h-0 border-y-[24px] border-y-transparent border-l-[16px] border-l-transparent`}
										></div>
									)}
								</div>
							);
						})}
					</div>

					{step === 1 && (
						<div>
							<h3 className="text-lg font-semibold mb-4">
								Select documents
							</h3>
							<div className="space-y-4">
								{documentRequests.map((request, index) => (
									<div
										key={request.id}
										className="flex items-end gap-4 p-4 border rounded-md"
									>
										<div className="flex-1">
											<Label
												htmlFor={`document-type-${request.id}`}
												className="text-sm font-medium text-muted-foreground mb-2"
											>
												Document type
											</Label>
											<Combobox
												options={documentTypes}
												value={request.type}
												onChange={(value) =>
													handleRequestChange(
														request.id,
														"type",
														value
													)
												}
												placeholder="Select document type"
												searchPlaceholder="Search document types..."
												emptyText="No document type found."
											/>
										</div>
										<div className="w-48">
											<Label
												htmlFor={`priority-${request.id}`}
												className="text-sm font-medium text-muted-foreground mb-2"
											>
												Priority
											</Label>
											<Select
												onValueChange={(value) =>
													handleRequestChange(
														request.id,
														"priority",
														value
													)
												}
												defaultValue={request.priority}
											>
												<SelectTrigger
													id={`priority-${request.id}`}
												>
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="High">
														High
													</SelectItem>
													<SelectItem value="Medium">
														Medium
													</SelectItem>
													<SelectItem value="Low">
														Low
													</SelectItem>
												</SelectContent>
											</Select>
										</div>
										{documentRequests.length > 1 && (
											<Button
												variant="ghost"
												size="icon"
												onClick={() =>
													handleRemoveRequest(
														request.id
													)
												}
											>
												<X className="h-4 w-4" />
											</Button>
										)}
									</div>
								))}
							</div>
							<Button
								variant="outline"
								className="mt-4 border-dashed"
								onClick={handleAddDocumentType}
							>
								<Plus className="mr-2 h-4 w-4" /> Add document
								type
							</Button>
						</div>
					)}
					{step === 2 && (
						<div>
							<h3 className="text-lg font-semibold mb-4">
								Assign recipients
							</h3>
							<div className="space-y-4">
								{recipients.map((recipient) => (
									<div
										key={recipient.id}
										className="flex items-start gap-4 p-4 border rounded-md"
									>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
											<div className="space-y-2">
												<Label
													htmlFor={`recipient-name-${recipient.id}`}
												>
													Name
												</Label>
												<Combobox
													options={users}
													value={recipient.userId}
													onChange={(value) =>
														handleRecipientChange(
															recipient.id,
															"userId",
															value
														)
													}
													placeholder="Select a recipient"
													searchPlaceholder="Search recipients..."
													emptyText="No recipient found."
												/>
											</div>
											<div className="space-y-2">
												<Label
													htmlFor={`recipient-role-${recipient.id}`}
												>
													Role
												</Label>
												<Select
													onValueChange={(value) =>
														handleRecipientChange(
															recipient.id,
															"role",
															value
														)
													}
													defaultValue={
														recipient.role
													}
												>
													<SelectTrigger
														id={`recipient-role-${recipient.id}`}
													>
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="Primary Contact">
															Primary Contact
														</SelectItem>
														<SelectItem value="Legal">
															Legal
														</SelectItem>
														<SelectItem value="Security Officer">
															Security Officer
														</SelectItem>
														<SelectItem value="Technical Contact">
															Technical Contact
														</SelectItem>
													</SelectContent>
												</Select>
											</div>
											<div className="space-y-2 md:col-span-2">
												<Label
													htmlFor={`recipient-remarks-${recipient.id}`}
												>
													Remarks
												</Label>
												<Textarea
													id={`recipient-remarks-${recipient.id}`}
													placeholder="Enter any remarks"
													value={recipient.remarks}
													onChange={(e) =>
														handleRecipientChange(
															recipient.id,
															"remarks",
															e.target.value
														)
													}
												/>
											</div>
										</div>
										<Button
											variant="ghost"
											size="icon"
											onClick={() =>
												handleRemoveRecipient(
													recipient.id
												)
											}
											className="mt-6"
										>
											<X className="h-4 w-4" />
										</Button>
									</div>
								))}
							</div>
							<Button
								variant="outline"
								className="mt-4 border-dashed"
								onClick={handleAddRecipient}
							>
								<Plus className="mr-2 h-4 w-4" /> Add recipient
							</Button>
						</div>
					)}
					{step === 3 && (
						<div>
							<h3 className="text-lg font-semibold mb-4">
								Review message and send
							</h3>
							<div className="space-y-6">
								<Card>
									<CardHeader>
										<CardTitle>
											Selected Documents
										</CardTitle>
									</CardHeader>
									<CardContent>
										<ul className="space-y-3">
											{documentRequests.map(
												(doc, index) => (
													<li
														key={doc.id}
														className="flex items-center"
													>
														<span className="w-6 text-muted-foreground">
															{index + 1}.
														</span>
														<span className="flex-grow">
															{documentTypes.find(
																(d) =>
																	d.value ===
																	doc.type
															)?.label ||
																doc.type}
														</span>
														<span className="text-sm text-muted-foreground">
															{doc.priority}{" "}
															Priority
														</span>
													</li>
												)
											)}
										</ul>
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle>
											Assigned Recipients
										</CardTitle>
									</CardHeader>
									<CardContent>
										<ul className="space-y-4">
											{recipients.map((rec, index) => {
												const user = users.find(
													(u) =>
														u.value === rec.userId
												);
												return (
													<li key={rec.id}>
														<div className="flex items-start gap-4">
															<span className="w-6 text-muted-foreground pt-1">
																{index + 1}.
															</span>
															<div className="flex-grow">
																<div className="flex justify-between items-start">
																	<div>
																		<p className="font-semibold">
																			{user?.label ||
																				"N/A"}
																		</p>
																		<p className="text-sm text-muted-foreground">
																			{
																				rec.role
																			}
																		</p>
																	</div>
																	{rec.remarks && (
																		<p className="text-sm text-muted-foreground mt-1 max-w-xs text-right">
																			{
																				rec.remarks
																			}
																		</p>
																	)}
																</div>
															</div>
														</div>

														{index <
															recipients.length -
																1 && (
															<Separator className="my-4" />
														)}
													</li>
												);
											})}
										</ul>
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle>Message</CardTitle>
									</CardHeader>
									<CardContent>
										<Textarea
											value={message}
											onChange={(e) =>
												setMessage(e.target.value)
											}
											rows={5}
											placeholder="Your message to the recipients..."
										/>
									</CardContent>
								</Card>
							</div>
						</div>
					)}
				</div>

				<SheetFooter className="px-6 pb-6 border-t pt-4">
					<div className="flex w-full justify-between">
						<Button
							variant="outline"
							onClick={() => onOpenChange(false)}
						>
							Cancel
						</Button>
						<div className="flex gap-4">
							{step > 1 && (
								<Button
									variant="outline"
									onClick={() => setStep(step - 1)}
								>
									Back
								</Button>
							)}
							<Button
								onClick={() => {
									if (step < 3) {
										setStep(step + 1);
									} else {
										handleSendRequest();
									}
								}}
							>
								{step === 3 ? "Send Request" : "Next"}
								<ArrowRight className="ml-2 h-4 w-4" />
							</Button>
						</div>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};

export default RequestDocumentsSheet;
