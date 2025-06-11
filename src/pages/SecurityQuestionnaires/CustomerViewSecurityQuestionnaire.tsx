import { useState, useRef } from "react";
import { List, ChevronRight, CheckCircle, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";

const dummySections = [
	{
		id: 1,
		title: "Inventory and Control of Enterprise Assets",
		description:
			"Actively manage (inventory, track, and correct) all enterprise assets (end-user devices, including portable and mobile; network devices; non-computing/Internet of Things (IoT) devices; and servers) connected to the infrastructure physically, virtually, remotely, and those within cloud environments, to accurately know the totality of assets that need to be monitored and protected within the enterprise. This will also support identifying unauthorized and unmanaged assets to remove or remediate.",
		questions: [
			{
				id: 1,
				number: "1.1",
				text: "Is there an asset management program approved by management, communicated to constituents and has an owner to maintain, review, and manage asset controls?",
				type: "single",
				options: ["Yes", "No", "N/A"],
			},
			{
				id: 2,
				number: "1.2",
				text: "Does your organization have a process to identify and address unauthorized assets on a weekly basis, using actions such as removing the asset, denying remote connections, or quarantining it?",
				type: "single",
				options: ["Yes", "No", "N/A"],
			},
		],
	},
	{
		id: 2,
		title: "Inventory and Control of Software Assets",
		questions: [
			{
				id: 3,
				number: "2.1",
				text: "Does the organization maintain a detailed inventory of all software assets?",
				type: "single",
				options: ["Yes", "No", "N/A"],
			},
			{
				id: 4,
				number: "2.2",
				text: "Does the organization ensure that only currently supported software is installed and can execute on enterprise assets?",
				type: "single",
				options: ["Yes", "No", "N/A"],
			},
			{
				id: 5,
				number: "2.3",
				text: "Is unauthorized software identified on enterprise assets?",
				type: "single",
				options: ["Yes", "No", "N/A"],
			},
		],
	},
	{
		id: 3,
		title: "Data Protection",
		questions: [
			{
				id: 6,
				number: "3.1",
				text: "Does your organization have a documented data management policy?",
				type: "single",
				options: ["Yes", "No", "N/A"],
			},
		],
	},
];

export default function CustomerViewSecurityQuestionnaire() {
	const [answers, setAnswers] = useState<{ [questionId: number]: string }>(
		{}
	);
	const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

	// Progress calculation
	const totalQuestions = dummySections.reduce(
		(sum, s) => sum + s.questions.length,
		0
	);
	const answered = Object.keys(answers).length;
	const percent = Math.round((answered / totalQuestions) * 100);

	const handleSidebarClick = (i: number) => {
		sectionRefs.current[i]?.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	};

	return (
		<div className="flex flex-col min-h-screen bg-muted">
			<div className="w-full px-4 py-6 border-b bg-white dark:bg-zinc-900 flex items-center justify-center relative">
				<h1 className="text-2xl sm:text-3xl font-bold text-center">
					CIS Critical Security Controls v8.1 - Implementation Group 3
				</h1>
				<div className="absolute right-4 top-1/2 -translate-y-1/2">
					<ThemeSwitcher />
				</div>
			</div>
			<div className="flex flex-1 min-h-0 pb-16">
				{/* Sidebar */}
				<aside className="w-80 min-w-[220px] max-w-xs bg-white dark:bg-zinc-900 border-r flex flex-col h-screen sticky top-0 overflow-y-auto">
					<div className="font-bold text-lg px-6 py-4 border-b">
						CONTENTS
					</div>
					<div className="px-4 py-2">
						<Button
							variant="ghost"
							size="sm"
							className="w-full justify-start mb-2"
						>
							<List className="w-4 h-4 mr-2" /> Filter
						</Button>
					</div>
					<nav className="flex-1 overflow-y-auto px-2">
						{dummySections.map((section, i) => (
							<div key={section.id}>
								<button
									className={`flex items-center w-full px-2 py-2 rounded-lg mb-1 transition hover:bg-muted`}
									onClick={() => handleSidebarClick(i)}
								>
									<span className="font-semibold flex-1 text-left text-sm">
										{i + 1} {section.title}
									</span>
									<span className="text-xs ml-2">
										{answers &&
											section.questions.filter(
												(q) => answers[q.id]
											).length}{" "}
										/ {section.questions.length}
									</span>
									<ChevronRight className="w-4 h-4 ml-1" />
								</button>
								<div className="ml-4">
									{section.questions.map((q) => (
										<div
											key={q.id}
											className="flex items-center gap-2 py-1"
										>
											<span className="text-xs text-muted-foreground">
												<List className="inline w-4 h-4 mr-1" />{" "}
												{q.number}
											</span>
											<span className="truncate text-xs">
												{q.text.slice(0, 40)}...
											</span>
											{answers[q.id] ? (
												<CheckCircle className="w-4 h-4 text-green-500" />
											) : (
												<Circle className="w-4 h-4 text-muted-foreground" />
											)}
										</div>
									))}
								</div>
							</div>
						))}
					</nav>
				</aside>
				{/* Main content */}
				<main className="flex-1 flex flex-col items-center bg-muted min-h-screen">
					<div className="w-full max-w-3xl px-4 py-8">
						{dummySections.map((section, i) => (
							<div
								key={section.id}
								ref={(el) => {
									sectionRefs.current[i] = el;
								}}
								className="mb-12 scroll-mt-24"
							>
								<div className="flex items-center gap-2 mb-6">
									<span className="text-2xl font-bold">
										{i + 1} {section.title}
									</span>
								</div>
								{section.description && (
									<div className="mb-6 text-muted-foreground text-sm">
										{section.description}
									</div>
								)}
								{section.questions.map((q) => (
									<div key={q.id} className="mb-8">
										<div className="flex items-center gap-2 mb-2">
											<span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded px-2 py-1 text-xs font-semibold flex items-center">
												<List className="inline w-4 h-4 mr-1" />{" "}
												{q.number}
											</span>
											<span className="font-medium text-base">
												{q.text}
											</span>
										</div>
										<div className="flex flex-col gap-2 mt-2">
											{q.options.map((opt, idx) => (
												<label
													key={idx}
													className="flex items-center gap-2 cursor-pointer"
												>
													<input
														type="radio"
														name={`q${q.id}`}
														value={opt}
														checked={
															answers[q.id] ===
															opt
														}
														onChange={() =>
															setAnswers((a) => ({
																...a,
																[q.id]: opt,
															}))
														}
														className="accent-blue-600 w-4 h-4"
													/>
													<span className="text-sm">
														{opt}
													</span>
												</label>
											))}
										</div>
									</div>
								))}
							</div>
						))}
					</div>
				</main>
			</div>
			{/* Progress bar */}
			<div className="fixed bottom-0 left-0 w-full z-20 bg-white/80 dark:bg-zinc-900/80 backdrop-blur border-t">
				<div className="max-w-3xl mx-auto p-4">
					<div className="flex items-center gap-2 text-xs mb-1">
						<span>{percent}% complete</span>
						<span className="ml-2">
							{answered} of {totalQuestions} answered
						</span>
					</div>
					<div className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
						<div
							className="h-2 bg-blue-600 rounded-full transition-all"
							style={{ width: `${percent}%` }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
