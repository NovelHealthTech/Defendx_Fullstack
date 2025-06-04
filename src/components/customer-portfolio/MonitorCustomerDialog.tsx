import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import React from "react";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	monitorSearch: string;
	setMonitorSearch: (val: string) => void;
};

const MonitorCustomerDialog: React.FC<Props> = ({
	open,
	onOpenChange,
	monitorSearch,
	setMonitorSearch,
}) => (
	<Dialog open={open} onOpenChange={onOpenChange}>
		<DialogContent className="max-w-xl w-full bg-white dark:bg-zinc-900 p-0 rounded-lg">
			<DialogHeader className="flex flex-row items-center justify-between px-6 pt-6 pb-2 border-b border-zinc-200 dark:border-zinc-800">
				<DialogTitle>Monitor vendors</DialogTitle>
			</DialogHeader>
			<div className="px-6 pt-6 pb-2 flex flex-col gap-8">
				<div className="w-full">
					<div className="relative">
						<input
							placeholder="Search..."
							value={monitorSearch}
							onChange={(e) => setMonitorSearch(e.target.value)}
							className="pl-10 w-full h-10 rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
							aria-label="Search for vendor"
						/>
						<Search className="absolute left-3 top-2.5 w-5 h-5 text-blue-500" />
					</div>
				</div>
				<div className="flex flex-col items-center justify-center py-12">
					<div className="rounded-full bg-blue-50 dark:bg-zinc-800 p-4 mb-4">
						<Search className="w-10 h-10 text-blue-400 dark:text-blue-300" />
					</div>
					<div className="text-center">
						<div className="font-medium text-zinc-700 dark:text-zinc-200 mb-1">
							Search for a vendor
						</div>
						<div className="text-sm text-zinc-500 dark:text-zinc-400">
							Enter a company's name or URL to start your search.
						</div>
					</div>
				</div>
			</div>
			<DialogFooter className="flex flex-row items-center justify-end gap-2 px-6 pb-6 pt-2 border-t border-zinc-200 dark:border-zinc-800">
				<Button variant="ghost" onClick={() => onOpenChange(false)}>
					Cancel
				</Button>
				<Button disabled>Monitor</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
);

export default MonitorCustomerDialog;
