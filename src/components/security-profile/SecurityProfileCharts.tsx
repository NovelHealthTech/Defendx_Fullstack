import React from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	ReferenceArea,
	ResponsiveContainer,
	LabelList,
	Legend,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	Radar,
} from "recharts";
import { InfoIcon } from "lucide-react";

// 1. Security Score Trend Chart Data
const trendData = [
	{ month: "Jul '24", score: 87 },
	{ month: "Oct '24", score: 87 },
	{ month: "Jan '25", score: 89 },
	{ month: "Feb '25", score: 84 },
	{ month: "Apr '25", score: 87 },
];

// 2. Category Comparison Radar Chart Data
const radarCategories = [
	"Website Security",
	"DNS Health",
	"Email Security",
	"SSL/TLS Strength",
	"Application Security",
	"DDoS Resiliency",
	"Network Security",
	"Fraudulent Domains",
	"Credential Mgmt.",
	"IP Reputation",
	"Hacktivist Shares",
	"Social Network",
	"Attack Surface",
	"Brand Monitoring",
	"Patch Mgmt.",
	"Web Ranking",
	"Information Disclosure",
	"CDN Security",
];
const radarData = radarCategories.map((cat) => ({
	category: cat,
	star: Math.random() * 5,
	average: Math.random() * 5,
}));

// 3. Vulnerability Heat Map Data
const heatMapHeaders = ["Critical", "High", "Medium", "Low"];
const heatMapRows = [
	{ label: "Failed", color: "bg-red-700", values: [0, 12, 231, 61] },
	{ label: "Warning", color: "bg-orange-600", values: [0, 0, 13, 198] },
	{ label: "Passed", color: "bg-green-600", values: [109, 282, 830, 961] },
];

// Band colors for both light and dark mode
const bandColors = [
	{
		min: 90,
		max: 100,
		light: "#e6f4ea",
		dark: "#14532d", // green-900/13
		label: "Excellent",
	},
	{
		min: 80,
		max: 90,
		light: "#f3f9e3",
		dark: "#365314", // lime-900/13
		label: "Good",
	},
	{
		min: 70,
		max: 80,
		light: "#fffbe6",
		dark: "#78350f", // amber-900/13
		label: "Average",
	},
	{
		min: 60,
		max: 70,
		light: "#ffeaea",
		dark: "#7f1d1d", // red-900/13
		label: "Poor",
	},
	{
		min: 40,
		max: 60,
		light: "#fbeaea",
		dark: "#334155", // slate-800/13
		label: "Bad",
	},
];

const SecurityProfileCharts = () => (
	<div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
		{/* Security Score Trend Chart */}
		<div className="bg-white dark:bg-card rounded-lg p-4 border flex flex-col">
			<div className="font-semibold mb-2">Security Trend Chart</div>
			<ResponsiveContainer width="100%" height={260}>
				<LineChart
					data={trendData}
					margin={{ left: 0, right: 0, top: 10, bottom: 10 }}
				>
					{/* Colored bands */}
					{bandColors.map((band) => (
						<ReferenceArea
							key={band.label}
							y1={band.min}
							y2={band.max}
							fill={
								typeof window !== "undefined" &&
								document.documentElement.classList.contains(
									"dark"
								)
									? band.dark
									: band.light
							}
							fillOpacity={0.7}
							ifOverflow="extendDomain"
						/>
					))}
					<XAxis dataKey="month" tick={{ fontSize: 12 }} />
					<YAxis domain={[40, 100]} tick={{ fontSize: 12 }} />
					<Tooltip />
					<Legend verticalAlign="top" height={36} />
					<Line
						type="monotone"
						dataKey="score"
						stroke="#2563eb"
						strokeWidth={3}
						dot={{
							r: 8,
							fill: "#fff",
							stroke: "#2563eb",
							strokeWidth: 3,
						}}
						activeDot={{ r: 10 }}
					>
						<LabelList dataKey="score" position="top" />
					</Line>
				</LineChart>
			</ResponsiveContainer>
			<div className="flex justify-between text-xs mt-2">
				<span className="text-yellow-700 dark:text-yellow-300 font-semibold">
					The Average
				</span>
				<span className="text-xs text-muted-foreground">
					Security Score (%)
				</span>
			</div>
		</div>

		{/* Category Comparison Radar Chart */}
		<div className="bg-white dark:bg-card rounded-lg p-4 border flex flex-col">
			<div className="font-semibold mb-2 text-center">
				Category Comparison
			</div>
			<ResponsiveContainer width="100%" height={260}>
				<RadarChart data={radarData} outerRadius={90}>
					<PolarGrid />
					<PolarAngleAxis
						dataKey="category"
						tick={{ fontSize: 10 }}
					/>
					<PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} />
					<Radar
						name="Max Bupa"
						dataKey="star"
						stroke="#2563eb"
						fill="#2563eb"
						fillOpacity={0.6}
					/>
					<Radar
						name="Average"
						dataKey="average"
						stroke="#fbbf24"
						fill="#fbbf24"
						fillOpacity={0.3}
					/>
					<Legend />
				</RadarChart>
			</ResponsiveContainer>
		</div>

		{/* Vulnerability Heat Map */}
		<div className="bg-white dark:bg-card rounded-lg p-4 border flex flex-col">
			<div className="font-semibold mb-2 flex items-center gap-1 justify-center">
				Vulnerability Heat Map <InfoIcon className="w-4 h-4" />
			</div>
			<div className="grid grid-cols-5 gap-1 text-xs font-medium">
				<div className="bg-gray-300 dark:bg-gray-700 text-center py-2 rounded-tl-lg">
					Distribution
				</div>
				{heatMapHeaders.map((h) => (
					<div
						key={h}
						className="bg-gray-300 dark:bg-gray-700 text-center py-2"
					>
						{h}
					</div>
				))}
				{heatMapRows.map((row, i) => [
					<div
						key={row.label}
						className={`text-center py-2 font-semibold ${row.color} text-white`}
					>
						{row.label}
					</div>,
					...row.values.map((val, j) => (
						<div
							key={row.label + j}
							className={`text-center py-2 font-semibold ${
								row.color
							} ${i === 0 && j === 0 ? "rounded-bl-lg" : ""} ${
								i === heatMapRows.length - 1 &&
								j === heatMapHeaders.length - 1
									? "rounded-br-lg"
									: ""
							}`}
						>
							{val}
						</div>
					)),
				])}
			</div>
		</div>
	</div>
);

export default SecurityProfileCharts;
