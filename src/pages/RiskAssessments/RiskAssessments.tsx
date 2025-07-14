import PageHeader from "@/components/PageHeader";
import SidebarLayout from "@/layouts/sidebar-layout";
import { ChevronDown, Info } from "lucide-react";
import { useState } from "react";
import RiskAssessmentsTable from "@/components/risk-assessments/RiskAssessmentsTable";
import RiskAssessmentsFilterSidebar from "@/components/risk-assessments/RiskAssessmentsFilterSidebar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CreateAssessmentDialog from "@/components/risk-assessments/CreateAssessmentDialog";

export default function RiskAssessments() {
	const [showDescription, showDescriptionSet] = useState(true);
	const [openFilterSidebar, setOpenFilterSidebar] = useState(false);
	const [openCreateDialog, setOpenCreateDialog] = useState(false);
	return (
		<SidebarLayout
			breadcrumbs={[
				{
					label: "Risk Assessments",
					href: "/risk-assessments",
				},
			]}
		>
			<PageHeader
				title="Risk Assessments"
				info={
					showDescription
						? "Create a risk assessment to get a snapshot of your customer's current risk profile. Combine information from different sources, review evidence, manage and waive risks, and document findings at a point in time for future reference and comparison."
						: ""
				}
				actions={
					<div className="flex gap-4">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button>
									Conduct assessment{" "}
									<ChevronDown className="w-4 h-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem
									className="flex flex-col gap-2 items-start"
									onClick={() => setOpenCreateDialog(true)}
								>
									<div>Classic risk assessment</div>
									<p>
										Assessment based on selected evidence
										and risk profile.
									</p>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
						<button
							className="btn btn-outline"
							onClick={() => showDescriptionSet(!showDescription)}
						>
							<Info className="w-4 h-4" />
						</button>
					</div>
				}
			/>
			<RiskAssessmentsTable
				onOpenFilter={() => setOpenFilterSidebar(true)}
			/>
			<RiskAssessmentsFilterSidebar
				open={openFilterSidebar}
				onOpenChange={setOpenFilterSidebar}
			/>
			<CreateAssessmentDialog
				open={openCreateDialog}
				onOpenChange={setOpenCreateDialog}
			/>
		</SidebarLayout>
	);
}
