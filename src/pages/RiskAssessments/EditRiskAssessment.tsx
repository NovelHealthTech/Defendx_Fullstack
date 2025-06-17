import SidebarLayout from "@/layouts/sidebar-layout";
import RiskAssessmentForm from "../../components/risk-assessments/RiskAssessmentForm";
import PageHeader from "@/components/PageHeader";
import React from "react";
import { Info } from "lucide-react";

export default function EditRiskAssessment() {
	const [showDescription, showDescriptionSet] = React.useState(true);
	return (
		<SidebarLayout
			breadcrumbs={[
				{ label: "Risk Assessments", href: "/risk-assessments" },
				{ label: "Edit", href: "/risk-assessments/edit" },
			]}
		>
			<PageHeader
				title="Risk Assessment info"
				info={
					showDescription
						? "Review your assessment carefully before publishing it. Completing this assessment will finalize this version, capturing the set of risks at this point in time. It will also become visible to all users within your account"
						: ""
				}
				actions={
					<div className="flex gap-4">
						<button
							className="btn btn-outline"
							onClick={() => showDescriptionSet(!showDescription)}
						>
							<Info className="w-4 h-4" />
						</button>
					</div>
				}
			/>
			<RiskAssessmentForm mode="edit" />
		</SidebarLayout>
	);
}
