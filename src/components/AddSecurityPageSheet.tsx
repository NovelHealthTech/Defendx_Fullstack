import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";

import { useState, useEffect } from "react";
import Editor from "react-simple-wysiwyg";

const AddSecurityPageSheet = ({
	open,
	onOpenChange,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}) => {
	const [category, setCategory] = useState("security");
	const [url, setUrl] = useState("");
	const [comments, setComments] = useState("");
	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		const isDarkMode =
			typeof window !== "undefined" &&
			document.documentElement.classList.contains("dark");
		setDarkMode(isDarkMode);
	}, []);

	const handleSaveChanges = () => {
		console.log({ category, url, comments });
		onOpenChange(false);
	};

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent
				side="bottom"
				className="h-screen flex flex-col max-w-5xl mx-auto"
			>
				<SheetHeader className="px-6 pt-6">
					<SheetTitle>Security and privacy pages</SheetTitle>
				</SheetHeader>

				<div className="px-6 pt-4 pb-2 border-b">
					<div className="flex justify-between items-center">
						<h3 className="text-lg font-semibold">Add page</h3>
						<div className="flex gap-2">
							<Button
								variant="outline"
								onClick={() => onOpenChange(false)}
							>
								Cancel
							</Button>
							<Button onClick={handleSaveChanges}>
								Save changes
							</Button>
						</div>
					</div>
				</div>

				<div className="flex-grow p-6 overflow-y-auto">
					<div className="space-y-6">
						<div className="grid grid-cols-6 items-center gap-4">
							<Label
								htmlFor="page-category"
								className="text-right col-span-1"
							>
								Page category
							</Label>
							<div className="col-span-3">
								<Select
									value={category}
									onValueChange={setCategory}
								>
									<SelectTrigger id="page-category">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="security">
											Security
										</SelectItem>
										<SelectItem value="privacy">
											Privacy
										</SelectItem>
										<SelectItem value="legal">
											Legal
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
						<div className="grid grid-cols-6 items-center gap-4">
							<Label
								htmlFor="url"
								className="text-right col-span-1"
							>
								URL
							</Label>
							<div className="col-span-5">
								<Input
									id="url"
									placeholder="Enter a URL"
									value={url}
									onChange={(e) => setUrl(e.target.value)}
								/>
								<p className="text-sm text-muted-foreground mt-1">
									E.g. https://www.example.com/security
								</p>
							</div>
						</div>
						<div className="grid grid-cols-6 items-start gap-4">
							<Label
								htmlFor="comments"
								className="text-right col-span-1 pt-2"
							>
								Comments
							</Label>
							<div className="col-span-5">
								<Editor
									value={comments}
									onChange={(e) =>
										setComments(e.target.value)
									}
									placeholder="Record your notes and observations about this page"
									containerProps={{
										style: {
											background: darkMode
												? "#18181b"
												: "#fff",
											color: darkMode
												? "#fff"
												: "#18181b",
											border: "1px solid hsl(var(--border))",
											borderRadius: "var(--radius)",
										},
										className: darkMode
											? "rsw-editor dark"
											: "rsw-editor",
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default AddSecurityPageSheet;
