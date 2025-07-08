import React, { useState } from "react";
import SidebarLayout from "@/layouts/sidebar-layout";
import { Button } from "@/components/ui/button";
import {
	Download,
	ExternalLink,
	Globe,
	Info,
	RotateCw,
	Check,
} from "lucide-react";

import PageHeader from "@/components/PageHeader";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { CardTitle } from "@/components/ui/card";
import { Link } from "react-router";
import ExportDialog from "@/components/ExportDialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

export default function ModifiedRisks() {
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
	const [activeTab, setActiveTab] = useState("adjusted-risks");
	const [showInfo, setShowInfo] = useState(true);
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
					showInfo={showInfo}
					setShowInfo={setShowInfo}
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

			<Tabs
				defaultValue="adjusted-risks"
				className="w-full"
				onValueChange={setActiveTab}
			>
				<TabsList className="mb-2 h-auto p-2 w-full">
					<TabsTrigger
						value="adjusted-risks"
						className="flex-col h-auto py-1"
					>
						Adjusted Risks
					</TabsTrigger>
					<TabsTrigger
						value="risk-waivers"
						className="flex-col h-auto py-1"
					>
						Risk Waivers
					</TabsTrigger>
				</TabsList>
				<TabsContent value="adjusted-risks">
					<PageHeader
						className="bg-slate-100 p-2 border-b dark:bg-slate-800"
						title={<CardTitle>Adjusted Risks</CardTitle>}
						actions={null}
					/>
					<div className="flex flex-col h-[60vh] w-full justify-center items-center relative">
						<div className="flex flex-col items-center justify-center text-center max-w-md mx-auto p-8 rounded-lg border shadow-sm">
							<div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-50 mb-4">
								{/* Lucide icon: FileText */}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="w-8 h-8 text-blue-500"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z"
									/>
								</svg>
							</div>
							<h2 className="text-lg font-semibold mb-2">
								Adjusted Risks
							</h2>
							<p className="text-muted-foreground mb-6 text-sm">
								Creating a risk adjustment will modify how the
								risk from {customer.name} impacts their score
								and risk profile. At the moment only risks found
								in security questionnaires and evidence can be
								adjusted. Send a questionnaire to get started.
							</p>
							<Button
								variant="outline"
								className="mb-2 w-full max-w-xs"
							>
								Send questionnaire
							</Button>
						</div>
					</div>
				</TabsContent>
				<TabsContent value="risk-waivers">
					<PageHeader
						className="bg-slate-100 p-2 border-b dark:bg-slate-800"
						title={<CardTitle>Risk Waivers</CardTitle>}
						actions={
							<Button
								className="bg-blue-600 text-white hover:bg-blue-700"
								size="sm"
								asChild
							>
								<Link to="/modified-risks/create-risk-waiver">
									+ Create risk waiver
								</Link>
							</Button>
						}
					/>
					<div className="flex flex-col h-[60vh] w-full justify-center items-center relative">
						<div className="flex flex-col items-center justify-center text-center max-w-md mx-auto p-8 rounded-lg border shadow-sm">
							<div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-50 mb-4">
								{/* Lucide icon: FileText */}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="w-8 h-8 text-blue-500"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z"
									/>
								</svg>
							</div>
							<h2 className="text-lg font-semibold mb-2">
								Risk Waivers
							</h2>
							<p className="text-muted-foreground mb-6 text-sm">
								Creating a risk waiver will remove the risk from{" "}
								{customer.name}'s risk profile. We recommend
								creating a risk waiver only if you are accepting
								a risk or have compensating control information.
							</p>
							<Button
								variant="outline"
								className="mb-4 w-full max-w-xs"
							>
								Create risk waiver
							</Button>
							<a
								href="#"
								className="text-blue-600 text-sm flex items-center justify-center gap-1 hover:underline"
								tabIndex={0}
								aria-label="View support article"
							>
								View support article{" "}
								<ExternalLink className="w-4 h-4 inline" />
							</a>
						</div>
					</div>
				</TabsContent>
			</Tabs>
		</SidebarLayout>
	);
}

// Reusable Section Components
function CustomerHeader({
	onOpenExportDialog,
	showInfo,
	setShowInfo,
}: {
	onOpenExportDialog: () => void;
	showInfo: boolean;
	setShowInfo: (showInfo: boolean) => void;
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
			<PageHeader
				title="Modified Risks"
				info={
					showInfo
						? "Waive risks identified through automated scanning, security questionnaires, and additional evidence to remove them from the customer's risk profile. Or, adjust the severity of risks raised in security questionnaires and evidence. Risk waivers and severity adjustments will only impact the risk severity and vendor score shown to your organization."
						: null
				}
				actions={
					<>
						<Button variant="outline" onClick={onOpenExportDialog}>
							Export <Download className="w-4 h-4" />
						</Button>
						<Button
							variant="outline"
							onClick={() => setShowInfo(!showInfo)}
						>
							<Info className="w-4 h-4" />
						</Button>
					</>
				}
			/>
			<p className="text-sm text-muted-foreground/80 flex items-center gap-1">
				View Support Articles <ExternalLink className="w-4 h-4" />
			</p>

			<Separator className="my-4" />
		</>
	);
}

// Tabs
