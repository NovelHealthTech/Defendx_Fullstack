import { ChevronRight, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DrawerSheet from "@/components/DrawerSheet";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import type { IPAddress, IPRange } from "@/lib/types";
import { IPAddresses as ipAddressesData } from "@/lib/DATA";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface IPRangeDetailsProps {
	isOpen: boolean;
	onClose: () => void;
	ipRange: IPRange | null;
}

const IPRangeDetails: React.FC<IPRangeDetailsProps> = ({
	isOpen,
	onClose,
	ipRange,
}) => {
	if (!ipRange) {
		return null;
	}

	const ipsInRange = ipAddressesData.filter(
		(ip: IPAddress) =>
			ip.range === `${ipRange.rangeStart} - ${ipRange.rangeEnd}`
	);

	const getScoreGrade = (score: number | undefined) => {
		if (score === undefined) return "N/A";
		if (score >= 900) return "A";
		if (score >= 800) return "B";
		if (score >= 700) return "C";
		if (score >= 600) return "D";
		return "F";
	};

	return (
		<DrawerSheet
			open={isOpen}
			onOpenChange={onClose}
			side="right"
			className="w-[650px] sm:min-w-[700px] p-0"
		>
			<div className="flex items-center justify-between p-4 bg-muted/20">
				<div className="flex flex-col">
					<h2 className="text-2xl font-bold">{ipRange.rangeStart}</h2>
					<h2 className="text-2xl font-bold">{ipRange.rangeEnd}</h2>
				</div>
				<Button variant="ghost" size="icon" onClick={onClose}>
					<X className="h-5 w-5" />
				</Button>
			</div>

			<div className="p-6 space-y-6">
				{/* IP Range Details */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold">IP range details</h3>
					<div className="space-y-2 text-sm">
						<DetailRow label="Owner" value={ipRange.owner} />
						<DetailRow
							label="Registrant Country"
							value={ipRange.country}
						/>
						<DetailRow
							label="Autonomous System (AS)"
							value={ipRange.autonomousSystem}
						/>
						<DetailRow
							label="ASN"
							value={ipRange.autonomousSystemNumber}
						/>
						<DetailRow
							label="IPs in Range"
							value={ipRange.ipCount * 2} // As per screenshot
						/>
						<DetailRow
							label="Labels"
							value={
								<Button
									variant="outline"
									size="sm"
									className="border-dashed text-muted-foreground"
								>
									<Plus className="w-3 h-3 mr-1" /> Add label
								</Button>
							}
						/>
					</div>
				</div>

				<Tabs defaultValue="ip-addresses" className="w-full">
					<TabsList>
						<TabsTrigger value="ip-addresses">
							IP addresses ({ipsInRange.length})
						</TabsTrigger>
						<TabsTrigger value="domains">Domains (1)</TabsTrigger>
					</TabsList>
					<TabsContent value="ip-addresses" className="space-y-2">
						{ipsInRange.map((ip: IPAddress) => (
							<div
								key={ip.ip}
								className="flex items-center justify-between p-2 border-b last:border-0"
							>
								<div className="flex items-center gap-4">
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger asChild>
												<span className="font-mono hover:underline cursor-pointer">
													{ip.ip}
												</span>
											</TooltipTrigger>
											<TooltipContent>
												<p>
													This IP address presented an
													SSL certificate for...
												</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>

									<div className="flex flex-wrap gap-1">
										{ip.labels.map(
											(label: string, i: number) => (
												<Badge
													key={i}
													variant={
														label === "Certificate"
															? "destructive"
															: "default"
													}
													className={
														label === "Owned Range"
															? "bg-green-100 text-green-800"
															: ""
													}
												>
													{label}
												</Badge>
											)
										)}
									</div>
								</div>
								<div className="flex items-center gap-2">
									<div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-800 font-bold text-sm">
										{getScoreGrade(ip.score)}
									</div>
									<span className="font-semibold">
										{ip.score}
									</span>
									<ChevronRight className="h-5 w-5 text-muted-foreground" />
								</div>
							</div>
						))}
					</TabsContent>
					<TabsContent value="domains">
						<div className="text-center py-8 text-muted-foreground">
							No domains to show.
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</DrawerSheet>
	);
};

const DetailRow = ({
	label,
	value,
}: {
	label: string;
	value: React.ReactNode;
}) => (
	<div className="flex justify-between items-center py-2 border-b last:border-0">
		<span className="text-muted-foreground">{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

export default IPRangeDetails;
