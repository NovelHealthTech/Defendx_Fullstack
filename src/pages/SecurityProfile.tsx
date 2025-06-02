import PageHeader from "@/components/PageHeader";
import SecurityProfileControls from "@/components/security-profile/security-profile-controls";
import SecurityProfileDomainsAndIps from "@/components/security-profile/security-profile-domains-and-ips";
import SecurityProfileEvidence from "@/components/security-profile/security-profile-evidence";
import SecurityProfileSummary from "@/components/security-profile/security-profile-summary";
import SecurityProfileCharts from "@/components/security-profile/SecurityProfileCharts";
import SecurityProfileCategoryGrid from "@/components/security-profile/SecurityProfileCategoryGrid";
import SecurityProfileSummaryCharts from "@/components/security-profile/SecurityProfileSummaryCharts";
import { Button } from "@/components/ui/button";
import SidebarLayout from "@/layouts/sidebar-layout";
import { InfoIcon } from "lucide-react";

export default function SecurityProfile() {
	return (
		<SidebarLayout
			breadcrumbs={[
				{
					label: "Security Profile",
					href: "/security-profile",
				},
			]}
		>
			<PageHeader
				title="Security Profile"
				info="The Security Profile uses the power of generative AI to build comprehensive view of your security posture through document analysis and automated scanning of domains and IPs. Upload evidence like SOC 2 reports or past Questionnaires to uncover control gaps in real-time, then generate a point-in-time risk assessment, or manage and remediate any risks that are found."
				actions={
					<>
						<Button>Action</Button>
						<Button variant="outline" size="icon">
							<InfoIcon className="w-4 h-4" />
						</Button>
					</>
				}
			/>

			{/* Summary Charts Section */}
			<SecurityProfileSummaryCharts />

			<SecurityProfileCharts />

			<SecurityProfileCategoryGrid />

			<div className="grid auto-rows-min gap-4 grid-cols-12">
				<div className="col-span-12 md:col-span-5 lg:col-span-3 space-y-4">
					<SecurityProfileSummary />
					<SecurityProfileEvidence />
					<SecurityProfileDomainsAndIps />
				</div>
				<div className="col-span-12 md:col-span-7 lg:col-span-9">
					<SecurityProfileControls />
				</div>
			</div>
		</SidebarLayout>
	);
}
