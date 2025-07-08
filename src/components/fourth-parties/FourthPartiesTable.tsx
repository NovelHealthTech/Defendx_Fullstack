import { Pencil, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import FourthPartyDetailDrawer from "./FourthPartyDetailDrawer";
import { useNavigate } from "react-router";

// Placeholder data for demonstration
const fourthParties = [
	{
		id: 1,
		logo: "https://logo.clearbit.com/amazon.com",
		name: "Amazon",
		domain: "amazon.com",
		score: 839,
		grade: "A",
		products: 8,
	},
	{
		id: 2,
		logo: "https://logo.clearbit.com/cloudflare.com",
		name: "Cloudflare",
		domain: "cloudflare.com",
		score: 775,
		grade: "B",
		products: 4,
	},
	{
		id: 3,
		logo: "https://logo.clearbit.com/microsoft.com",
		name: "Microsoft",
		domain: "microsoft.com",
		score: 908,
		grade: "A",
		products: 3,
	},
	{
		id: 4,
		logo: "https://logo.clearbit.com/google.com",
		name: "Google",
		domain: "google.com",
		score: 672,
		grade: "B",
		products: 3,
	},
	{
		id: 5,
		logo: "https://logo.clearbit.com/nginx.org",
		name: "nginx",
		domain: "nginx.org",
		score: 656,
		grade: "B",
		products: 3,
	},
	{
		id: 6,
		logo: "https://logo.clearbit.com/digitalocean.com",
		name: "DigitalOcean",
		domain: "digitalocean.com",
		score: 579,
		grade: "C",
		products: 2,
	},
];

// Placeholder category data for 'View by category'
export const categories = [
	{
		name: "CDN",
		count: 10,
		vendors: [],
	},
	{
		name: "CMS",
		count: 5,
		vendors: [
			{
				id: 11,
				logo: "https://logo.clearbit.com/atlassian.com",
				name: "Atlassian",
				domain: "atlassian.com",
				score: 781,
				grade: "B",
				products: 1,
			},
			{
				id: 12,
				logo: "https://logo.clearbit.com/betterstack.com",
				name: "Better Stack",
				domain: "betterstack.com",
				score: 849,
				grade: "A",
				products: 1,
			},
			{
				id: 13,
				logo: "https://logo.clearbit.com/joomla.org",
				name: "Joomla!",
				domain: "joomla.org",
				score: 568,
				grade: "C",
				products: 2,
			},
			{
				id: 14,
				logo: "https://logo.clearbit.com/strapi.io",
				name: "Strapi",
				domain: "strapi.io",
				score: 795,
				grade: "B",
				products: 1,
			},
		],
	},
];

type Product = {
	name: string;
	description: string;
};

type Vendor = {
	name: string;
};

const getGradeColor = (grade: string) => {
	switch (grade) {
		case "A":
			return "bg-green-100 text-green-700 border-green-400 dark:bg-green-900/50 dark:text-green-300 dark:border-green-600";
		case "B":
			return "bg-yellow-100 text-yellow-700 border-yellow-400 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-600";
		case "C":
			return "bg-yellow-50 text-yellow-700 border-yellow-300 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-600";
		default:
			return "bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600";
	}
};

const demoProducts = [
	{
		name: "AWS CLOUDFRONT EDGE",
		description:
			"Content from this site is served from AWS CloudFront Denver, CO, United States. Edge locations may change frequently as we request resources globally.",
	},
	{
		name: "AMAZON CLOUDFRONT",
		description:
			"Amazon CloudFront is a fast content delivery network (CDN) service that securely delivers data, videos, applications, and APIs to customers globally with low latency, high transfer speeds.",
	},
	{
		name: "AMAZON S3",
		description:
			"Amazon S3 or Amazon Simple Storage Service is a service offered by Amazon Web Services (AWS) that provides object storage through a web service interface.",
	},
	{
		name: "CLOUDFRONT",
		description:
			"Amazon CloudFront is a web service for content delivery. It integrates with other Amazon Web Services to give developers and businesses an easy way to distribute content to end users with low latency, high data transfer speeds, and no commitments.",
	},
];

const FourthPartiesTable: React.FC = () => {
	const [viewBy, setViewBy] = useState<"party" | "category">("party");
	const [expandedCategory, setExpandedCategory] = useState<string | null>(
		null
	);
	const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
	const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
	const navigate = useNavigate();

	// Handlers
	const handleCategoryToggle = (name: string) => {
		setExpandedCategory(expandedCategory === name ? null : name);
	};

	return (
		<div className="bg-background rounded-xl shadow border border-border p-6 mt-6">
			{/* Header with title and radio group */}
			<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
				<h2 className="text-xl font-semibold text-foreground">
					Fourth Parties for Sportskeeda
				</h2>
				<div className="flex items-center gap-6">
					<label className="flex items-center cursor-pointer gap-2">
						<input
							type="radio"
							name="viewBy"
							value="party"
							checked={viewBy === "party"}
							onChange={() => setViewBy("party")}
							className="accent-primary w-4 h-4"
							aria-label="View by 4th party"
						/>
						<span className="text-foreground text-sm">
							View by 4th party
						</span>
					</label>
					<label className="flex items-center cursor-pointer gap-2">
						<input
							type="radio"
							name="viewBy"
							value="category"
							checked={viewBy === "category"}
							onChange={() => setViewBy("category")}
							className="accent-primary w-4 h-4"
							aria-label="View by category"
						/>
						<span className="text-foreground text-sm">
							View by category
						</span>
					</label>
				</div>
			</div>
			{/* Table */}
			<div className="overflow-x-auto rounded-lg">
				{viewBy === "party" ? (
					<table className="min-w-full divide-y divide-border">
						<thead className="bg-muted/50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
									4th party vendor
								</th>
								<th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
									Score
								</th>
								<th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
									<span className="flex items-center gap-1">
										# of products
										<ChevronDown className="w-4 h-4 text-muted-foreground" />
									</span>
								</th>
								<th className="px-6 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-border">
							{fourthParties.map((party) => (
								<tr
									key={party.domain}
									className="hover:bg-muted/50 group"
								>
									{/* Vendor */}
									<td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
										<img
											src={party.logo}
											alt={party.name + " logo"}
											className="w-9 h-9 rounded-full border border-border bg-background"
										/>
										<div>
											<div className="font-medium text-foreground">
												{party.name}
											</div>
											<div className="text-xs text-muted-foreground">
												{party.domain}
											</div>
										</div>
									</td>
									{/* Score */}
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center gap-2">
											<span
												className={`inline-flex items-center justify-center w-6 h-6 rounded-full border text-xs font-bold ${getGradeColor(
													party.grade
												)}`}
												aria-label={`Grade ${party.grade}`}
											>
												{party.grade}
											</span>
											<span className="text-foreground font-semibold text-base">
												{party.score}
											</span>
										</div>
									</td>
									{/* # of products */}
									<td className="px-6 py-4 whitespace-nowrap">
										<span className="text-foreground font-medium">
											{party.products}
										</span>
									</td>
									{/* Actions */}
									<td className="px-6 py-4 whitespace-nowrap flex justify-end gap-2">
										<button
											tabIndex={0}
											aria-label={`Edit ${party.name}`}
											className="p-2 rounded hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
											onClick={() =>
												navigate(
													`/fourth-parties/edit/${party.id}`
												)
											}
											onKeyDown={(e) => {
												if (
													e.key === "Enter" ||
													e.key === " "
												) {
													navigate(
														`/fourth-parties/edit/${party.id}`
													);
												}
											}}
										>
											<Pencil className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
										</button>
										<button
											tabIndex={0}
											aria-label={`View details for ${party.name}`}
											className="p-2 rounded hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
											onClick={() => {
												setSelectedVendor({
													name: party.name,
												});
												setSelectedProducts(
													demoProducts
												);
											}}
											onKeyDown={(e) => {
												if (
													e.key === "Enter" ||
													e.key === " "
												) {
													setSelectedVendor({
														name: party.name,
													});
													setSelectedProducts(
														demoProducts
													);
												}
											}}
										>
											<ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<table className="min-w-full divide-y divide-border">
						<thead className="bg-muted/50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
									Category / 4th party vendor
								</th>
								<th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
									Score
								</th>
								<th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
									# of products
								</th>
								<th className="px-6 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-border">
							{categories.map((cat) => (
								<React.Fragment key={cat.name}>
									{/* Category row */}
									<tr
										className="hover:bg-muted/50 cursor-pointer group"
										tabIndex={0}
										aria-label={`Toggle ${cat.name} category`}
										onClick={() =>
											handleCategoryToggle(cat.name)
										}
										onKeyDown={(e) => {
											if (
												e.key === "Enter" ||
												e.key === " "
											)
												handleCategoryToggle(cat.name);
										}}
									>
										<td className="px-6 py-4 whitespace-nowrap font-medium text-foreground flex items-center gap-2">
											<span>
												{cat.name}{" "}
												<span className="text-muted-foreground font-normal">
													({cat.count})
												</span>
											</span>
											{expandedCategory === cat.name ? (
												<ChevronUp className="w-4 h-4 text-muted-foreground" />
											) : (
												<ChevronDown className="w-4 h-4 text-muted-foreground" />
											)}
										</td>
										<td className="px-6 py-4"></td>
										<td className="px-6 py-4"></td>
										<td className="px-6 py-4"></td>
									</tr>
									{/* Vendor rows (only if expanded) */}
									{expandedCategory === cat.name &&
										cat.vendors.length > 0 &&
										cat.vendors.map((party) => (
											<tr
												key={party.domain}
												className="hover:bg-muted/50 group"
											>
												<td className="px-6 py-4 whitespace-nowrap flex items-center gap-3 pl-8">
													<img
														src={party.logo}
														alt={
															party.name + " logo"
														}
														className="w-9 h-9 rounded-full border border-border bg-background"
													/>
													<div>
														<div className="font-medium text-foreground">
															{party.name}
														</div>
														<div className="text-xs text-muted-foreground">
															{party.domain}
														</div>
													</div>
												</td>
												<td className="px-6 py-4 whitespace-nowrap">
													<div className="flex items-center gap-2">
														<span
															className={`inline-flex items-center justify-center w-6 h-6 rounded-full border text-xs font-bold ${getGradeColor(
																party.grade
															)}`}
															aria-label={`Grade ${party.grade}`}
														>
															{party.grade}
														</span>
														<span className="text-foreground font-semibold text-base">
															{party.score}
														</span>
													</div>
												</td>
												<td className="px-6 py-4 whitespace-nowrap">
													<span className="text-foreground font-medium">
														{party.products}
													</span>
												</td>
												<td className="px-6 py-4 whitespace-nowrap flex justify-end gap-2">
													<button
														tabIndex={0}
														aria-label={`Edit ${party.name}`}
														className="p-2 rounded hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
														onClick={() =>
															navigate(
																`/fourth-parties/edit/${party.id}`
															)
														}
														onKeyDown={(e) => {
															if (
																e.key ===
																	"Enter" ||
																e.key === " "
															) {
																navigate(
																	`/fourth-parties/edit/${party.id}`
																);
															}
														}}
													>
														<Pencil className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
													</button>
													<button
														tabIndex={0}
														aria-label={`View details for ${party.name}`}
														className="p-2 rounded hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
														onClick={() => {
															setSelectedVendor({
																name: party.name,
															});
															setSelectedProducts(
																demoProducts
															);
														}}
														onKeyDown={(e) => {
															if (
																e.key ===
																	"Enter" ||
																e.key === " "
															) {
																setSelectedVendor(
																	{
																		name: party.name,
																	}
																);
																setSelectedProducts(
																	demoProducts
																);
															}
														}}
													>
														<ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
													</button>
												</td>
											</tr>
										))}
								</React.Fragment>
							))}
						</tbody>
					</table>
				)}
			</div>
			{/* Drawer for details */}
			<FourthPartyDetailDrawer
				isOpen={!!selectedVendor}
				onClose={() => setSelectedVendor(null)}
				vendor={selectedVendor}
				products={selectedProducts}
			/>
		</div>
	);
};

export default FourthPartiesTable;
