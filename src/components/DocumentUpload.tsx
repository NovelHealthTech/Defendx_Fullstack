import { Upload, FileText, X } from "lucide-react";
import React, { useState, useCallback } from "react";
import { Button } from "./ui/button";

interface DocumentUploadProps {
	onFilesChange: (files: File[]) => void;
	uploadedFiles: File[];
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
	onFilesChange,
	uploadedFiles,
}) => {
	const [isDragging, setIsDragging] = useState(false);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const newFiles = Array.from(event.target.files);
			const allFiles = [...uploadedFiles, ...newFiles];
			onFilesChange(allFiles);
		}
	};

	const handleRemoveFile = (index: number) => {
		const newFiles = uploadedFiles.filter((_, i) => i !== index);
		onFilesChange(newFiles);
	};

	const getFilePreview = (file: File) => {
		if (file.type.startsWith("image/")) {
			return (
				<img
					src={URL.createObjectURL(file)}
					alt={file.name}
					className="w-10 h-10 object-cover rounded"
				/>
			);
		}
		return <FileText className="w-10 h-10 text-muted-foreground" />;
	};

	const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDrop = useCallback(
		(event: React.DragEvent<HTMLDivElement>) => {
			event.preventDefault();
			event.stopPropagation();
			setIsDragging(false);
			if (event.dataTransfer.files) {
				const newFiles = Array.from(event.dataTransfer.files);
				const allFiles = [...uploadedFiles, ...newFiles];
				onFilesChange(allFiles);
			}
		},
		[uploadedFiles, onFilesChange]
	);

	return (
		<div className="flex flex-col gap-4">
			{uploadedFiles.length > 0 && (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{uploadedFiles.map((file, index) => (
						<div
							key={index}
							className="flex items-center justify-between p-2 border rounded-md gap-2"
						>
							<div className="flex items-center gap-2 overflow-hidden">
								{getFilePreview(file)}
								<div className="flex flex-col overflow-hidden">
									<p className="font-medium text-sm truncate">
										{file.name}
									</p>
									<p className="text-xs text-muted-foreground">
										{(file.size / 1024).toFixed(2)} KB
									</p>
								</div>
							</div>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => handleRemoveFile(index)}
								className="text-muted-foreground hover:text-destructive flex-shrink-0"
							>
								<X size={16} />
							</Button>
						</div>
					))}
				</div>
			)}
			<div
				className={`mt-2 flex justify-center rounded-lg border border-dashed px-6 py-10 ${
					isDragging
						? "border-primary bg-primary-foreground/10"
						: "border-input"
				}`}
				onDrop={handleDrop}
				onDragOver={handleDragOver}
				onDragEnter={handleDragEnter}
				onDragLeave={handleDragLeave}
			>
				<div className="text-center">
					<Upload className="mx-auto size-12 text-muted-foreground" />
					<div className="mt-4 flex text-sm/6 text-muted-foreground">
						<label
							htmlFor="file-upload"
							className="relative cursor-pointer rounded-md font-semibold text-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:outline-none hover:text-primary/80"
						>
							<span>Upload a file</span>
							<input
								id="file-upload"
								name="file-upload"
								multiple
								type="file"
								className="sr-only"
								onChange={handleFileChange}
							/>
						</label>
						<p className="pl-1">or drag and drop</p>
					</div>
					<p className="text-xs/5 text-muted-foreground">
						Any file up to 10MB
					</p>
				</div>
			</div>
		</div>
	);
};

export default DocumentUpload;
