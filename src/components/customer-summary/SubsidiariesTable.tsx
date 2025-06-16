import { Building2, Globe, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

const subsidiaries = [
	{ name: "ACC Limited", website: "acclimited.com", score: 754, grade: "B" },
	{
		name: "Adani Capital",
		website: "adanicapital.in",
		score: 683,
		grade: "B",
	},
	{
		name: "Adani Energy Solutions Limited",
		website: "adanienergysolutions.com",
		score: 596,
		grade: "C",
	},
	{
		name: "Adani Enterprises Limited",
		website: "adanienterprises.com",
		score: 754,
		grade: "B",
	},
	{
		name: "Adani Foundation",
		website: "adanifoundation.org",
		score: 796,
		grade: "B",
	},
];

function SubsidiariesTable() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Building2 className="w-5 h-5 text-muted-foreground" />{" "}
					Subsidiaries
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="overflow-x-auto">
					<table className="min-w-full text-sm">
						<thead>
							<tr className="text-muted-foreground">
								<th className="text-left py-2 px-4 flex items-center gap-1">
									<Building2 className="w-4 h-4" /> Customer
								</th>
								<th className="text-left py-2 px-4">
									<Globe className="w-4 h-4 inline" /> Website
								</th>
								<th className="text-left py-2 px-4">
									<ShieldCheck className="w-4 h-4 inline" />{" "}
									Score
								</th>
							</tr>
						</thead>
						<tbody className="text-sm">
							{subsidiaries.map((sub) => (
								<tr
									key={sub.name}
									className="border-b last:border-0"
								>
									<td className="py-2 px-4 flex items-center gap-1">
										<Building2 className="w-4 h-4 text-muted-foreground" />
										{sub.name}
									</td>
									<td className="py-2 px-4">{sub.website}</td>
									<td className="py-2 px-4">
										<Badge
											variant="outline"
											className={
												sub.grade === "C"
													? "border-yellow-500 text-yellow-600"
													: "border-green-500 text-green-600"
											}
										>
											{sub.grade} {sub.score}
										</Badge>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</CardContent>
		</Card>
	);
}

export default SubsidiariesTable;
