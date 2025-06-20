import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { SettingsIcon } from "lucide-react";

export default function SecurityProfileDomainsAndIps() {
	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle>Domains and IPs (159/160)</CardTitle>
					<Button variant="ghost" size="icon">
						<SettingsIcon className="w-4 h-4" />
					</Button>
				</div>
			</CardHeader>
			<CardContent className="text-sm">
				<ul className="list-inside">
					<li>
						<a href="#" target="_blank" rel="noopener noreferrer">
							google.com
						</a>
					</li>
					<li>
						<a href="#" target="_blank" rel="noopener noreferrer">
							adani.in
						</a>
					</li>
					<li>
						<a href="#" target="_blank" rel="noopener noreferrer">
							email.adani.com
						</a>
					</li>
				</ul>
			</CardContent>
		</Card>
	);
}
