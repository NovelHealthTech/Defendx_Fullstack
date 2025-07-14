import { useState, useEffect } from "react";
import { usePageLoading, useApiLoading } from "@/contexts/LoadingContext";
import { Loader, InlineLoader, TableLoader } from "@/components/ui/loader";
import { Button } from "@/components/ui/button";

// Example of how to use different loader types
export default function ExampleLoaderPage() {
	const { showPageLoader, hidePageLoader } = usePageLoading();
	const { showApiLoader, hideApiLoader } = useApiLoading();
	const [localLoading, setLocalLoading] = useState(false);
	const [tableLoading, setTableLoading] = useState(false);
	const [buttonLoading, setButtonLoading] = useState(false);
	const [data, setData] = useState<string[]>([]);

	// Example: Page-level loading on mount
	useEffect(() => {
		const loadInitialData = async () => {
			showPageLoader("Loading page...");
			try {
				// Simulate API call
				await new Promise(resolve => setTimeout(resolve, 2000));
				setData(["Item 1", "Item 2", "Item 3"]);
			} finally {
				hidePageLoader();
			}
		};

		loadInitialData();
	}, [showPageLoader, hidePageLoader]);

	// Example: Global API loading
	const handleGlobalApiCall = async () => {
		showApiLoader("Processing request...");
		try {
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 2000));
			alert("Success!");
		} finally {
			hideApiLoader();
		}
	};

	// Example: Local component loading
	const handleLocalOperation = async () => {
		setLocalLoading(true);
		try {
			// Simulate operation
			await new Promise(resolve => setTimeout(resolve, 1500));
			alert("Local operation complete!");
		} finally {
			setLocalLoading(false);
		}
	};

	// Example: Table loading
	const refreshTable = async () => {
		setTableLoading(true);
		try {
			// Simulate table refresh
			await new Promise(resolve => setTimeout(resolve, 1000));
			setData(prev => [...prev, `New Item ${prev.length + 1}`]);
		} finally {
			setTableLoading(false);
		}
	};

	// Example: Button loading
	const handleButtonAction = async () => {
		setButtonLoading(true);
		try {
			// Simulate button action
			await new Promise(resolve => setTimeout(resolve, 1000));
			alert("Button action complete!");
		} finally {
			setButtonLoading(false);
		}
	};

	return (
		<div className="p-6 space-y-8">
			<h1 className="text-2xl font-bold">Loader Examples</h1>

			{/* Global API Loading Example */}
			<div className="space-y-2">
				<h2 className="text-lg font-semibold">Global API Loading</h2>
				<Button onClick={handleGlobalApiCall}>
					Trigger Global API Loading
				</Button>
				<p className="text-sm text-muted-foreground">
					This will show a fullscreen loader
				</p>
			</div>

			{/* Local Component Loading Example */}
			<div className="space-y-2">
				<h2 className="text-lg font-semibold">Local Component Loading</h2>
				<div className="border rounded-lg p-4 min-h-[100px] relative">
					{localLoading ? (
						<Loader variant="overlay" text="Processing..." />
					) : (
						<div>
							<p>This is some content</p>
							<Button onClick={handleLocalOperation} className="mt-2">
								Start Local Operation
							</Button>
						</div>
					)}
				</div>
			</div>

			{/* Table Loading Example */}
			<div className="space-y-2">
				<h2 className="text-lg font-semibold">Table Loading</h2>
				<Button onClick={refreshTable} disabled={tableLoading}>
					Refresh Table
				</Button>
				<div className="border rounded-lg">
					{tableLoading ? (
						<div className="p-4">
							<TableLoader rows={3} />
						</div>
					) : (
						<div className="p-4">
							<table className="w-full">
								<thead>
									<tr className="border-b">
										<th className="text-left py-2">Items</th>
									</tr>
								</thead>
								<tbody>
									{data.map((item, index) => (
										<tr key={index} className="border-b">
											<td className="py-2">{item}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</div>
			</div>

			{/* Button Loading Example */}
			<div className="space-y-2">
				<h2 className="text-lg font-semibold">Button Loading</h2>
				<Button onClick={handleButtonAction} disabled={buttonLoading}>
					{buttonLoading && <InlineLoader className="mr-2" />}
					{buttonLoading ? "Processing..." : "Click Me"}
				</Button>
			</div>

			{/* Various Loader Variants */}
			<div className="space-y-4">
				<h2 className="text-lg font-semibold">Loader Variants</h2>
				
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="border rounded-lg p-4">
						<h3 className="font-medium mb-2">Default Loader</h3>
						<Loader text="Loading..." />
					</div>
					
					<div className="border rounded-lg p-4">
						<h3 className="font-medium mb-2">Large Loader</h3>
						<Loader text="Processing..." size="lg" />
					</div>
					
					<div className="border rounded-lg p-4">
						<h3 className="font-medium mb-2">Inline Loaders</h3>
						<div className="space-y-2">
							<div>Small: <InlineLoader size="sm" /></div>
							<div>Medium: <InlineLoader size="md" /></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
