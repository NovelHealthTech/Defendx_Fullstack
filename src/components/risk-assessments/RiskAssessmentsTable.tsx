import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ChevronRight, Filter, MoreVertical, Search } from "lucide-react";

const dummyData = [
	{
		name: "Security Profile Assessment",
		version: "Version 1",
		scope: "Whole vendor",
		author: "RA",
		published: "2024-06-01",
		reassessment: "-",
		status: [
			{
				label: "In progress",
				color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
			},
			{
				label: "Security profile",
				color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
			},
		],
	},
];

export default function RiskAssessmentsTable({
	onOpenFilter,
}: {
	onOpenFilter: () => void;
}) {
	const [tab, setTab] = React.useState("active");
	const [search, setSearch] = React.useState("");

	return (
		<Card className="p-0 w-full bg-white dark:bg-card rounded-lg shadow-sm border overflow-x-auto">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 pt-4">
				<Tabs
					value={tab}
					onValueChange={setTab}
					className="w-full sm:w-auto"
				>
					<TabsList className="bg-muted/30 dark:bg-muted/10">
						<TabsTrigger value="active">Active (1)</TabsTrigger>
						<TabsTrigger value="archived">Archived</TabsTrigger>
					</TabsList>
				</Tabs>
				<div className="flex gap-2 w-full sm:w-auto">
					<div className="relative flex-1">
						<Input
							className="pl-8 pr-2"
							placeholder="Search..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
						<Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
					</div>
					<Button
						variant="outline"
						className="gap-1"
						onClick={onOpenFilter}
					>
						Apply filters <Filter className="w-4 h-4" />
					</Button>
				</div>
			</div>
			<div className="overflow-x-auto">
				<table className="min-w-full text-sm mt-4">
					<thead>
						<tr className="text-muted-foreground border-b">
							<th className="text-left py-2 px-4">Name</th>
							<th className="text-left py-2 px-4">Scope</th>
							<th className="text-left py-2 px-4">Author</th>
							<th className="text-left py-2 px-4">
								Published date
							</th>
							<th className="text-left py-2 px-4">
								Reassessment date
							</th>
							<th className="text-left py-2 px-4">Status</th>
							<th className="text-left py-2 px-4"></th>
						</tr>
					</thead>
					<tbody>
						{dummyData.map((row, i) => (
							<tr key={i} className="border-b last:border-0">
								<td className="py-2 px-4">
									<div className="font-medium">
										{row.name}
									</div>
									<div className="text-xs text-muted-foreground">
										{row.version}
									</div>
								</td>
								<td className="py-2 px-4">{row.scope}</td>
								<td className="py-2 px-4">
									<span className="inline-flex items-center justify-center rounded-full bg-muted w-7 h-7 text-xs font-semibold">
										{row.author}
									</span>
								</td>
								<td className="py-2 px-4">{row.published}</td>
								<td className="py-2 px-4">
									{row.reassessment}
								</td>
								<td className="py-2 px-4">
									<div className="flex flex-wrap gap-1">
										{row.status.map((s, idx) => (
											<span
												key={idx}
												className={`rounded-full px-2 py-0.5 text-xs font-medium ${s.color}`}
											>
												{s.label}
											</span>
										))}
									</div>
								</td>
								<td className="py-2 px-4 text-right">
									<Button variant="ghost" size="icon">
										<ChevronRight className="w-5 h-5" />
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</Card>
	);
}
