import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import {
	Tabs as ShadTabs,
	TabsList as ShadTabsList,
	TabsTrigger as ShadTabsTrigger,
	TabsContent as ShadTabsContent,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import React from "react";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	importTab: "manual" | "csv";
	setImportTab: (tab: "manual" | "csv") => void;
	importDomains: string;
	setImportDomains: (val: string) => void;
};

const ImportCustomersDialog: React.FC<Props> = ({
	open,
	onOpenChange,
	importTab,
	setImportTab,
	importDomains,
	setImportDomains,
}) => (
	<Dialog open={open} onOpenChange={onOpenChange}>
		<DialogContent className="max-w-lg w-full bg-white dark:bg-zinc-900 p-0 rounded-lg sm:max-w-lg mx-2">
			<DialogHeader className="flex flex-row items-center justify-between px-6 pt-6 pb-2 border-b border-zinc-200 dark:border-zinc-800">
				<DialogTitle>Import customers</DialogTitle>
			</DialogHeader>
			<div className="px-6 pt-6 pb-2 flex flex-col gap-6 w-full">
				<ShadTabs
					value={importTab}
					onValueChange={(v) => setImportTab(v as "manual" | "csv")}
					className="w-full"
				>
					<ShadTabsList className="w-full flex gap-2 bg-zinc-100 dark:bg-zinc-800 rounded-md p-1 mb-4">
						<ShadTabsTrigger value="manual" className="flex-1">
							Enter manually
						</ShadTabsTrigger>
						<ShadTabsTrigger value="csv" className="flex-1">
							Upload CSV
						</ShadTabsTrigger>
					</ShadTabsList>
					<ShadTabsContent value="manual" className="w-full">
						<div className="mb-2 font-medium">
							Enter a list of domains
						</div>
						<div className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">
							Manually enter or copy/paste a list of customer
							domains you'd like to import. Separate domains by a
							new line or a comma.
						</div>
						<div className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
							These customers will be added to your default
							portfolio, "Customers". You can set portfolios,
							tiers and labels for vendors by using the Upload CSV
							tab above.
						</div>
						<textarea
							className="w-full min-h-[100px] rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 p-3 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter domains here..."
							value={importDomains}
							onChange={(e) => setImportDomains(e.target.value)}
							aria-label="Enter domains"
						/>
					</ShadTabsContent>
					<ShadTabsContent value="csv" className="w-full">
						<div className="mb-2 font-medium">Upload CSV</div>
						<div className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">
							Upload a CSV file with customer domains. (Feature
							coming soon)
						</div>
						<input
							type="file"
							accept=".csv"
							disabled
							className="w-full"
						/>
					</ShadTabsContent>
				</ShadTabs>
			</div>
			<DialogFooter className="flex flex-row items-center justify-end gap-2 px-6 pb-6 pt-2 border-t border-zinc-200 dark:border-zinc-800">
				<Button variant="ghost" onClick={() => onOpenChange(false)}>
					Cancel
				</Button>
				<Button disabled={!importDomains.trim()}>
					Import customers
				</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
);

export default ImportCustomersDialog;
