import { Cell, Pie, PieChart } from "recharts";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Progress } from "@/components/ui/progress";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from "../ui/chart";
import { Button } from "../ui/button";
import { InfoIcon, ArrowRightIcon } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Separator } from "../ui/separator";

const chartData = [
	{ name: "Fully implemented", value: 15, color: "#74c47a" },
	{ name: "Partially implemented", value: 5, color: "#ffc26c" },
	{ name: "Not implemented (risks found)", value: 11, color: "#e02c2c" },
	{ name: "No evidence", value: 55, color: "#adadad" },
];

const chartConfig = {
	value: {
		label: "",
	},
} satisfies ChartConfig;

const SecurityProfileRating = () => {
	return (
		<div className="bg-yellow-50 dark:bg-gray-950 border rounded-sm p-8">
			<div className="flex items-center justify-center">
				<span className="text-sm text-muted-foreground">
					Security Profile Rating
				</span>
				<Button variant="ghost" size="icon">
					<InfoIcon />
				</Button>
			</div>
			<div className="flex items-center justify-center gap-2">
				<span className="text-lg w-10 h-10 flex items-center justify-center text-green-500 border border-green-500 rounded-full p-2">
					A
				</span>
				<span className="text-3xl flex items-baseline justify-center text-green-500">
					745
				</span>
				<span className="self-end">/950</span>
			</div>
		</div>
	);
};

export default function SecurityProfileSummary() {
	return (
		<Card>
			<CardHeader className="flex items-center justify-between">
				<CardTitle>Summary</CardTitle>
				<div>
					<Dialog>
						<DialogTrigger asChild>
							<Button variant="ghost" size="icon">
								<InfoIcon />
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>
									Security Profile Explained
								</DialogTitle>
							</DialogHeader>
							<DialogDescription>
								Each control is evaluated based on the results
								of its checks and grouped into four categories:
							</DialogDescription>
							<div className="space-y-6">
								<ul className="list-inside space-y-4 text-sm">
									<li>
										<span className="bg-green-500 rounded-full w-4 h-4 inline-block mr-2"></span>
										<span className="font-bold">
											Fully implemented
										</span>{" "}
										- All checks passed and the control is
										fully implemented.
									</li>
									<li>
										<span className="bg-orange-500 rounded-full w-4 h-4 inline-block mr-2"></span>
										<span className="font-bold">
											Partially implemented
										</span>{" "}
										- Some checks passed and the control is
										partially implemented.
									</li>
									<li>
										<span className="bg-red-500 rounded-full w-4 h-4 inline-block mr-2"></span>
										<span className="font-bold">
											Not implemented (risks found)
										</span>{" "}
										- Some checks failed and the control is
										not implemented.
									</li>
									<li>
										<span className="bg-gray-500 rounded-full w-4 h-4 inline-block mr-2"></span>
										<span className="font-bold">
											No evidence
										</span>{" "}
										- No checks were run for the control.
									</li>
								</ul>
								<Separator />
								<ul className="space-y-2 text-sm">
									<li>
										<h6 className="font-bold">
											Control coverage
										</h6>
										<p>
											Refers to the number of controls
											that have supporting evidence.
										</p>
									</li>
									<li>
										<h6 className="font-bold">
											Check coverage
										</h6>
										<p>
											Refers to the number of checks that
											have supporting evidence.
										</p>
									</li>
								</ul>
							</div>
						</DialogContent>
					</Dialog>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<ChartContainer
					config={chartConfig}
					className="min-h-[200px] w-full"
				>
					<PieChart>
						<ChartTooltip content={<ChartTooltipContent />} />

						<Pie
							innerRadius={60}
							outerRadius={80}
							data={chartData}
							dataKey="value"
							fill="var(--color-desktop)"
							radius={4}
						>
							{chartData.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={entry.color}
								/>
							))}
						</Pie>
					</PieChart>
				</ChartContainer>
				<div className="flex flex-col gap-2">
					{chartData.map((entry, index) => (
						<div
							className="flex items-center justify-between gap-2"
							key={`entry-${index}`}
						>
							<p className="text-sm">{entry.name}</p>
							<div className="flex items-center gap-1 w-12">
								<div
									className="h-3 w-3 rounded-full"
									style={{ backgroundColor: entry.color }}
								/>
								<p className="text-sm">{entry.value}</p>
							</div>
						</div>
					))}
				</div>

				<div className="bg-accent border rounded-sm p-2">
					<div className="flex items-center justify-between gap-2 mb-1">
						<p className="text-sm">Fully implemented</p>
						<p className="text-sm">112/302</p>
					</div>
					<Progress value={33} className="bg-accent border" />
				</div>
				<SecurityProfileRating />
			</CardContent>
			<CardFooter className="flex items-center justify-between">
				<div className="text-sm flex items-center">
					Risk Assessment{" "}
					<Button variant="ghost" size="icon">
						<InfoIcon />
					</Button>
				</div>
				<Button variant="secondary" size="sm">
					Get started <ArrowRightIcon />
				</Button>
			</CardFooter>
		</Card>
	);
}
