import * as React from "react";
import {
	BookOpen,
	GalleryVerticalEnd,
	Globe,
	Map,
	PieChart,
	SquareTerminal,
	User,
} from "lucide-react";

import { NavMain } from "@/components/nav-main"; // Your updated NavMain here
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";

const data = {
	user: {
		name: "Super Admin",
		email: "superadmin@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	teams: [
		{
			name: "DefendX",
			logo: GalleryVerticalEnd,
			plan: "Product By CyberDim",
		},
	],
	navMain: [
		{
			title: "Customer Portfolio",
			url: "/customer-portfolio",
			icon: SquareTerminal,
		},
		// {
		// 	title: "Security Profile",
		// 	url: "/security-profile",
		// 	icon: SquareTerminal,
		// },
		{
			title: "Customer Summary",
			url: "/customer-summary",
			icon: User,
		},
		{
			title: "Risk Profile",
			url: "/risk-profile",
			icon: PieChart,
		},
		{
			title: "Risk Assessments",
			url: "/risk-assessments",
			icon: BookOpen,
		},
		{
			title: "Domains",
			url: "/domains",
			icon: Globe,
		},
		{
			title: "IP Addresses",
			url: "/ip-addresses",
			icon: Map,
		},
		{
			title: "Questionnaire Library",
			url: "/questionnaire-library",
			icon: BookOpen,
		},
		{
			title: "Security Questionnaires",
			url: "/security-questionnaires",
			icon: BookOpen,
		},
		{
			title: "Additional Evidence",
			url: "/additional-evidence",
			icon: BookOpen,
		},
		{
			title: "Vulnerabilities",
			url: "/vulnerabilities",
			icon: BookOpen,
		},
		{
			title: "Fourth Parties",
			url: "/fourth-parties",
			icon: BookOpen,
		},
		{
			title: "Modified Risks",
			url: "/modified-risks",
			icon: BookOpen,
		},
		{
			title: "Remediation",
			url: "/remediation",
			icon: BookOpen,
		},
		// {
		// 	title: "Settings",
		// 	url: "#",
		// 	icon: Settings2,
		// 	items: [
		// 		{
		// 			title: "General",
		// 			url: "#",
		// 		},
		// 		{
		// 			title: "Team",
		// 			url: "#",
		// 		},
		// 		{
		// 			title: "Billing",
		// 			url: "#",
		// 		},
		// 		{
		// 			title: "Limits",
		// 			url: "#",
		// 		},
		// 	],
		// },
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={data.teams} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
