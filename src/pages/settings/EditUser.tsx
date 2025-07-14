import React, { useState } from "react";
import SidebarLayout from "@/layouts/sidebar-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link } from "react-router";

const permissionOptions = [
	{ value: "admin", label: "Admin" },
	{ value: "read-only", label: "Read only" },
	{ value: "standard", label: "Standard" },
	{ value: "trust-exchange-read-only", label: "Trust Exchange Read only" },
	{ value: "trust-exchange-standard", label: "Trust Exchange Standard" },
	{ value: "custom", label: "Custom" },
];

const mockUser = {
	email: "ankit.sharma@zoominsurancebrokers.com",
	role: "trust-exchange-read-only",
	isAdmin: false,
};

const EditUser: React.FC = () => {
	// Account
	const [role, setRole] = useState(mockUser.role);
	const [isAdmin, setIsAdmin] = useState(mockUser.isAdmin);
	// Risks
	const [breachRisk, setBreachRisk] = useState(false);
	const [vendorRisk, setVendorRisk] = useState(false);
	// Trust Exchange
	const [trustPage, setTrustPage] = useState({
		view: "enabled",
		invite: "disabled",
		update: "disabled",
	});
	const [contentLibrary, setContentLibrary] = useState("read-only");
	const [questionnaireImport, setQuestionnaireImport] = useState("read-only");
	const [questionnaires, setQuestionnaires] = useState("disabled");

	return (
		<SidebarLayout
			breadcrumbs={[
				{ label: "Settings", href: "/settings" },
				{ label: "Edit User", href: "#" },
			]}
		>
			<form className="space-y-8 pb-16">
				<AccountSection
					email={mockUser.email}
					role={role}
					setRole={setRole}
					isAdmin={isAdmin}
					setIsAdmin={setIsAdmin}
				/>
				<RiskSection
					label="Breach Risk"
					checked={breachRisk}
					onCheckedChange={setBreachRisk}
				/>
				<RiskSection
					label="Vendor Risk"
					checked={vendorRisk}
					onCheckedChange={setVendorRisk}
				/>
				<TrustExchangeSection
					trustPage={trustPage}
					setTrustPage={setTrustPage}
					contentLibrary={contentLibrary}
					setContentLibrary={setContentLibrary}
					questionnaireImport={questionnaireImport}
					setQuestionnaireImport={setQuestionnaireImport}
					questionnaires={questionnaires}
					setQuestionnaires={setQuestionnaires}
				/>
				<div className="flex items-center justify-between pt-4">
					<Link
						to="/settings/user"
						className="text-muted-foreground hover:underline text-sm"
					>
						← Go back
					</Link>
					<Button type="submit" className="px-8">
						Apply changes
					</Button>
				</div>
			</form>
		</SidebarLayout>
	);
};

function AccountSection({ email, role, setRole, isAdmin, setIsAdmin }: any) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Account</CardTitle>
			</CardHeader>
			<CardContent className="space-y-8">
				<div>
					<div className="mb-2 text-muted-foreground font-medium">
						Editing 1 user
					</div>
					<Badge className="bg-blue-50 text-blue-700 px-3 py-1 text-base font-medium rounded-full">
						{email}
					</Badge>
				</div>
				<hr />
				<div className="flex flex-col md:flex-row md:items-center md:gap-6">
					<div className="mb-2 md:mb-0 font-medium">
						Assign role and permissions
					</div>
					<div className="w-80 max-w-full">
						<Combobox
							options={permissionOptions}
							value={role}
							onChange={setRole}
							placeholder="Select permission..."
							searchPlaceholder="Search permissions..."
						/>
					</div>
				</div>
				<hr />
				<div>
					<div className="font-medium mb-2">Admin features</div>
					<div className="flex items-center gap-2 mb-1">
						<Checkbox
							id="admin-account"
							checked={isAdmin}
							onCheckedChange={(checked) =>
								setIsAdmin(checked === true)
							}
						/>
						<label
							htmlFor="admin-account"
							className="text-base font-medium select-none cursor-pointer"
						>
							Can administer account
						</label>
					</div>
					<div className="text-muted-foreground text-sm">
						Admin users can manage users and administer your UpGuard
						account
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

function RiskSection({ label, checked, onCheckedChange }: any) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{label}</CardTitle>
			</CardHeader>
			<CardContent>
				<Checkbox
					id={label}
					checked={checked}
					onCheckedChange={onCheckedChange}
				/>
				<label
					htmlFor={label}
					className="ml-2 text-base font-medium select-none cursor-pointer"
				>
					Enable {label}
				</label>
			</CardContent>
		</Card>
	);
}

function TrustExchangeSection({
	trustPage,
	setTrustPage,
	contentLibrary,
	setContentLibrary,
	questionnaireImport,
	setQuestionnaireImport,
	questionnaires,
	setQuestionnaires,
}: any) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Trust Exchange</CardTitle>
			</CardHeader>
			<CardContent className="space-y-8">
				<TrustPagePermissions
					trustPage={trustPage}
					setTrustPage={setTrustPage}
				/>
				<ContentLibraryPermissions
					value={contentLibrary}
					setValue={setContentLibrary}
				/>
				<QuestionnaireImportExportPermissions
					value={questionnaireImport}
					setValue={setQuestionnaireImport}
				/>
				<QuestionnairesPermissions
					value={questionnaires}
					setValue={setQuestionnaires}
				/>
			</CardContent>
		</Card>
	);
}

function TrustPagePermissions({ trustPage, setTrustPage }: any) {
	return (
		<div>
			<div className="font-medium mb-2">Trust Page</div>
			<div className="overflow-x-auto">
				<table className="min-w-full text-sm mb-4" border={1}>
					<thead>
						<tr>
							<th className="w-1/2"></th>
							<th className="font-medium">Enabled</th>
							<th className="font-medium">Disabled</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="py-2">
								Can view this organization's Trust Page
							</td>
							<RadioGroup
								asChild
								value={trustPage.view}
								onValueChange={(v) =>
									setTrustPage((p: any) => ({
										...p,
										view: v,
									}))
								}
								className="contents"
							>
								<>
									<td className="text-center">
										<RadioGroupItem
											value="enabled"
											id="view-enabled"
											aria-label="Enabled"
										/>
									</td>
									<td className="text-center">
										<RadioGroupItem
											value="disabled"
											id="view-disabled"
											aria-label="Disabled"
										/>
									</td>
								</>
							</RadioGroup>
						</tr>
						<tr>
							<td className="py-2">
								Can invite and grant access to the Trust Page
							</td>
							<RadioGroup
								asChild
								value={trustPage.invite}
								onValueChange={(v) =>
									setTrustPage((p: any) => ({
										...p,
										invite: v,
									}))
								}
								className="contents"
							>
								<>
									<td className="text-center">
										<RadioGroupItem
											value="enabled"
											id="invite-enabled"
											aria-label="Enabled"
										/>
									</td>
									<td className="text-center">
										<RadioGroupItem
											value="disabled"
											id="invite-disabled"
											aria-label="Disabled"
										/>
									</td>
								</>
							</RadioGroup>
						</tr>
						<tr>
							<td className="py-2">
								Can update shared questionnaires and documents,
								and publish the Trust Page
							</td>
							<RadioGroup
								asChild
								value={trustPage.update}
								onValueChange={(v) =>
									setTrustPage((p: any) => ({
										...p,
										update: v,
									}))
								}
								className="contents"
							>
								<>
									<td className="text-center">
										<RadioGroupItem
											value="enabled"
											id="update-enabled"
											aria-label="Enabled"
										/>
									</td>
									<td className="text-center">
										<RadioGroupItem
											value="disabled"
											id="update-disabled"
											aria-label="Disabled"
										/>
									</td>
								</>
							</RadioGroup>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}

function ContentLibraryPermissions({ value, setValue }: any) {
	return (
		<div>
			<div className="overflow-x-auto">
				<table className="min-w-full text-sm border mt-2">
					<thead>
						<tr className="bg-muted text-muted-foreground">
							<th className="font-bold px-2 py-1 text-left">
								Content Library
							</th>
							<th className="font-medium px-2 py-1 text-center">
								<RadioGroup
									value={value}
									onValueChange={setValue}
									className="flex flex-col items-center"
								>
									<RadioGroupItem
										value="full"
										id="content-full"
										aria-label="Full access"
									/>
									<span className="text-xs mt-1">
										Full access
									</span>
								</RadioGroup>
							</th>
							<th className="font-medium px-2 py-1 text-center">
								<RadioGroup
									value={value}
									onValueChange={setValue}
									className="flex flex-col items-center"
								>
									<RadioGroupItem
										value="read-only"
										id="content-read"
										aria-label="Read only"
									/>
									<span className="text-xs mt-1">
										Read only
									</span>
								</RadioGroup>
							</th>
							<th className="font-medium px-2 py-1 text-center">
								<RadioGroup
									value={value}
									onValueChange={setValue}
									className="flex flex-col items-center"
								>
									<RadioGroupItem
										value="none"
										id="content-none"
										aria-label="No access"
									/>
									<span className="text-xs mt-1">
										No access
									</span>
								</RadioGroup>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="px-2 py-1">View Content Library</td>
							<td className="text-center">✓</td>
							<td className="text-center">✓</td>
							<td className="text-center">×</td>
						</tr>
						<tr>
							<td className="px-2 py-1">
								Use Content Library with questionnaires
							</td>
							<td className="text-center">✓</td>
							<td className="text-center">✓</td>
							<td className="text-center">×</td>
						</tr>
						<tr>
							<td className="px-2 py-1">
								Use Content Library with AI Autofill
							</td>
							<td className="text-center">✓</td>
							<td className="text-center">×</td>
							<td className="text-center">×</td>
						</tr>
						<tr>
							<td className="px-2 py-1">
								Add content or edit Content Library
							</td>
							<td className="text-center">✓</td>
							<td className="text-center">×</td>
							<td className="text-center">×</td>
						</tr>
						<tr>
							<td className="px-2 py-1">
								View full history of document usage
							</td>
							<td className="text-center">✓</td>
							<td className="text-center">×</td>
							<td className="text-center">×</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}

function QuestionnaireImportExportPermissions({ value, setValue }: any) {
	return (
		<div>
			<div className="font-medium mb-2">Questionnaire Import/Export</div>
			<div className="overflow-x-auto">
				<table className="min-w-full text-sm border mt-2">
					<thead>
						<tr className="bg-muted text-muted-foreground">
							<th className="font-bold px-2 py-1 text-left">
								Questionnaire Import/Export
							</th>
							<th className="font-medium px-2 py-1 text-center">
								<RadioGroup
									value={value}
									onValueChange={setValue}
									className="flex flex-col items-center"
								>
									<RadioGroupItem
										value="full"
										id="import-full"
										aria-label="Full access"
									/>
									<span className="text-xs mt-1">
										Full access
									</span>
								</RadioGroup>
							</th>
							<th className="font-medium px-2 py-1 text-center">
								<RadioGroup
									value={value}
									onValueChange={setValue}
									className="flex flex-col items-center"
								>
									<RadioGroupItem
										value="read-only"
										id="import-read"
										aria-label="Read only"
									/>
									<span className="text-xs mt-1">
										Read only
									</span>
								</RadioGroup>
							</th>
							<th className="font-medium px-2 py-1 text-center">
								<RadioGroup
									value={value}
									onValueChange={setValue}
									className="flex flex-col items-center"
								>
									<RadioGroupItem
										value="none"
										id="import-none"
										aria-label="No access"
									/>
									<span className="text-xs mt-1">
										No access
									</span>
								</RadioGroup>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="px-2 py-1">
								Use read-only to prevent users from uploading
								and answering imported questionnaires.
							</td>
							<td className="text-center"></td>
							<td className="text-center"></td>
							<td className="text-center"></td>
						</tr>
						<tr>
							<td className="px-2 py-1">
								View imported questionnaires
							</td>
							<td className="text-center">✓</td>
							<td className="text-center">✓</td>
							<td className="text-center">×</td>
						</tr>
						<tr>
							<td className="px-2 py-1">
								Import questionnaires from Excel files
							</td>
							<td className="text-center">✓</td>
							<td className="text-center">×</td>
							<td className="text-center">×</td>
						</tr>
						<tr>
							<td className="px-2 py-1">
								Answer imported questionnaires
							</td>
							<td className="text-center">✓</td>
							<td className="text-center">×</td>
							<td className="text-center">×</td>
						</tr>
						<tr>
							<td className="px-2 py-1">
								Can update shared questionnaires and documents,
								and publish the Trust Page
							</td>
							<td className="text-center">✓</td>
							<td className="text-center">×</td>
							<td className="text-center">×</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}

function QuestionnairesPermissions({ value, setValue }: any) {
	return (
		<div>
			<div className="font-medium mb-2">Questionnaires</div>
			<div className="overflow-x-auto">
				<table className="min-w-full text-sm mb-4" border={1}>
					<thead>
						<tr>
							<th className="w-1/2"></th>
							<th className="font-medium">Enabled</th>
							<th className="font-medium">Disabled</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="py-2">
								Can share questionnaire answers with other users
							</td>
							<RadioGroup
								asChild
								value={value}
								onValueChange={setValue}
								className="contents"
							>
								<>
									<td className="text-center">
										<RadioGroupItem
											value="enabled"
											id="q-enabled"
											aria-label="Enabled"
										/>
									</td>
									<td className="text-center">
										<RadioGroupItem
											value="disabled"
											id="q-disabled"
											aria-label="Disabled"
										/>
									</td>
								</>
							</RadioGroup>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default EditUser;
