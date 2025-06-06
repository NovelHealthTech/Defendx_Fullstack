import { useRef, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type ImportQuestionnaireDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onNext?: (file: File) => void;
};

const ImportQuestionnaireDialog = ({
	open,
	onOpenChange,
	onNext,
}: ImportQuestionnaireDialogProps) => {
	const [importFile, setImportFile] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			const file = e.dataTransfer.files[0];
			if (file.name.endsWith(".xlsx")) setImportFile(file);
		}
	};
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];
			if (file.name.endsWith(".xlsx")) setImportFile(file);
		}
	};
	const handleNext = () => {
		if (importFile && onNext) onNext(importFile);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-lg w-full bg-white dark:bg-zinc-900 p-0 rounded-lg">
				<DialogHeader className="px-6 pt-6 pb-2">
					<DialogTitle>Import a questionnaire</DialogTitle>
				</DialogHeader>
				<div className="px-6 pb-2 flex flex-col gap-4">
					<div className="text-sm text-muted-foreground mb-2">
						Upload an existing questionnaire to use as a template
					</div>
					<div
						className="border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-lg flex flex-col items-center justify-center py-8 cursor-pointer transition hover:border-blue-500 bg-zinc-50 dark:bg-zinc-800 text-center"
						onClick={() => fileInputRef.current?.click()}
						onDrop={handleDrop}
						onDragOver={(e) => e.preventDefault()}
						tabIndex={0}
						aria-label="Upload questionnaire"
					>
						<input
							ref={fileInputRef}
							type="file"
							accept=".xlsx"
							className="hidden"
							onChange={handleFileChange}
						/>
						<span className="text-blue-700 dark:text-blue-400 font-medium cursor-pointer">
							Click to upload
						</span>
						<span className="mx-1">or drag and drop here</span>
						<div className="text-xs text-muted-foreground mt-2">
							.xlsx files accepted only
						</div>
						{importFile && (
							<div className="mt-2 text-xs text-green-600 dark:text-green-400">
								Selected: {importFile.name}
							</div>
						)}
					</div>
				</div>
				<DialogFooter className="flex flex-row items-center justify-end gap-2 px-6 pb-6 pt-2 border-t border-zinc-200 dark:border-zinc-800">
					<Button variant="ghost" onClick={() => onOpenChange(false)}>
						Cancel
					</Button>
					<Button disabled={!importFile} onClick={handleNext}>
						Next
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ImportQuestionnaireDialog;
