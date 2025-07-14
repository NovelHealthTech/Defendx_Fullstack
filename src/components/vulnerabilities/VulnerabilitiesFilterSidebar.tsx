import { useState } from "react";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetFooter,
} from "@/components/ui/sheet";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

export default function VulnerabilitiesFilterSidebar({
	open,
	onOpenChange,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}) {
	// Dummy state for all filters
	const [labelType, setLabelType] = useState("any");
	const [label, setLabel] = useState("");
	const [verifiedStatus, setVerifiedStatus] = useState<string[]>([
		"show_all",
	]);
	const [cveId, setCveId] = useState("");
	const [software, setSoftware] = useState("");
	const [cvss, setCvss] = useState<{
		critical: boolean;
		high: boolean;
		medium: boolean;
		low: boolean;
	}>({ critical: true, high: true, medium: true, low: true });
	const [epss, setEpss] = useState([0, 100]);

	// Handlers
	const handleCvssChange = (key: keyof typeof cvss) =>
		setCvss((prev) => ({ ...prev, [key]: !prev[key] }));
	const handleVerifiedStatusChange = (value: string) => {
		setVerifiedStatus((prev) =>
			prev.includes(value)
				? prev.filter((v) => v !== value)
				: [...prev, value]
		);
	};
	const handleReset = () => {
		setLabelType("any");
		setLabel("");
		setVerifiedStatus(["show_all"]);
		setCveId("");
		setSoftware("");
		setCvss({ critical: true, high: true, medium: true, low: true });
		setEpss([0, 100]);
	};

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent
				side="right"
				className="max-w-md w-full flex flex-col bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
			>
				<SheetHeader className="flex flex-row items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
					<SheetTitle>Filter by</SheetTitle>
				</SheetHeader>
				<div className="flex-1 overflow-y-auto px-6 py-4">
					<Accordion
						type="multiple"
						className="w-full"
						defaultValue={[]}
					>
						{/* Label */}
						<AccordionItem value="label">
							<AccordionTrigger>Label</AccordionTrigger>
							<AccordionContent>
								<RadioGroup
									value={labelType}
									onValueChange={setLabelType}
									className="mb-2"
								>
									<div className="flex flex-col gap-1">
										<label className="flex items-center gap-2 text-sm">
											<RadioGroupItem value="any" /> Match
											any
										</label>
										<label className="flex items-center gap-2 text-sm">
											<RadioGroupItem value="all" /> Match
											all
										</label>
										<label className="flex items-center gap-2 text-sm">
											<RadioGroupItem value="exclude" />{" "}
											Do not include
										</label>
									</div>
								</RadioGroup>
								<Input
									placeholder="Type to search labels"
									value={label}
									onChange={(e) => setLabel(e.target.value)}
								/>
							</AccordionContent>
						</AccordionItem>
						{/* Verified status */}
						<AccordionItem value="verified-status">
							<AccordionTrigger>Verified status</AccordionTrigger>
							<AccordionContent>
								<div className="flex flex-col gap-2">
									<label className="flex items-center gap-2 text-sm">
										<Checkbox
											checked={verifiedStatus.includes(
												"show_all"
											)}
											onCheckedChange={() =>
												handleVerifiedStatusChange(
													"show_all"
												)
											}
										/>{" "}
										Show all
									</label>
									<label className="flex items-center gap-2 text-sm">
										<Checkbox
											checked={verifiedStatus.includes(
												"verified"
											)}
											onCheckedChange={() =>
												handleVerifiedStatusChange(
													"verified"
												)
											}
										/>{" "}
										Verified vulnerabilities
									</label>
									<label className="flex items-center gap-2 text-sm">
										<Checkbox
											checked={verifiedStatus.includes(
												"unverified"
											)}
											onCheckedChange={() =>
												handleVerifiedStatusChange(
													"unverified"
												)
											}
										/>{" "}
										Unverified vulnerabilities
									</label>
									<label className="flex items-center gap-2 text-sm">
										<Checkbox
											checked={verifiedStatus.includes(
												"known_exploited"
											)}
											onCheckedChange={() =>
												handleVerifiedStatusChange(
													"known_exploited"
												)
											}
										/>{" "}
										Known exploited vulnerabilities
									</label>
								</div>
							</AccordionContent>
						</AccordionItem>
						{/* CVE ID */}
						<AccordionItem value="cve-id">
							<AccordionTrigger>CVE ID</AccordionTrigger>
							<AccordionContent>
								<Input
									placeholder="Type to search CVE IDs"
									value={cveId}
									onChange={(e) => setCveId(e.target.value)}
								/>
							</AccordionContent>
						</AccordionItem>
						{/* Software */}
						<AccordionItem value="software">
							<AccordionTrigger>Software</AccordionTrigger>
							<AccordionContent>
								<Input
									placeholder="Type to search software versions"
									value={software}
									onChange={(e) =>
										setSoftware(e.target.value)
									}
								/>
							</AccordionContent>
						</AccordionItem>
						{/* CVSS severity */}
						<AccordionItem value="cvss-severity">
							<AccordionTrigger>CVSS severity</AccordionTrigger>
							<AccordionContent>
								<div className="flex flex-col gap-2">
									<label className="flex items-center gap-2 text-sm text-red-600">
										<Checkbox
											checked={cvss.critical}
											onCheckedChange={() =>
												handleCvssChange("critical")
											}
										/>{" "}
										Critical
									</label>
									<label className="flex items-center gap-2 text-sm text-orange-500">
										<Checkbox
											checked={cvss.high}
											onCheckedChange={() =>
												handleCvssChange("high")
											}
										/>{" "}
										High
									</label>
									<label className="flex items-center gap-2 text-sm text-yellow-500">
										<Checkbox
											checked={cvss.medium}
											onCheckedChange={() =>
												handleCvssChange("medium")
											}
										/>{" "}
										Medium
									</label>
									<label className="flex items-center gap-2 text-sm text-blue-500">
										<Checkbox
											checked={cvss.low}
											onCheckedChange={() =>
												handleCvssChange("low")
											}
										/>{" "}
										Low
									</label>
								</div>
							</AccordionContent>
						</AccordionItem>
						{/* EPSS Score */}
						<AccordionItem value="epss-score">
							<AccordionTrigger>EPSS Score</AccordionTrigger>
							<AccordionContent>
								<div className="flex flex-col gap-2">
									<Slider
										min={0}
										max={100}
										value={epss}
										onValueChange={setEpss}
									/>
									<div className="flex justify-between text-xs text-muted-foreground">
										<span>Min: all</span>
										<span>Max: all</span>
									</div>
								</div>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
				<SheetFooter className="flex flex-row items-center justify-between gap-2 px-6 pb-6 pt-2 border-t border-zinc-200 dark:border-zinc-800">
					<button className="btn-outline w-1/2" onClick={handleReset}>
						Reset
					</button>
					<button
						className="btn-primary w-1/2"
						onClick={() => onOpenChange(false)}
					>
						Apply
					</button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
