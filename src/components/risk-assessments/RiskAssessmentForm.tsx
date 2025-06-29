import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Info, Pencil, Eye } from "lucide-react";
import Editor from "react-simple-wysiwyg";
import {
	Table,
	TableHeader,
	TableBody,
	TableHead,
	TableRow,
	TableCell,
} from "@/components/ui/table";

function EditorSection({
	label,
	value,
	onChange,
	include,
	onIncludeChange,
	placeholder,
	darkMode,
}: {
	label: string;
	value: string;
	onChange: (e: any) => void;
	include: boolean;
	onIncludeChange: (checked: boolean) => void;
	placeholder: string;
	darkMode: boolean;
}) {
	const [editMode, setEditMode] = useState(false);
	return (
		<Card className="w-full">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>{label}</CardTitle>
				<div className="flex items-center gap-2">
					<span className="text-xs">Include section</span>
					<Switch
						checked={include}
						onCheckedChange={onIncludeChange}
					/>
					<Button
						variant="outline"
						size="icon"
						onClick={() => setEditMode((v) => !v)}
						className="ml-2"
						aria-label={editMode ? "Preview" : "Edit"}
					>
						{editMode ? (
							<Eye className="w-4 h-4" />
						) : (
							<Pencil className="w-4 h-4" />
						)}
					</Button>
				</div>
			</CardHeader>
			{include && (
				<CardContent>
					{editMode ? (
						<Editor
							value={value}
							onChange={onChange}
							placeholder={placeholder}
							containerProps={{
								style: {
									background: darkMode ? "#18181b" : "#fff",
									color: darkMode ? "#fff" : "#18181b",
									border: "1px solid #e5e7eb",
									borderRadius: 8,
									minHeight: 120,
								},
								className: darkMode
									? "rsw-editor dark"
									: "rsw-editor",
							}}
						/>
					) : (
						<div
							className={
								"prose max-w-none min-h-[120px] " +
								(darkMode
									? "prose-invert text-white"
									: "text-black")
							}
							dangerouslySetInnerHTML={{
								__html:
									value ||
									`<span class='text-muted-foreground'>${placeholder}</span>`,
							}}
						/>
					)}
				</CardContent>
			)}
		</Card>
	);
}

export default function RiskAssessmentForm({
	mode,
}: {
	mode: "create" | "edit";
}) {
	// Section include toggles
	const [includeExecutiveSummary, setIncludeExecutiveSummary] =
		useState(true);
	const [includeProjectBackground, setIncludeProjectBackground] =
		useState(true);
	const [includeAssessmentSummary, setIncludeAssessmentSummary] =
		useState(true);
	const [includeSecurityAreas, setIncludeSecurityAreas] = useState(true);
	const [includeConclusion, setIncludeConclusion] = useState(true);

	// WYSIWYG editor state
	const [executiveSummary, setExecutiveSummary] = useState(
		`<p>The risk assessment report on Adani Group's cybersecurity measures highlights several areas for improvement and documentation needs across various domains, including security policies, asset management, infrastructure, data protection, application security, risk management, and operational resilience. The report emphasizes the necessity of obtaining comprehensive documentation to fill information gaps and ensure a robust cybersecurity posture.</p>`
	);
	const [projectBackground, setProjectBackground] = useState(
		`<p>This assessment was conducted as part of the annual review cycle for Adani Group, focusing on their digital infrastructure, third-party risk, and compliance with industry standards. The project aims to identify vulnerabilities and recommend actionable steps for risk mitigation.</p>`
	);
	const [assessmentSummary, setAssessmentSummary] = useState(
		`<ul><li>Overall risk score: <b>794/1000</b></li><li>Risk level: <b>Medium</b></li><li>Key risks identified in open service ports, SSL certificate management, and patch management policies.</li><li>Recommendations include enhanced documentation, regular vulnerability assessments, and improved incident response planning.</li></ul>`
	);
	const [conclusion, setConclusion] = useState(
		`<p>In conclusion, while Adani Group demonstrates a proactive approach to cybersecurity, there are critical areas that require attention. Addressing the identified gaps and implementing the recommended controls will significantly enhance the organization's security posture and resilience against emerging threats.</p>`
	);

	// Dummy author info for now
	const author = { name: "JD", email: "john.doe@example.com" };
	const status = "In progress";
	const score = 794;
	const riskLevel = "Medium";
	const riskPercent = 26;

	// Theme detection
	const darkMode =
		typeof window !== "undefined" &&
		document.documentElement.classList.contains("dark");

	// Dummy security areas
	const [securityAreas, setSecurityAreas] = useState([
		{
			title: "Asset Management",
			value: `<p>Asset inventory is maintained, but some endpoints lack up-to-date records. Recommend implementing automated asset discovery tools and regular audits.</p>`,
			rating: "average",
			status: "in-progress",
			include: true,
		},
		{
			title: "Data Protection",
			value: `<p>Data encryption is enforced for sensitive information. However, data retention and disposal policies need to be updated and communicated to all staff.</p>`,
			rating: "good",
			status: "open",
			include: true,
		},
		{
			title: "Risk Management",
			value: `<p>Risk assessments are performed annually. Recommend increasing frequency and integrating third-party risk evaluations into the process.</p>`,
			rating: "average",
			status: "open",
			include: true,
		},
		{
			title: "Incident Response",
			value: `<p>Incident response plan exists but lacks regular testing and staff training. Recommend conducting tabletop exercises and updating contact lists.</p>`,
			rating: "poor",
			status: "in-progress",
			include: true,
		},
		{
			title: "Third Party Risk",
			value: `<p>Third-party vendors are reviewed, but documentation is incomplete. Recommend formalizing onboarding and offboarding procedures for vendors.</p>`,
			rating: "average",
			status: "open",
			include: true,
		},
		{
			title: "Overall & Next Steps",
			value: `<p>Continue to monitor risk landscape, address open findings, and schedule a follow-up assessment in six months.</p>`,
			rating: "good",
			status: "closed",
			include: true,
		},
	]);

	// Dummy manage risks table data
	const manageRisks = [
		{
			id: 1,
			name: "HTTP server version is visible",
			severity: "Medium",
			status: "Open",
			owner: "John Doe",
		},
		{
			id: 2,
			name: "SSL certificate is expired",
			severity: "High",
			status: "In Progress",
			owner: "Jane Smith",
		},
		{
			id: 3,
			name: "Unpatched software",
			severity: "Critical",
			status: "Open",
			owner: "Alice",
		},
	];

	return (
		<div className="w-full px-0 py-8 flex flex-col gap-6">
			{/* Status & Author */}
			<Card className="w-full">
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle>Status & Author</CardTitle>
					<div className="flex items-center gap-2">
						<span className="text-xs">Include section</span>
						<Switch checked disabled />
					</div>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<div className="flex gap-4 items-center">
						<span className="text-sm font-medium">Status:</span>
						<span className="rounded px-2 py-1 bg-yellow-100 text-yellow-800 text-xs">
							{status}
						</span>
						<span className="text-sm font-medium ml-6">
							Author:
						</span>
						<Avatar>
							<AvatarFallback>{author.name}</AvatarFallback>
						</Avatar>
						<span className="ml-2 text-xs text-muted-foreground">
							{author.email}
						</span>
					</div>
				</CardContent>
			</Card>

			{/* Executive Summary */}
			<EditorSection
				label="Executive Summary"
				value={executiveSummary}
				onChange={(e) => setExecutiveSummary(e.target.value)}
				include={includeExecutiveSummary}
				onIncludeChange={setIncludeExecutiveSummary}
				placeholder="Enter executive summary..."
				darkMode={darkMode}
			/>

			{/* Project Background */}
			<EditorSection
				label="Project Background"
				value={projectBackground}
				onChange={(e) => setProjectBackground(e.target.value)}
				include={includeProjectBackground}
				onIncludeChange={setIncludeProjectBackground}
				placeholder="Enter project background..."
				darkMode={darkMode}
			/>

			{/* Assessment Summary */}
			<Card className="w-full">
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle>Assessment Summary</CardTitle>
					<div className="flex items-center gap-2">
						<span className="text-xs">Include section</span>
						<Switch
							checked={includeAssessmentSummary}
							onCheckedChange={setIncludeAssessmentSummary}
						/>
					</div>
				</CardHeader>
				{includeAssessmentSummary && (
					<CardContent>
						<div className="flex flex-col md:flex-row gap-6">
							<div className="flex-1 flex flex-col gap-2">
								<span className="text-4xl font-bold">
									{score}
								</span>
								<span className="text-xs text-muted-foreground">
									(of 1000)
								</span>
								<Progress value={score / 10} />
								<span className="text-sm mt-2">
									Risk Level: <b>{riskLevel}</b>
								</span>
							</div>
							<div className="flex-1 flex flex-col gap-2">
								<span className="text-sm">Risk Percentage</span>
								<span className="text-2xl font-bold">
									{riskPercent}%
								</span>
								<Progress value={riskPercent} />
							</div>
						</div>
						<EditorSection
							label="Assessment Summary"
							value={assessmentSummary}
							onChange={(e) =>
								setAssessmentSummary(e.target.value)
							}
							include={true}
							onIncludeChange={() => {}}
							placeholder="Enter assessment summary..."
							darkMode={darkMode}
						/>
					</CardContent>
				)}
			</Card>

			{/* Security Areas of Assessment */}
			<Card className="w-full">
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle>Security Areas of Assessment</CardTitle>
					<div className="flex items-center gap-2">
						<span className="text-xs">Include section</span>
						<Switch
							checked={includeSecurityAreas}
							onCheckedChange={setIncludeSecurityAreas}
						/>
					</div>
				</CardHeader>
				{includeSecurityAreas && (
					<CardContent>
						<div className="flex flex-col gap-6">
							{securityAreas.map((area, idx) => (
								<div
									key={area.title}
									className="flex flex-col gap-2"
								>
									<EditorSection
										label={area.title}
										value={area.value}
										onChange={(e) => {
											setSecurityAreas((prev) =>
												prev.map((a, i) =>
													i === idx
														? {
																...a,
																value: e.target
																	.value,
														  }
														: a
												)
											);
										}}
										include={area.include}
										onIncludeChange={(checked) => {
											setSecurityAreas((prev) =>
												prev.map((a, i) =>
													i === idx
														? {
																...a,
																include:
																	checked,
														  }
														: a
												)
											);
										}}
										placeholder={`Describe ${area.title}...`}
										darkMode={darkMode}
									/>
									{area.include && (
										<div className="flex gap-4 mt-2 px-4">
											<Select
												value={area.rating}
												onValueChange={(val) =>
													setSecurityAreas((prev) =>
														prev.map((a, i) =>
															i === idx
																? {
																		...a,
																		rating: val,
																  }
																: a
														)
													)
												}
											>
												<SelectTrigger className="w-32">
													<SelectValue placeholder="Rating" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="good">
														Good
													</SelectItem>
													<SelectItem value="average">
														Average
													</SelectItem>
													<SelectItem value="poor">
														Poor
													</SelectItem>
												</SelectContent>
											</Select>
											<Select
												value={area.status}
												onValueChange={(val) =>
													setSecurityAreas((prev) =>
														prev.map((a, i) =>
															i === idx
																? {
																		...a,
																		status: val,
																  }
																: a
														)
													)
												}
											>
												<SelectTrigger className="w-32">
													<SelectValue placeholder="Status" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="open">
														Open
													</SelectItem>
													<SelectItem value="in-progress">
														In Progress
													</SelectItem>
													<SelectItem value="closed">
														Closed
													</SelectItem>
												</SelectContent>
											</Select>
										</div>
									)}
								</div>
							))}
						</div>
					</CardContent>
				)}
			</Card>

			{/* Manage Risks Table */}
			<Card className="w-full">
				<CardHeader>
					<CardTitle>Manage Risks</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Risk Name</TableHead>
								<TableHead>Severity</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Owner</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{manageRisks.map((risk) => (
								<TableRow key={risk.id}>
									<TableCell>{risk.name}</TableCell>
									<TableCell>{risk.severity}</TableCell>
									<TableCell>{risk.status}</TableCell>
									<TableCell>{risk.owner}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			{/* Conclusion */}
			<EditorSection
				label="Conclusion"
				value={conclusion}
				onChange={(e) => setConclusion(e.target.value)}
				include={includeConclusion}
				onIncludeChange={setIncludeConclusion}
				placeholder="Conclusion..."
				darkMode={darkMode}
			/>

			{/* Actions */}
			<div className="flex gap-4 mt-4">
				<Button variant="default">
					{mode === "edit" ? "Save Changes" : "Create Assessment"}
				</Button>
				<Button variant="outline">Save as Draft</Button>
			</div>
		</div>
	);
}
