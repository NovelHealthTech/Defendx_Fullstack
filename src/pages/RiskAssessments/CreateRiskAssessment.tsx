import SidebarLayout from "@/layouts/sidebar-layout";
import RiskAssessmentForm from "../../components/risk-assessments/RiskAssessmentForm";

export default function CreateRiskAssessment() {
	return (
		<SidebarLayout
			breadcrumbs={[
				{ label: "Risk Assessments", href: "/risk-assessments" },
				{ label: "Create", href: "/risk-assessments/create" },
			]}
		>
			<RiskAssessmentForm mode="create" />
		</SidebarLayout>
	);
}
