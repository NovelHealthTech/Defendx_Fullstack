import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function CreateAssessmentDialog({
	open,
	onOpenChange,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}) {
	// Dummy in-progress assessment
	const inProgress = {
		name: "Security Profile Assessment",
		startedBy: "Started by",
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-md w-full bg-white dark:bg-zinc-900 p-0 rounded-lg">
				<DialogHeader className="px-6 pt-6 pb-2">
					<DialogTitle>
						Are you sure you want to create a new assessment?
					</DialogTitle>
				</DialogHeader>
				<div className="px-6 pb-2 flex flex-col gap-4">
					<div className="text-sm text-muted-foreground">
						You currently have 1 risk assessment in progress:
					</div>
					<div className="border rounded-lg p-4 flex flex-col gap-1 bg-muted/30 dark:bg-muted/10">
						<div className="font-medium">{inProgress.name}</div>
						<div className="text-xs text-muted-foreground">
							{inProgress.startedBy}
						</div>
					</div>
				</div>
				<div className="px-6 pb-6 pt-2 flex flex-row items-center justify-between gap-2 border-t border-zinc-200 dark:border-zinc-800">
					<Button
						variant="outline"
						className="flex-1"
						onClick={() => {
							/* handle create new assessment */
						}}
					>
						+ Create new assessment
					</Button>
					<Button
						className="flex-1"
						onClick={() => onOpenChange(false)}
					>
						Continue
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
