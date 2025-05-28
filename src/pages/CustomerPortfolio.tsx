import { Button } from "@/components/ui/button";
import SidebarLayout from "@/layouts/sidebar-layout";
import {
	InfoIcon,
	ChevronDown,
	Search,
	Trash2,
	ArrowUpRight,
	ArrowDownRight,
	Plus,
	BadgePlus,
	Filter,
	Download,
	Users,
	Columns3,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const customers = [
	{
		name: "Adani Group",
		domain: "adani.com",
		logo: "https://logo.clearbit.com/adani.com",
		score: 794,
		grade: "B",
		trend: 17,
		trendUp: true,
		lastAssessed: "Not assessed",
		reassessment: "-",
		labels: [],
	},
	{
		name: "Birlasoft",
		domain: "birlasoft.com",
		logo: "https://logo.clearbit.com/birlasoft.com",
		score: 861,
		grade: "A",
		trend: 4,
		trendUp: true,
		lastAssessed: "Not assessed",
		reassessment: "-",
		labels: [],
	},
	{
		name: "Google",
		domain: "google.com",
		logo: "https://logo.clearbit.com/google.com",
		score: 672,
		grade: "B",
		trend: 23,
		trendUp: false,
		lastAssessed: "Not assessed",
		reassessment: "-",
		labels: [],
	},
];

export default function CustomerPortfolio() {
	const [search, setSearch] = useState("");
	return (
		<SidebarLayout
			breadcrumbs={[
				{
					label: "Customer Portfolio",
					href: "/customer-portfolio",
				},
			]}
		>
			<div className="flex flex-1 flex-col gap-4">
				{/* Header */}
				<div className="flex items-center justify-between flex-wrap gap-2">
					<div className="flex flex-col gap-1">
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<span>Zoom Insurance Brokers</span>
							<span className="text-blue-600 underline cursor-pointer">
								(zoominsurancebrokers.com)
							</span>
						</div>
						<div className="flex items-center gap-2 mt-1">
							<span className="text-xs text-muted-foreground">
								Current Portfolio:
							</span>
							<Button
								variant="outline"
								size="sm"
								className="flex items-center gap-1"
							>
								All Portfolios{" "}
								<ChevronDown className="w-4 h-4" />
							</Button>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							size="sm"
							className="flex items-center gap-1"
						>
							<Filter className="w-4 h-4" /> Apply filters
						</Button>
						<Button
							variant="outline"
							size="sm"
							className="flex items-center gap-1"
						>
							<Download className="w-4 h-4" /> Export
						</Button>
						<Button variant="outline" size="icon">
							<InfoIcon className="w-4 h-4" />
						</Button>
					</div>
				</div>
				{/* Description */}
				<div className="flex flex-col gap-2">
					<h2 className="text-2xl font-bold">Customer Portfolio</h2>
					<p className="text-sm text-muted-foreground">
						Customer Portfolio helps you find, track, and monitor
						the security posture of any organization instantly. You
						can categorize customers, compare them against industry
						benchmarks, and see how their security posture is
						changing over time.
					</p>
				</div>
				{/* Tabs */}
				<Tabs defaultValue="portfolio" className="w-full">
					<TabsList className="mb-2">
						<TabsTrigger value="portfolio">Portfolio</TabsTrigger>
						<TabsTrigger value="snapshots">
							Snapshots (0)
						</TabsTrigger>
					</TabsList>
					<TabsContent value="portfolio">
						{/* Controls */}
						<div className="flex flex-wrap items-center justify-between gap-2 mb-2">
							<div className="flex items-center gap-2">
								<Button
									variant="outline"
									size="sm"
									className="flex items-center gap-1"
								>
									<Users className="w-4 h-4" /> All Portfolios{" "}
									<ChevronDown className="w-4 h-4" />
								</Button>
								<span className="text-xs text-muted-foreground">
									10 / 50 customers monitored
								</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="relative">
									<Input
										placeholder="Search..."
										value={search}
										onChange={(e) =>
											setSearch(e.target.value)
										}
										className="h-8 w-48 pl-8"
									/>
									<Search className="absolute left-2 top-2 w-4 h-4 text-muted-foreground pointer-events-none" />
								</div>
								<Button
									variant="outline"
									size="sm"
									className="flex items-center gap-1"
								>
									Tier Summary{" "}
									<ChevronDown className="w-4 h-4" />
								</Button>
								<Button
									variant="outline"
									size="sm"
									className="flex items-center gap-1"
								>
									<Columns3 className="w-4 h-4" /> Columns
									(6/16)
								</Button>
							</div>
							<div className="flex items-center gap-2">
								<Button
									variant="outline"
									size="sm"
									className="flex items-center gap-1"
								>
									Import
								</Button>
								<Button
									size="sm"
									className="flex items-center gap-1"
								>
									<BadgePlus className="w-4 h-4" /> Monitor
									new customer
								</Button>
							</div>
						</div>
						{/* Table */}
						<div className="overflow-x-auto rounded-lg border bg-card">
							<table className="min-w-full text-sm">
								<thead>
									<tr className="text-muted-foreground border-b">
										<th className="text-left py-2 px-4 font-normal">
											Tier
										</th>
										<th className="text-left py-2 px-4 font-normal">
											Customer
										</th>
										<th className="text-left py-2 px-4 font-normal">
											Score
										</th>
										<th className="text-left py-2 px-4 font-normal">
											Year Trend
										</th>
										<th className="text-left py-2 px-4 font-normal">
											Last Assessed
										</th>
										<th className="text-left py-2 px-4 font-normal">
											Reassessment date
										</th>
										<th className="text-left py-2 px-4 font-normal">
											Labels
										</th>
										<th className="text-center py-2 px-4 font-normal"></th>
									</tr>
								</thead>
								<tbody>
									{customers
										.filter(
											(c) =>
												c.name
													.toLowerCase()
													.includes(
														search.toLowerCase()
													) ||
												c.domain
													.toLowerCase()
													.includes(
														search.toLowerCase()
													)
										)
										.map((c) => (
											<tr
												key={c.domain}
												className="border-b last:border-0"
											>
												<td className="py-2 px-4">
													<Button
														variant="ghost"
														size="icon"
														className="rounded-full"
													>
														<Plus className="w-4 h-4" />
													</Button>
												</td>
												<td className="py-2 px-4 flex items-center gap-2">
													<Avatar className="w-7 h-7">
														<AvatarImage
															src={c.logo}
															alt={c.name}
														/>
														<AvatarFallback>
															{c.name[0]}
														</AvatarFallback>
													</Avatar>
													<div className="flex flex-col">
														<span className="font-medium text-foreground leading-tight">
															{c.name}
														</span>
														<span className="text-xs text-muted-foreground leading-tight">
															{c.domain}
														</span>
													</div>
												</td>
												<td className="py-2 px-4">
													<Badge
														variant="outline"
														className={
															c.grade === "A"
																? "border-green-500 text-green-600"
																: "border-yellow-500 text-yellow-600"
														}
													>
														{c.grade} {c.score}
													</Badge>
												</td>
												<td className="py-2 px-4 flex items-center gap-1">
													{c.trendUp ? (
														<ArrowUpRight className="w-4 h-4 text-green-600" />
													) : (
														<ArrowDownRight className="w-4 h-4 text-red-600" />
													)}
													<span
														className={
															c.trendUp
																? "text-green-600"
																: "text-red-600"
														}
													>
														{c.trend}
													</span>
												</td>
												<td className="py-2 px-4">
													{c.lastAssessed}
												</td>
												<td className="py-2 px-4">
													{c.reassessment}
												</td>
												<td className="py-2 px-4">
													<Button
														variant="outline"
														size="sm"
														className="border-dashed text-muted-foreground"
													>
														+ Add label
													</Button>
												</td>
												<td className="py-2 px-4 text-center">
													<Button
														variant="ghost"
														size="icon"
													>
														<Trash2 className="w-4 h-4 text-muted-foreground" />
													</Button>
												</td>
											</tr>
										))}
								</tbody>
							</table>
						</div>
					</TabsContent>
					<TabsContent value="snapshots">
						<div className="text-muted-foreground text-center py-8">
							No snapshots available.
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</SidebarLayout>
	);
}
