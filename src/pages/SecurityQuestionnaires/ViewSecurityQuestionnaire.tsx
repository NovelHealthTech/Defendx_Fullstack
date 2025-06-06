import SidebarLayout from "@/layouts/sidebar-layout";
import PageHeader from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	CalendarDays,
	UserCheck,
	AlertTriangle,
	PercentCircle,
	FileDown,
	Eye,
	ShieldCheck,
	Users,
	Clock,
	CheckCircle,
	Mail,
} from "lucide-react";
import { useNavigate } from "react-router";

export default function ViewSecurityQuestionnaire() {
	const navigate = useNavigate();
	return (
		<SidebarLayout
			breadcrumbs={[
				{ label: "Customer Portfolio", href: "/customer-portfolio" },
				{
					label: "ABC Insurance",
					href: "/customer-portfolio/abc-insurance",
				},
				{
					label: "Questionnaires",
					href: "/customer-portfolio/abc-insurance/questionnaires",
				},
				{
					label: "CIS Critical Security Controls v8.1 - Implementation Group 3",
					href: "",
				},
			]}
		>
			<PageHeader
				title={
					<span className="flex items-center gap-2">
						<ShieldCheck className="w-5 h-5" />
						CIS Critical Security Controls v8.1 - Implementation
						Group 3
					</span>
				}
				info={null}
				actions={
					<div className="flex gap-2 items-center">
						{/* <Button variant="outline">
							<FileDown className="w-4 h-4 mr-1" />
							Export
						</Button> */}
						<Button
							variant="outline"
							onClick={() =>
								navigate(
									"/security-questionnaires/customer-view/1"
								)
							}
						>
							<Eye className="w-4 h-4 mr-1" />
							View answers
						</Button>
					</div>
				}
			/>
			<div className="flex flex-col md:flex-row gap-6 mt-4">
				{/* Details Card */}
				<div className="flex-1 min-w-0">
					<div className="bg-card border rounded-xl p-6 mb-6">
						<div className="flex flex-wrap gap-4 mb-4">
							<div className="flex flex-col gap-1 min-w-[180px]">
								<span className="text-xs text-muted-foreground">
									Name
								</span>
								<span className="font-medium">
									CIS Critical Security Controls v8.1 -
									Implementation Group 3
								</span>
							</div>
							<div className="flex flex-col gap-1 min-w-[120px]">
								<span className="text-xs text-muted-foreground">
									Status
								</span>
								<Badge
									variant="outline"
									className="text-xs border-blue-500 text-blue-600"
								>
									Awaiting Review
								</Badge>
							</div>
							<div className="flex flex-col gap-1 min-w-[80px]">
								<span className="text-xs text-muted-foreground flex items-center">
									<UserCheck className="w-4 h-4 mr-1" />
									Score
								</span>
								<span className="font-bold text-red-500">
									F
								</span>
							</div>
							<div className="flex flex-col gap-1 min-w-[80px]">
								<span className="text-xs text-muted-foreground flex items-center">
									<PercentCircle className="w-4 h-4 mr-1" />
									Progress
								</span>
								<span>100%</span>
							</div>
							<div className="flex flex-col gap-1 min-w-[120px]">
								<span className="text-xs text-muted-foreground flex items-center">
									<CalendarDays className="w-4 h-4 mr-1" />
									Date due
								</span>
								<span>Jun 19, 2025</span>
							</div>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="flex flex-col gap-2">
								<span className="text-xs text-muted-foreground">
									Risk visibility
								</span>
								<span>Hide everything</span>
								<span className="text-xs text-muted-foreground">
									Resend due
								</span>
								<span>—</span>
								<span className="text-xs text-muted-foreground">
									Sent by
								</span>
								<span>Ram Kumar</span>
								<span className="text-xs text-muted-foreground">
									Customer
								</span>
								<span>ABC Insurance</span>
								<span className="text-xs text-muted-foreground flex items-center">
									<Mail className="w-4 h-4 mr-1" />
									Sent to
								</span>
								<span>info@abcinsurance.com</span>
								<span className="text-xs text-muted-foreground flex items-center">
									<Users className="w-4 h-4 mr-1" />
									People with access
								</span>
								<span>
									Account users at Zoom Insurance Brokers
								</span>
							</div>
							<div className="flex flex-col gap-2">
								<span className="text-xs text-muted-foreground flex items-center">
									<Clock className="w-4 h-4 mr-1" />
									Opened
								</span>
								<span>Jun 1, 2025</span>
								<span className="text-xs text-muted-foreground">
									Sent
								</span>
								<span>Jun 1, 2025</span>
								<span className="text-xs text-muted-foreground flex items-center">
									<AlertTriangle className="w-4 h-4 mr-1" />
									Status
								</span>
								<span>Awaiting review</span>
								<span className="text-xs text-muted-foreground flex items-center">
									<PercentCircle className="w-4 h-4 mr-1" />
									Progress
								</span>
								<span>100% complete</span>
								<span className="text-xs text-muted-foreground flex items-center">
									<CheckCircle className="w-4 h-4 mr-1" />
									Completed
								</span>
							</div>
						</div>
					</div>
					{/* Risks Identified Table */}
					<div className="bg-card border rounded-xl p-6">
						<div className="flex items-center justify-between mb-4">
							<h2 className="font-semibold text-lg">
								Risks identified
							</h2>
							<Button variant="outline" size="sm">
								View all
							</Button>
						</div>
						<div className="overflow-x-auto">
							<table className="min-w-full text-sm">
								<thead>
									<tr className="text-muted-foreground border-b">
										<th className="text-left py-2 px-4 font-normal">
											<AlertTriangle className="inline w-4 h-4 mr-1" />
											Finding
										</th>
										<th className="text-left py-2 px-4 font-normal">
											<AlertTriangle className="inline w-4 h-4 mr-1" />
											Risk
										</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className="py-2 px-4">
											Anti-malware solution is not
											deployed...
										</td>
										<td className="py-2 px-4">
											Failure to deploy an anti-malware
											solution...
										</td>
									</tr>
									<tr>
										<td className="py-2 px-4">
											Critical security patches not
											installed
										</td>
										<td className="py-2 px-4">
											Failure to install security
											patches...
										</td>
									</tr>
									{/* More rows as needed */}
								</tbody>
							</table>
						</div>
					</div>
				</div>
				{/* Progress Card */}
				<aside className="w-full md:w-80 flex-shrink-0">
					<div className="bg-card border rounded-xl p-6">
						<h2 className="font-semibold mb-2">Progress</h2>
						<div className="flex flex-col gap-2">
							<span className="text-xs text-muted-foreground">
								Sent
							</span>
							<span>Jun 1, 2025</span>
							<span className="text-xs text-muted-foreground flex items-center">
								<Clock className="w-4 h-4 mr-1" />
								Opened
							</span>
							<span>Jun 1, 2025</span>
							<span className="text-xs text-muted-foreground">
								Awaiting review
							</span>
							<span>100% complete</span>
							<span className="text-xs text-muted-foreground flex items-center">
								<CheckCircle className="w-4 h-4 mr-1" />
								Completed
							</span>
						</div>
						<div className="mt-4">
							<div className="w-full bg-muted rounded-full h-2">
								<div
									className="bg-blue-500 h-2 rounded-full"
									style={{ width: "100%" }}
								/>
							</div>
							<div className="text-xs text-muted-foreground mt-1 text-right">
								67 of 67 answered
							</div>
						</div>
					</div>
				</aside>
			</div>
		</SidebarLayout>
	);
}
