import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { FileText, FileSpreadsheet, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	exportFormat: "pdf" | "excel";
	setExportFormat: (format: "pdf" | "excel") => void;
	exportFrequency: "once" | "recurring";
	setExportFrequency: (freq: "once" | "recurring") => void;
	exportDelivery: "email" | "save";
	setExportDelivery: (delivery: "email" | "save") => void;
};

const ExportCustomersDialog: React.FC<Props> = ({
	open,
	onOpenChange,
	exportFormat,
	setExportFormat,
	exportFrequency,
	setExportFrequency,
	exportDelivery,
	setExportDelivery,
}) => (
	<Dialog open={open} onOpenChange={onOpenChange}>
		<DialogContent className="max-w-xl w-full bg-white dark:bg-zinc-900 p-0 rounded-lg">
			<DialogHeader className="flex flex-row items-center justify-between px-6 pt-6 pb-2 border-b border-zinc-200 dark:border-zinc-800">
				<DialogTitle>Export Customers</DialogTitle>
			</DialogHeader>
			<div className="px-6 pt-6 pb-2 flex flex-col gap-8">
				{/* Format */}
				<div>
					<div className="font-medium mb-1">Format</div>
					<div className="text-xs text-blue-700 dark:text-blue-400 mb-3">
						Select the export format
					</div>
					<div className="flex gap-4">
						<button
							type="button"
							className={`flex flex-col items-center justify-center border rounded-lg px-8 py-4 gap-2 w-40 transition-colors ${
								exportFormat === "pdf"
									? "border-blue-600 bg-blue-50 dark:bg-zinc-800"
									: "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
							} focus:outline-none`}
							onClick={() => setExportFormat("pdf")}
							aria-label="Export PDF"
						>
							<FileText
								className={`w-8 h-8 ${
									exportFormat === "pdf"
										? "text-blue-600"
										: "text-zinc-400 dark:text-zinc-500"
								}`}
							/>
							<span
								className={`font-medium ${
									exportFormat === "pdf"
										? "text-blue-700 dark:text-blue-400"
										: "text-zinc-700 dark:text-zinc-200"
								}`}
							>
								Export PDF
							</span>
						</button>
						<button
							type="button"
							className={`flex flex-col items-center justify-center border rounded-lg px-8 py-4 gap-2 w-40 transition-colors ${
								exportFormat === "excel"
									? "border-blue-600 bg-blue-50 dark:bg-zinc-800"
									: "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
							} focus:outline-none`}
							onClick={() => setExportFormat("excel")}
							aria-label="Export Excel"
						>
							<FileSpreadsheet
								className={`w-8 h-8 ${
									exportFormat === "excel"
										? "text-blue-600"
										: "text-zinc-400 dark:text-zinc-500"
								}`}
							/>
							<span
								className={`font-medium ${
									exportFormat === "excel"
										? "text-blue-700 dark:text-blue-400"
										: "text-zinc-700 dark:text-zinc-200"
								}`}
							>
								Export Excel
							</span>
						</button>
					</div>
				</div>
				<hr className="my-6 border-zinc-200 dark:border-zinc-800" />
				{/* Frequency */}
				<div className="flex flex-col gap-2">
					<div className="font-medium">Frequency</div>
					<div className="text-xs text-blue-700 dark:text-blue-400">
						How often do you want to receive this report?
					</div>
					<div className="flex gap-8 mt-2">
						<label className="flex items-center gap-2 cursor-pointer">
							<input
								type="radio"
								name="export-frequency"
								checked={exportFrequency === "once"}
								onChange={() => setExportFrequency("once")}
								className="accent-blue-600"
							/>
							<span>Export report once</span>
						</label>
						<label className="flex items-center gap-2 cursor-pointer">
							<input
								type="radio"
								name="export-frequency"
								checked={exportFrequency === "recurring"}
								onChange={() => setExportFrequency("recurring")}
								className="accent-blue-600"
							/>
							<span>Set up recurring report export</span>
						</label>
					</div>
				</div>
				<hr className="my-6 border-zinc-200 dark:border-zinc-800" />
				{/* Report delivery */}
				<div className="flex flex-col gap-2">
					<div className="font-medium">Report delivery</div>
					<div className="text-xs text-blue-700 dark:text-blue-400">
						How would you like to receive this report?
					</div>
					<div className="flex gap-8 mt-2">
						<label className="flex items-center gap-2 cursor-pointer">
							<input
								type="radio"
								name="export-delivery"
								checked={exportDelivery === "email"}
								onChange={() => setExportDelivery("email")}
								className="accent-blue-600"
							/>
							<span>
								Send report via email and save to reports
							</span>
						</label>
						<label className="flex items-center gap-2 cursor-pointer">
							<input
								type="radio"
								name="export-delivery"
								checked={exportDelivery === "save"}
								onChange={() => setExportDelivery("save")}
								className="accent-blue-600"
							/>
							<span>Save to reports only</span>
						</label>
					</div>
				</div>
			</div>
			<DialogFooter className="flex flex-row items-center justify-end gap-2 px-6 pb-6 pt-2 border-t border-zinc-200 dark:border-zinc-800">
				<Button variant="ghost" onClick={() => onOpenChange(false)}>
					Cancel
				</Button>
				<Button>
					<Download className="w-4 h-4 mr-2" /> Export
				</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
);

export default ExportCustomersDialog;
