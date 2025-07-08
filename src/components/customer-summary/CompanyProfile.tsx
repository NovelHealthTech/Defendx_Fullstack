import { PenBoxIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";

const customer = {
	name: "Adani Group",
	domain: "adani.com",
	industry: "Asphalt Products Manufacturing",
	rating: 794,
	ratingGrade: "B",
	ratingMax: 950,
	employees: 29200,
	headquarters: "Ahmedabad, GJ",
};

function CompanyProfile() {
	return (
		<Card>
			<CardHeader className="flex flex-row items-start">
				<div className="grid gap-0.5">
					<CardTitle className="group flex items-center gap-2 text-lg">
						Company Profile
					</CardTitle>
					<CardDescription>
						Last Updated: 22 May, 2025
					</CardDescription>
				</div>
				<div className="ml-auto flex items-center gap-1">
					<Button size="sm" variant="outline" className="h-8 gap-1">
						<PenBoxIcon className="h-3.5 w-3.5" />
						<span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
							Edit
						</span>
					</Button>
				</div>
			</CardHeader>

			<CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
				<div className="grid gap-3">
					<ul className="grid gap-3">
						<li className="flex items-center justify-between">
							<span className="text-muted-foreground">Name</span>
							<span>{customer.name}</span>
						</li>
						<li className="flex items-center justify-between">
							<span className="text-muted-foreground">
								Primary domain
							</span>
							<span>{customer.domain}</span>
						</li>
						<li className="flex items-center justify-between">
							<span className="text-muted-foreground">
								Industry
							</span>
							<span>{customer.industry}</span>
						</li>
						<li className="flex items-center justify-between">
							<span className="text-muted-foreground">
								Overall security rating
							</span>

							<Badge variant="outline">
								{customer.ratingGrade} {customer.rating}
							</Badge>
						</li>
					</ul>
				</div>
				<div className="grid gap-3">
					<ul className="grid gap-3">
						<li className="flex items-center justify-between">
							<span className="text-muted-foreground">
								Employees
							</span>
							<span>{customer.employees}</span>
						</li>
						<li className="flex items-center justify-between">
							<span className="text-muted-foreground">
								Headquarters
							</span>
							<span>{customer.headquarters}</span>
						</li>
						<li className="flex items-center justify-between">
							<span className="text-muted-foreground">
								Contract end date
							</span>
							<span>-</span>
						</li>
						<li className="flex items-center justify-between">
							<span className="text-muted-foreground">
								Internal owner
							</span>

							<span>-</span>
						</li>
					</ul>
				</div>
			</CardContent>
		</Card>
	);
}

export default CompanyProfile;
