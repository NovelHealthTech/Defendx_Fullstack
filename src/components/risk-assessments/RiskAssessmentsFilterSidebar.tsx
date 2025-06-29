import React from "react";
import DrawerSheet from "@/components/DrawerSheet";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RiskAssessmentsFilterSidebar({
	open,
	onOpenChange,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}) {
	// Dummy state for filter fields
	const [scope, setScope] = React.useState("");
	const [author, setAuthor] = React.useState("");
	const [datePublished, setDatePublished] = React.useState("");
	const [reassessmentDate, setReassessmentDate] = React.useState("");
	const [status, setStatus] = React.useState<string[]>([]);

	return (
		<DrawerSheet
			open={open}
			onOpenChange={onOpenChange}
			className="w-[350px] sm:min-w-[400px]"
			side="right"
			title="Filter by"
		>
			<Accordion type="multiple" className="w-full" defaultValue={[]}>
				<AccordionItem value="scope">
					<AccordionTrigger>Scope</AccordionTrigger>
					<AccordionContent>
						<Input
							placeholder="Type to search scope"
							value={scope}
							onChange={(e) => setScope(e.target.value)}
						/>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="author">
					<AccordionTrigger>Author</AccordionTrigger>
					<AccordionContent>
						<Input
							placeholder="Type to search author"
							value={author}
							onChange={(e) => setAuthor(e.target.value)}
						/>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="date-published">
					<AccordionTrigger>Date published</AccordionTrigger>
					<AccordionContent>
						<Input
							type="date"
							value={datePublished}
							onChange={(e) => setDatePublished(e.target.value)}
						/>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="reassessment-date">
					<AccordionTrigger>Reassessment date</AccordionTrigger>
					<AccordionContent>
						<Input
							type="date"
							value={reassessmentDate}
							onChange={(e) =>
								setReassessmentDate(e.target.value)
							}
						/>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="status">
					<AccordionTrigger>Assessment status</AccordionTrigger>
					<AccordionContent>
						<div className="flex flex-col gap-2">
							{["In progress", "Completed", "Waived"].map((s) => (
								<label
									key={s}
									className="flex items-center gap-2 text-sm"
								>
									<input
										type="checkbox"
										checked={status.includes(s)}
										onChange={(e) => {
											if (e.target.checked)
												setStatus([...status, s]);
											else
												setStatus(
													status.filter(
														(val) => val !== s
													)
												);
										}}
									/>
									{s}
								</label>
							))}
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
			<div className="flex justify-between gap-2 mt-8">
				<Button
					variant="outline"
					className="flex-1"
					onClick={() => {
						setScope("");
						setAuthor("");
						setDatePublished("");
						setReassessmentDate("");
						setStatus([]);
					}}
				>
					Reset
				</Button>
				<Button className="flex-1" onClick={() => onOpenChange(false)}>
					Apply
				</Button>
			</div>
		</DrawerSheet>
	);
}
