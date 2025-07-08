import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Star } from "lucide-react";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import React from "react";

type Section = {
	title: string;
	rating: number;
	grade: string;
	max: number;
	chart: { date: string; value: number }[];
	breakdown: {
		label: string;
		value: number;
		color: string;
		icon: React.ElementType;
	}[];
};

export default function SectionCard({ section }: { section: Section }) {
	return (
		<Card className="flex flex-col md:flex-row items-stretch mb-6 bg-white dark:bg-card rounded-lg shadow-sm border overflow-hidden">
			<div className="flex-1 p-4 flex flex-col justify-between">
				<div className="flex items-center gap-2 mb-2">
					<Badge
						variant="outline"
						className="text-lg px-3 py-1 border-green-500 text-green-600 flex items-center gap-1 dark:border-green-400 dark:text-green-400"
					>
						<ShieldCheck className="w-4 h-4" />
						{section.grade}
					</Badge>
					<span className="text-3xl font-bold text-green-600 dark:text-green-400 flex items-center gap-1">
						<Star className="w-5 h-5 text-yellow-400" />
						{section.rating}
					</span>
					<span className="text-muted-foreground self-end">
						/ {section.max}
					</span>
				</div>
				<div className="h-32 w-full">
					<ChartContainer
						config={{
							value: { label: section.title, color: "#2563eb" },
						}}
						className="h-full w-full"
					>
						<AreaChart
							data={section.chart}
							margin={{ left: 0, right: 0, top: 10, bottom: 10 }}
						>
							<defs>
								<linearGradient
									id="colorValue"
									x1="0"
									y1="0"
									x2="0"
									y2="1"
								>
									<stop
										offset="5%"
										stopColor="#2563eb"
										stopOpacity={0.8}
									/>
									<stop
										offset="95%"
										stopColor="#2563eb"
										stopOpacity={0.1}
									/>
								</linearGradient>
							</defs>
							<XAxis
								dataKey="date"
								tick={{ fontSize: 12 }}
								axisLine={false}
								tickLine={false}
							/>
							<YAxis hide domain={[0, section.max]} />
							<Tooltip content={<ChartTooltipContent />} />
							<Area
								type="monotone"
								dataKey="value"
								stroke="#2563eb"
								fill="url(#colorValue)"
								strokeWidth={3}
								dot={{
									r: 4,
									fill: "#fff",
									stroke: "#2563eb",
									strokeWidth: 2,
								}}
								activeDot={{ r: 6 }}
							/>
						</AreaChart>
					</ChartContainer>
				</div>
			</div>
			<div className="flex flex-col justify-between p-4 min-w-[220px] bg-muted/30 dark:bg-muted/10 border-l dark:border-zinc-800">
				<div className="font-medium mb-2">Current risk breakdown</div>
				<div className="flex flex-col gap-2">
					{section.breakdown.map((risk) => {
						const Icon = risk.icon;
						return (
							<div
								key={risk.label}
								className="flex items-center gap-2"
							>
								<Badge
									style={{ backgroundColor: risk.color }}
									className="text-white flex items-center gap-1"
								>
									{Icon && <Icon className="w-3 h-3" />}
									{risk.value}{" "}
									{risk.value === 1 ? "risk" : "risks"}
								</Badge>
								<span className="text-sm text-muted-foreground">
									{risk.label}
								</span>
							</div>
						);
					})}
				</div>
			</div>
		</Card>
	);
}
