import { Info } from "lucide-react";

const tabs = [
	{ label: "The Latest Snapshot", active: true },
	{ label: "Trend" },
	{ label: "Attack Surface" },
	{ label: "Most Risky Assets" },
	{ label: "Most Critical Problems" },
];

const columns = [
	{
		title: "Safeguard",
		items: [
			{ grade: "info", label: "Digital Footprint" },
			{ grade: "F", label: "Patch Management", score: 44 },
			{ grade: "B", label: "Application Security", score: 83 },
			{ grade: "A", label: "CDN Security", score: 100 },
			{ grade: "A", label: "Website Security", score: 90 },
		],
	},
	{
		title: "Privacy",
		items: [
			{ grade: "A", label: "SSL/TLS Strength", score: 91 },
			{ grade: "B", label: "Credential Mgmt.", score: 89 },
			{ grade: "B", label: "Hacktivist Shares", score: 82 },
			{ grade: "A", label: "Social Network", score: 95 },
			{ grade: "C", label: "Information Disclosure", score: 78 },
		],
	},
	{
		title: "Resiliency",
		items: [
			{ grade: "A", label: "Attack Surface", score: 99 },
			{ grade: "B", label: "DNS Health", score: 90 },
			{ grade: "A", label: "Email Security", score: 95 },
			{ grade: "A", label: "DDoS Resiliency", score: 90 },
			{ grade: "A", label: "Network Security", score: 97 },
		],
	},
	{
		title: "Reputation",
		items: [
			{ grade: "A", label: "Brand Monitoring", score: 95 },
			{ grade: "A", label: "IP Reputation", score: 96 },
			{ grade: "A", label: "Fraudulent Apps", score: 100 },
			{ grade: "D", label: "Fraudulent Domains", score: 63 },
			{ grade: "B", label: "Web Ranking", score: 90 },
		],
	},
];

const gradeColors: Record<string, string> = {
	A: "bg-green-600 text-white",
	B: "bg-lime-500 text-white",
	C: "bg-yellow-400 text-white",
	D: "bg-orange-500 text-white",
	F: "bg-red-800 text-white",
	info: "bg-gray-400 text-white",
};

const SecurityProfileCategoryGrid = () => (
	<div className="w-full mt-8">
		{/* Tabs */}
		<div className="flex flex-wrap gap-2 mb-6">
			{tabs.map((tab) => (
				<button
					key={tab.label}
					className={`px-4 py-2 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring/50 transition-colors ${
						tab.active
							? "bg-gray-100 dark:bg-gray-800 text-foreground"
							: "bg-gray-50 dark:bg-gray-900 text-muted-foreground hover:bg-gray-200 dark:hover:bg-gray-800"
					}`}
					tabIndex={0}
					aria-current={tab.active ? "page" : undefined}
				>
					{tab.label === "Trend" && (
						<span className="inline-block align-middle mr-1">
							📈
						</span>
					)}
					{tab.label === "Attack Surface" && (
						<span className="inline-block align-middle mr-1">
							🛡️
						</span>
					)}
					{tab.label === "Most Risky Assets" && (
						<span className="inline-block align-middle mr-1">
							🧑‍💻
						</span>
					)}
					{tab.label === "Most Critical Problems" && (
						<span className="inline-block align-middle mr-1">
							⚫
						</span>
					)}
					{tab.label}
				</button>
			))}
		</div>
		{/* Columns */}
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			{columns.map((col) => (
				<div key={col.title}>
					<h3 className="text-center text-2xl font-medium mb-2">
						{col.title}
					</h3>
					<div className="border-t border-gray-300 dark:border-gray-700 mb-4" />
					<div className="flex flex-col gap-4">
						{col.items.map((item) => (
							<div
								key={item.label}
								className={`flex items-center gap-4 rounded-xl px-5 py-4 shadow-sm ${
									gradeColors[item.grade]
								}`}
								tabIndex={0}
								aria-label={`${item.label} grade ${item.grade}${
									item.score
										? ", score " + item.score + "%"
										: ""
								}`}
							>
								<div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20">
									{item.grade === "info" ? (
										<Info className="w-6 h-6 text-white opacity-80" />
									) : (
										<span className="text-xl font-bold">
											{item.grade}
										</span>
									)}
								</div>
								<div className="flex-1">
									<div className="text-lg font-medium leading-tight">
										{item.label}
									</div>
								</div>
								{item.score !== undefined && (
									<div className="text-lg font-bold ml-2 opacity-90">
										{item.score}%
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	</div>
);

export default SecurityProfileCategoryGrid;
