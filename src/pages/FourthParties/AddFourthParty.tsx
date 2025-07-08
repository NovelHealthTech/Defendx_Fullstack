import SidebarLayout from "@/layouts/sidebar-layout";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import { useState, useEffect } from "react";
import { ArrowLeft, Plus, ArrowRight, Search, X } from "lucide-react";
import { useParams } from "react-router";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { categories } from "@/components/fourth-parties/FourthPartiesTable";

const vendors = [
	{
		logo: "https://logo.clearbit.com/amazon.com",
		name: "Amazon",
		domain: "amazon.com",
		score: 839,
		grade: "A",
		products: 8,
	},
	{
		logo: "https://logo.clearbit.com/cloudflare.com",
		name: "Cloudflare",
		domain: "cloudflare.com",
		score: 775,
		grade: "B",
		products: 4,
	},
	{
		logo: "https://logo.clearbit.com/microsoft.com",
		name: "Microsoft",
		domain: "microsoft.com",
		score: 908,
		grade: "A",
		products: 3,
	},
	{
		logo: "https://logo.clearbit.com/google.com",
		name: "Google",
		domain: "google.com",
		score: 672,
		grade: "B",
		products: 3,
	},
];

const products = [
	{ id: 1, name: "Nginx 1.11", category: "Web Server" },
	{ id: 2, name: "Nginx 1.12", category: "Web Server" },
	{ id: 3, name: "Nginx 1.13", category: "Web Server" },
	{ id: 4, name: "Nginx 1.14", category: "Web Server" },
	{ id: 5, name: "Nginx 1.15", category: "Web Server" },
];

const getGradeColor = (grade: string) => {
	switch (grade) {
		case "A":
			return "bg-green-100 text-green-700 border-green-400 dark:bg-green-900/50 dark:text-green-300 dark:border-green-600";
		case "B":
			return "bg-yellow-100 text-yellow-700 border-yellow-400 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-600";
		case "C":
			return "bg-yellow-50 text-yellow-700 border-yellow-300 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-600";
		default:
			return "bg-gray-100 text-gray-400 border-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:border-gray-600";
	}
};

const categoryOptions = [
	"Ads",
	"Analytics",
	"CDN",
	"CMS",
	"Framework",
	"Hosting provider",
	"Javascript library",
	"Link",
];

const steps = ["Select Vendor", "Select Products"];

export default function AddFourthParty() {
	const { id } = useParams();
	const isEdit = Boolean(id);
	const [searchTerm, setSearchTerm] = useState("");
	const [step, setStep] = useState<"search" | "products">("search");
	const [selectedVendor, setSelectedVendor] = useState<any>(null);
	const [productSearch, setProductSearch] = useState("");
	const [selectedProducts, setSelectedProducts] = useState<number[]>([4]);
	const [isAddProductOpen, setIsAddProductOpen] = useState(false);
	const [newProductName, setNewProductName] = useState("");
	const [newProductCategory, setNewProductCategory] = useState("");
	const [newProductDescription, setNewProductDescription] = useState("");

	const filteredVendors = vendors.filter(
		(v) =>
			v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			v.domain.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const filteredProducts = products.filter((p) =>
		p.name.toLowerCase().includes(productSearch.toLowerCase())
	);

	// Prefill for edit mode
	useEffect(() => {
		if (isEdit) {
			// Try to find vendor in both main and category data
			let vendor = vendors.find((v) => String(v.domain) === String(id));
			if (!vendor) {
				for (const cat of categories) {
					vendor = cat.vendors?.find(
						(v) => String(v.domain) === String(id)
					);
					if (vendor) break;
				}
			}
			if (vendor) {
				setSelectedVendor(vendor);
				setStep("products");
				// Optionally prefill selectedProducts if you have product data per vendor
				// setSelectedProducts([...]);
			}
		}
	}, [id, isEdit]);

	// Stepper UI
	const Stepper = (
		<div className="w-full flex justify-center mt-6 mb-8">
			<div className="flex w-full">
				{steps.map((s, i) => {
					const stepNumber = i + 1;
					const isCurrent =
						(step === "search" && i === 0) ||
						(step === "products" && i === 1);
					const isCompleted = step === "products" && i === 0;
					return (
						<div key={s} className="flex items-center w-full">
							<div
								className={`flex items-center p-2 rounded-l-md ${
									isCurrent
										? "bg-blue-100 dark:bg-blue-900/50"
										: ""
								} ${
									isCompleted
										? "bg-gray-100 dark:bg-gray-800"
										: ""
								} transition-colors duration-300`}
							>
								<div
									className={`flex items-center justify-center w-6 h-6 mr-2 text-xs border rounded-full shrink-0 ${
										isCurrent
											? "border-primary text-primary"
											: isCompleted
											? "bg-primary text-white border-primary"
											: "border-gray-400 dark:border-gray-500"
									}`}
								>
									{isCompleted ? "✓" : stepNumber}
								</div>
								<span
									className={`font-medium ${
										isCurrent
											? "text-primary"
											: isCompleted
											? "text-gray-800 dark:text-gray-200"
											: "text-gray-500 dark:text-gray-400"
									}`}
								>
									{s}
								</span>
							</div>
							<div
								className={`w-0 h-0 border-y-[24px] border-y-transparent border-l-[16px] ${
									isCurrent
										? "border-l-blue-100 dark:border-l-blue-900/50"
										: isCompleted
										? "border-l-gray-100 dark:border-l-gray-800"
										: "border-l-transparent"
								} transition-colors duration-300`}
							></div>
							<div
								className={`h-px flex-grow ${
									isCompleted
										? "bg-primary"
										: "bg-gray-200 dark:bg-gray-700"
								}`}
							></div>
							{i === steps.length - 1 && (
								<div
									className={`w-0 h-0 border-y-[24px] border-y-transparent border-l-[16px] border-l-transparent`}
								></div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);

	return (
		<SidebarLayout
			breadcrumbs={[
				{
					label: "Fourth Parties",
					href: "/fourth-parties",
				},
				{
					label: "Add Fourth Party",
					href: "/fourth-parties/add-fourth-party",
				},
			]}
		>
			<PageHeader title="Add a Fourth Party Vendor" actions={<></>} />
			{Stepper}
			<div className="w-full">
				<div className="bg-background rounded-2xl shadow border border-border p-8">
					{step === "search" && (
						<>
							{/* Header and subtitle */}
							<div className="mb-6">
								<h1 className="text-xl font-semibold text-foreground mb-1">
									{isEdit
										? "Edit Fourth Party"
										: "Add Fourth Party"}
								</h1>
								<p className="text-muted-foreground text-base">
									Search for a vendor to add it to
									Sportskeeda's fourth party list.
								</p>
							</div>
							{/* Search bar */}
							<div className="flex items-center w-full mb-6 relative">
								<span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
									<Search className="w-5 h-5" />
								</span>
								<input
									type="text"
									className="w-full pl-11 pr-11 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-base bg-background text-foreground shadow-sm"
									placeholder="Search by vendor name or domain..."
									value={searchTerm}
									onChange={(e) =>
										setSearchTerm(e.target.value)
									}
									aria-label="Search vendors"
								/>
								{searchTerm && (
									<button
										className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
										onClick={() => setSearchTerm("")}
										aria-label="Clear search"
									>
										<X className="w-5 h-5" />
									</button>
								)}
							</div>
							{/* Table */}
							<div className="overflow-x-auto rounded-xl border border-border bg-background">
								<table className="min-w-full divide-y divide-border">
									<thead className="bg-muted/50">
										<tr>
											<th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
												Customer
											</th>
											<th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
												Main website
											</th>
											<th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
												Score
											</th>
											<th className="px-6 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
												Action
											</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-border">
										{filteredVendors.length === 0 ? (
											<tr>
												<td
													colSpan={4}
													className="text-muted-foreground text-center py-8"
												>
													No vendors found.
												</td>
											</tr>
										) : (
											filteredVendors.map(
												(vendor, idx) => (
													<tr
														key={vendor.domain}
														className={
															`hover:bg-muted/50 transition-colors` +
															(idx % 2 === 1
																? " bg-muted/30"
																: "")
														}
													>
														<td className="px-6 py-4 whitespace-nowrap font-medium text-foreground">
															{vendor.name}
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
															{vendor.domain}
														</td>
														<td className="px-6 py-4 whitespace-nowrap">
															<div className="flex items-center gap-2">
																<span
																	className={`inline-flex items-center justify-center w-6 h-6 rounded-full border text-xs font-bold ${getGradeColor(
																		vendor.grade
																	)}`}
																	aria-label={`Grade ${vendor.grade}`}
																>
																	{
																		vendor.grade
																	}
																</span>
																<span className="text-foreground font-semibold text-base">
																	{vendor.score !==
																	null
																		? vendor.score
																		: "N/A"}
																</span>
															</div>
														</td>
														<td className="px-6 py-4 whitespace-nowrap flex justify-end">
															<Button
																variant="outline"
																className="border-primary text-primary hover:bg-primary/10 hover:border-primary flex items-center gap-2 px-4 py-2"
																onClick={() => {
																	setSelectedVendor(
																		vendor
																	);
																	setStep(
																		"products"
																	);
																}}
																aria-label={`Select ${vendor.name}`}
															>
																Select Vendor{" "}
																<ArrowRight className="w-4 h-4 ml-1" />
															</Button>
														</td>
													</tr>
												)
											)
										)}
									</tbody>
								</table>
							</div>
						</>
					)}
					{step === "products" && (
						<>
							{/* Title */}
							<div className="mb-6">
								<h1 className="text-xl font-semibold text-foreground mb-1">
									What products do 'Sportskeeda' use from{" "}
									{selectedVendor?.name}?
								</h1>
							</div>
							{/* Search and New Product */}
							<div className="flex items-center w-full mb-6 gap-4">
								<div className="relative flex-1">
									<span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
										<Search className="w-5 h-5" />
									</span>
									<input
										type="text"
										className="w-full pl-11 pr-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-base bg-background text-foreground shadow-sm"
										placeholder="Search..."
										value={productSearch}
										onChange={(e) =>
											setProductSearch(e.target.value)
										}
										aria-label="Search products"
									/>
								</div>
								<Button
									variant="outline"
									className="border-primary text-primary hover:bg-primary/10 hover:border-primary flex items-center gap-2 px-4 py-2"
									onClick={() => setIsAddProductOpen(true)}
								>
									<Plus className="w-4 h-4 mr-1" /> New
									Product
								</Button>
							</div>
							{/* Product Table */}
							<div className="overflow-x-auto rounded-xl border border-border bg-background">
								<table className="min-w-full divide-y divide-border">
									<thead className="bg-muted/50">
										<tr>
											<th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider w-12"></th>
											<th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
												Product
											</th>
											<th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
												Category
											</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-border">
										{filteredProducts.length === 0 ? (
											<tr>
												<td
													colSpan={3}
													className="text-muted-foreground text-center py-8"
												>
													No products found.
												</td>
											</tr>
										) : (
											filteredProducts.map(
												(product, idx) => {
													const checked =
														selectedProducts.includes(
															product.id
														);
													return (
														<tr
															key={product.id}
															className={
																`transition-colors cursor-pointer` +
																(checked
																	? " bg-primary/10"
																	: idx %
																			2 ===
																	  1
																	? " bg-muted/30"
																	: "")
															}
															onClick={() => {
																setSelectedProducts(
																	checked
																		? selectedProducts.filter(
																				(
																					id
																				) =>
																					id !==
																					product.id
																		  )
																		: [
																				...selectedProducts,
																				product.id,
																		  ]
																);
															}}
														>
															<td className="px-6 py-4 whitespace-nowrap">
																<Checkbox
																	checked={
																		checked
																	}
																	onCheckedChange={(
																		checkedValue
																	) => {
																		if (
																			checkedValue
																		) {
																			setSelectedProducts(
																				[
																					...selectedProducts,
																					product.id,
																				]
																			);
																		} else {
																			setSelectedProducts(
																				selectedProducts.filter(
																					(
																						id
																					) =>
																						id !==
																						product.id
																				)
																			);
																		}
																	}}
																	aria-label={`Select ${product.name}`}
																/>
															</td>
															<td className="px-6 py-4 whitespace-nowrap font-medium text-foreground">
																{product.name}
															</td>
															<td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
																{
																	product.category
																}
															</td>
														</tr>
													);
												}
											)
										)}
									</tbody>
								</table>
							</div>
							{/* Add Product Modal */}
							<Dialog
								open={isAddProductOpen}
								onOpenChange={setIsAddProductOpen}
							>
								<DialogContent className="max-w-lg w-full">
									<DialogHeader>
										<DialogTitle>
											Add a new product to{" "}
											{selectedVendor?.name}
										</DialogTitle>
										<DialogDescription>
											Enter the details of the product you
											want to add and and we'll add it to
											the fourth party vendor{" "}
											{selectedVendor?.name}
										</DialogDescription>
									</DialogHeader>
									<form
										onSubmit={(e) => {
											e.preventDefault();
											// Add product logic here
											setIsAddProductOpen(false);
											setNewProductName("");
											setNewProductCategory("");
											setNewProductDescription("");
										}}
										className="space-y-6 mt-4"
									>
										<div>
											<label className="block text-sm font-medium text-foreground mb-1">
												Enter product name
											</label>
											<Input
												placeholder="Enter product name"
												value={newProductName}
												onChange={(e) =>
													setNewProductName(
														e.target.value
													)
												}
												required
											/>
											<div className="text-xs text-muted-foreground mt-1">
												Enter a name for the product.
											</div>
										</div>
										<div>
											<label className="block text-sm font-medium text-foreground mb-1">
												Add a category
											</label>
											<Select
												value={newProductCategory}
												onValueChange={
													setNewProductCategory
												}
											>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Select..." />
												</SelectTrigger>
												<SelectContent>
													{categoryOptions.map(
														(option) => (
															<SelectItem
																key={option}
																value={option}
															>
																{option}
															</SelectItem>
														)
													)}
												</SelectContent>
											</Select>
											<div className="text-xs text-muted-foreground mt-1">
												Type to search for a category or
												enter your own.
											</div>
										</div>
										<div>
											<label className="block text-sm font-medium text-foreground mb-1">
												Add a description
											</label>
											<Textarea
												placeholder="Enter a description"
												value={newProductDescription}
												onChange={(e) =>
													setNewProductDescription(
														e.target.value
													)
												}
												rows={3}
											/>
											<div className="text-xs text-muted-foreground mt-1">
												Optionally, add a description
												for this product.
											</div>
										</div>
										<DialogFooter className="mt-6">
											<DialogClose asChild>
												<Button
													type="button"
													variant="ghost"
												>
													Cancel
												</Button>
											</DialogClose>
											<Button
												type="submit"
												disabled={
													!newProductName ||
													!newProductCategory
												}
											>
												+ Add Product
											</Button>
										</DialogFooter>
									</form>
								</DialogContent>
							</Dialog>
							{/* Footer */}
							<div className="flex items-center justify-between pt-8 mt-8 border-t border-border">
								<Button
									variant="outline"
									className="border-primary text-primary hover:bg-primary/10 hover:border-primary flex items-center gap-2 px-6 py-2"
									onClick={() => setStep("search")}
								>
									<ArrowLeft className="w-4 h-4 mr-1" />{" "}
									Previous
								</Button>
								<div className="flex items-center gap-4">
									<Button
										variant="ghost"
										type="button"
										onClick={() => {
											setStep("search");
											setSelectedVendor(null);
											setSelectedProducts([]);
										}}
									>
										Cancel
									</Button>
									<Button
										type="button"
										className="px-6"
										disabled={selectedProducts.length === 0}
										onClick={() => {
											// Save logic here
											// For now, just alert
											alert("Fourth party saved!");
										}}
									>
										{isEdit
											? "Save Changes"
											: "Save Fourth Party"}
									</Button>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</SidebarLayout>
	);
}
