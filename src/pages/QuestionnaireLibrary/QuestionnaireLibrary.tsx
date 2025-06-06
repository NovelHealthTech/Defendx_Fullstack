import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	ChevronDown,
	Eye,
	Copy,
	Edit2,
	MoreVertical,
	Info,
} from "lucide-react";
import SidebarLayout from "@/layouts/sidebar-layout";
import PageHeader from "@/components/PageHeader";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import ImportQuestionnaireDialog from "@/components/questionnaires/ImportQuestionnaireDialog";
import { useNavigate } from "react-router";

const questionnaires = [
	{
		id: 1,
		name: "Test 1",
		type: "Custom",
		status: "Draft",
		created: "Jun 5, 2025",
		updated: "Jun 5, 2025",
		editedBy: { name: "ritesh.aggarwal", avatar: "" },
		enabled: false,
		description: "",
	},
	{
		id: 2,
		name: "New Custom Questionnaire",
		type: "Custom",
		status: "Draft",
		created: "Apr 29, 2025",
		updated: "May 9, 2025",
		editedBy: { name: "rahul.n", avatar: "" },
		enabled: false,
		description: "",
	},
	{
		id: 3,
		name: "PCI DSS v4 - SAQ B-IP",
		type: "Default",
		status: "Published",
		created: "Mar 27, 2025",
		updated: "Mar 27, 2025",
		editedBy: { name: "rahul.n", avatar: "" },
		enabled: true,
		description:
			"Evaluate an organization's alignment with PCI DSS v4 requirements specific to SAQ B-IP.",
	},
];

const TABS = [
	{ label: "Show all", value: "all" },
	{ label: "Default", value: "default" },
	{ label: "Custom", value: "custom" },
];

export default function QuestionnaireLibrary() {
	const [tab, setTab] = useState("all");
	const [search, setSearch] = useState("");
	const [enabled, setEnabled] = useState<{ [id: number]: boolean }>(
		Object.fromEntries(questionnaires.map((q) => [q.id, q.enabled]))
	);
	const [showDescription, setShowDescription] = useState(true);
	const [importDialogOpen, setImportDialogOpen] = useState(false);
	const navigate = useNavigate();

	const filtered = questionnaires.filter((q) => {
		if (tab === "default" && q.type !== "Default") return false;
		if (tab === "custom" && q.type !== "Custom") return false;
		if (
			search &&
			!q.name.toLowerCase().includes(search.toLowerCase()) &&
			!q.description.toLowerCase().includes(search.toLowerCase())
		)
			return false;
		return true;
	});

	return (
		<SidebarLayout
			breadcrumbs={[
				{
					label: "Questionnaire Library",
					href: "/questionnaire-library",
				},
			]}
		>
			<PageHeader
				title="Questionnaire Library"
				info={
					showDescription
						? `The Questionnaire Library allows you to manage the types of questionnaires in your account. Enabling a questionnaire in the library will make it available to send to customers via the Send Questionnaire screen. You can also create custom questionnaires to suit your specific needs.`
						: undefined
				}
				actions={
					<div className="flex gap-2 items-center">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button className="flex items-center gap-1">
									Create custom questionnaire{" "}
									<ChevronDown className="w-4 h-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-72">
								<DropdownMenuItem
									className="flex flex-col items-start gap-0 py-2"
									onClick={() =>
										navigate(
											"/questionnaire-library/edit/new"
										)
									}
								>
									<span className="font-medium">
										Create a new questionnaire
									</span>
									<span className="text-xs text-muted-foreground">
										Start with a blank template
									</span>
								</DropdownMenuItem>
								<DropdownMenuItem
									className="flex flex-col items-start gap-0 py-2"
									onClick={() => setImportDialogOpen(true)}
								>
									<span className="font-medium">
										Import a questionnaire
									</span>
									<span className="text-xs text-muted-foreground">
										Use an existing questionnaire as a
										template
									</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
						<Button
							variant="outline"
							size="icon"
							aria-label="Toggle description"
							onClick={() => setShowDescription((v) => !v)}
						>
							<Info className="w-5 h-5" />
						</Button>
					</div>
				}
			/>
			{showDescription && (
				<div className="text-xs text-blue-700 dark:text-blue-400 mb-2">
					<a href="#" className="underline">
						Learn more about pre-built security questionnaires
					</a>{" "}
					&nbsp; &rarr; &nbsp;
					<a href="#" className="underline">
						How to create a custom questionnaire
					</a>{" "}
					&nbsp; &rarr;
				</div>
			)}
			<div className="rounded-xl border bg-card p-4 flex flex-col gap-2 w-full overflow-x-auto">
				<div className="flex flex-wrap items-center justify-between gap-2 mb-2">
					<Tabs value={tab} onValueChange={setTab} className="">
						<TabsList>
							{TABS.map((t) => (
								<TabsTrigger key={t.value} value={t.value}>
									{t.label}
								</TabsTrigger>
							))}
						</TabsList>
					</Tabs>
					<Input
						placeholder="Search..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="w-56 h-8"
					/>
				</div>
				<div className="overflow-x-auto">
					<table className="min-w-full text-sm">
						<thead>
							<tr className="text-muted-foreground border-b">
								<th className="text-left py-2 px-4 font-normal">
									Enabled
								</th>
								<th className="text-left py-2 px-4 font-normal">
									Name
								</th>
								<th className="text-left py-2 px-4 font-normal">
									Status
								</th>
								<th className="text-left py-2 px-4 font-normal">
									Date created
								</th>
								<th className="text-left py-2 px-4 font-normal">
									Last updated
								</th>
								<th className="text-left py-2 px-4 font-normal">
									Last edited by
								</th>
								<th className="text-center py-2 px-4 font-normal"></th>
							</tr>
						</thead>
						<tbody>
							{filtered.map((q) => (
								<tr
									key={q.id}
									className="border-b last:border-0"
								>
									<td className="py-2 px-4">
										<Switch
											checked={enabled[q.id]}
											onCheckedChange={() =>
												setEnabled((prev) => ({
													...prev,
													[q.id]: !prev[q.id],
												}))
											}
											aria-label="Enable questionnaire"
										/>
									</td>
									<td className="py-2 px-4 min-w-[220px]">
										<div className="flex flex-col gap-1">
											<div className="flex items-center gap-2">
												<span className="font-medium text-foreground leading-tight">
													{q.name}
												</span>
												<Badge
													variant="outline"
													className="text-xs px-2 py-0.5"
												>
													{q.type}
												</Badge>
											</div>
											{q.description && (
												<span className="text-xs text-muted-foreground leading-tight">
													{q.description}
												</span>
											)}
										</div>
									</td>
									<td className="py-2 px-4">
										<Badge
											variant="outline"
											className={
												q.status === "Published"
													? "border-blue-500 text-blue-600"
													: "border-green-500 text-green-600"
											}
										>
											{q.status}
										</Badge>
									</td>
									<td className="py-2 px-4">{q.created}</td>
									<td className="py-2 px-4">{q.updated}</td>
									<td className="py-2 px-4">
										<div className="flex items-center gap-2">
											<Avatar className="w-6 h-6">
												{q.editedBy.avatar ? (
													<AvatarImage
														src={q.editedBy.avatar}
														alt={q.editedBy.name}
													/>
												) : (
													<AvatarFallback>
														{q.editedBy.name[0]}
													</AvatarFallback>
												)}
											</Avatar>
											<span className="text-xs">
												{q.editedBy.name}
											</span>
										</div>
									</td>
									<td className="py-2 px-4 text-center">
										<div className="flex items-center gap-2 justify-center">
											{/* <Button
												variant="ghost"
												size="icon"
												aria-label="View"
											>
												<Eye className="w-4 h-4" />
											</Button> */}
											<Button
												variant="ghost"
												size="icon"
												aria-label="Copy"
											>
												<Copy className="w-4 h-4" />
											</Button>
											<Button
												variant="ghost"
												size="icon"
												aria-label="Edit"
												onClick={() =>
													navigate(
														`/questionnaire-library/edit/${q.id}`
													)
												}
											>
												<Edit2 className="w-4 h-4" />
											</Button>
											<Button
												variant="ghost"
												size="icon"
												aria-label="More"
											>
												<MoreVertical className="w-4 h-4" />
											</Button>
										</div>
									</td>
								</tr>
							))}
							{filtered.length === 0 && (
								<tr>
									<td
										colSpan={7}
										className="text-center py-8 text-muted-foreground"
									>
										No questionnaires found.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>

			{/* Import Questionnaire Dialog */}
			<ImportQuestionnaireDialog
				open={importDialogOpen}
				onOpenChange={setImportDialogOpen}
			/>
		</SidebarLayout>
	);
}
