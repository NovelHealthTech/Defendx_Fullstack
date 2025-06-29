import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { SettingsIcon } from "lucide-react";

export default function SecurityProfileEvidence() {
	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle>Evidence (4/10)</CardTitle>
					<Button variant="ghost" size="icon">
						<SettingsIcon className="w-4 h-4" />
					</Button>
				</div>
				<CardDescription>Last analysis: 2024-01-01</CardDescription>
			</CardHeader>
			<CardContent className="text-sm">
				Add and scan security documentation for this customer to see
				gaps in their security program.
			</CardContent>
		</Card>
	);
}
