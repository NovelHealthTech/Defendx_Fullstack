import PageHeader from "@/components/PageHeader";
import SidebarLayout from "@/layouts/sidebar-layout";
import { Info, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import FourthPartiesTable from "@/components/fourth-parties/FourthPartiesTable";
import { Link } from "react-router";

export default function FourthParties() {
	const [showDescription, showDescriptionSet] = useState(true);
	return (
		<SidebarLayout
			breadcrumbs={[
				{
					label: "Fourth Parties",
					href: "/fourth-parties",
				},
			]}
		>
			<PageHeader
				title="Fourth Parties"
				info={
					showDescription
						? "Fourth parties are entities that are not directly involved in the risk assessment process, but are still considered to be a risk to the organization. They are typically external entities that are not part of the organization's own operations, but are still considered to be a risk to the organization."
						: ""
				}
				actions={
					<div className="flex gap-4">
						<Button asChild>
							<Link to="/fourth-parties/add-fourth-party">
								<Plus className="w-4 h-4" />
								Add Fourth Party
							</Link>
						</Button>
						<Button
							variant="outline"
							onClick={() => showDescriptionSet(!showDescription)}
						>
							<Info className="w-4 h-4" />
						</Button>
					</div>
				}
			/>
			<FourthPartiesTable />
		</SidebarLayout>
	);
}
