import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";
import { Cell, Pie, PieChart } from "recharts";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from "@/components/ui/chart";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const chartData = [
	{ name: "Fully implemented", value: 6, color: "#74c47a" },
	{ name: "Fully implemented", value: 8, color: "green" },
	{ name: "Fully implemented", value: 4, color: "#74c47a" },
	{ name: "No evidence", value: 6, color: "#adadad" },
	{ name: "Fully implemented", value: 5, color: "green" },
	{ name: "Fully implemented", value: 4, color: "#74c47a" },
	{ name: "Fully implemented", value: 7, color: "green" },
	{ name: "Fully implemented", value: 4, color: "#74c47a" },
	{ name: "Partially implemented", value: 5, color: "#ffc26c" },
	{ name: "Fully implemented", value: 6, color: "green" },
	{ name: "Fully implemented", value: 4, color: "#74c47a" },
	{ name: "Fully implemented", value: 10, color: "green" },
	{ name: "Fully implemented", value: 9, color: "#74c47a" },
	{ name: "Fully implemented", value: 6, color: "green" },
	{ name: "Fully implemented", value: 2, color: "#74c47a" },
	{ name: "Fully implemented", value: 3, color: "green" },
	{ name: "Fully implemented", value: 7, color: "#74c47a" },
	{ name: "Fully implemented", value: 4, color: "green" },
	{ name: "Not implemented (risks found)", value: 11, color: "#e02c2c" },
];
const chartData1 = [
	{ name: "Fully implemented", value: 6, color: "#74c47a" },
	{ name: "Fully implemented", value: 8, color: "green" },
];
const chartData2 = [
	{ name: "Fully implemented", value: 6, color: "#668ab9" },
	{ name: "Fully implemented", value: 8, color: "#769ccb" },
];
const chartData3 = [{ name: "Fully implemented", value: 6, color: "gray" }];

const chartConfig = {
	value: {
		label: "",
	},
} satisfies ChartConfig;

const SecurityProfileSummaryCharts = () => (
	<div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-stretch my-8">
		<div className="flex flex-col justify-between gap-1">
			<h4 className="text-sm font-medium text-muted-foreground flex items-center gap-1 justify-center">
				Cyber Rating <InfoIcon className="w-4 h-4" />
			</h4>
			<div className="relative">
				<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
					<div className="text-white dark:text-green-500 text-4xl font-medium">
						B+
					</div>
				</div>

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
			</div>
			<div className="text-center">
				<Button variant="outline">Technical Report</Button>
			</div>
		</div>
		<div className="flex flex-col justify-between gap-1">
			<h4 className="text-sm font-medium text-muted-foreground flex items-center gap-1 justify-center">
				Probable Financial Impact Rating{" "}
				<InfoIcon className="w-4 h-4" />
			</h4>
			<Card>
				<CardHeader>
					<CardTitle className="text-center bg-red-900 p-2 rounded-lg">
						RISK (Annualized)
					</CardTitle>
					<CardDescription className="text-center flex items-center justify-between gap-2">
						Aggregate Exposure{" "}
						<span className="text-2xl text-red-600">$799.9K</span>
					</CardDescription>
				</CardHeader>
				<CardContent className="grid grid-cols-2 gap-2 items-center">
					<div className="text-sm font-medium">Data Breach</div>
					<div className="text-xl text-right text-yellow-600">
						$348.9K
					</div>
					<div className="text-sm font-medium">Ransomware</div>
					<div className="text-xl text-right text-yellow-600">
						$350.1K
					</div>
					<div className="text-sm font-medium">
						Business Interruption
					</div>
					<div className="text-xl text-right text-green-600">
						$100.9K
					</div>
				</CardContent>
			</Card>
			<div className="text-center">
				<Button variant="outline">Fair Report</Button>
			</div>
		</div>
		<div className="flex flex-col justify-between gap-1">
			<h4 className="text-sm font-medium text-muted-foreground flex items-center gap-1 justify-center">
				Compliance Rating <InfoIcon className="w-4 h-4" />
			</h4>
			<div className="relative">
				<ChartContainer
					config={chartConfig}
					className="min-h-[200px] w-full"
				>
					<PieChart>
						<ChartTooltip content={<ChartTooltipContent />} />
						<Pie
							innerRadius={60}
							outerRadius={80}
							data={chartData1}
							dataKey="value"
							fill="var(--color-desktop)"
							radius={4}
						>
							{chartData1.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={entry.color}
								/>
							))}
						</Pie>
						<Pie
							innerRadius={40}
							outerRadius={58}
							data={chartData2}
							dataKey="value"
							fill="var(--color-desktop)"
							radius={4}
						>
							{chartData2.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={entry.color}
								/>
							))}
						</Pie>
						<Pie
							innerRadius={20}
							outerRadius={38}
							data={chartData3}
							dataKey="value"
							fill="var(--color-desktop)"
							radius={4}
						>
							{chartData3.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={entry.color}
								/>
							))}
						</Pie>
					</PieChart>
				</ChartContainer>
				<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
					<div className="text-white dark:text-white text-[10px] font-medium">
						Compliance 80%
					</div>
				</div>
			</div>
			<div className="text-center">
				<Button variant="outline">Compliance Report</Button>
			</div>
		</div>
	</div>
);

export default SecurityProfileSummaryCharts;
