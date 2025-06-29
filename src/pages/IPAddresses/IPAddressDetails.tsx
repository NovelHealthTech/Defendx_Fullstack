import { AlertCircle, ArrowRight, ChevronRight, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DrawerSheet from "@/components/DrawerSheet";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import type { IPAddress } from "@/lib/types";

interface IPAddressDetailsProps {
	isOpen: boolean;
	onClose: () => void;
	ipAddress: IPAddress | null;
}

const IPAddressDetails: React.FC<IPAddressDetailsProps> = ({
	isOpen,
	onClose,
	ipAddress,
}) => {
	if (!ipAddress) {
		return null;
	}

	return (
		<DrawerSheet
			open={isOpen}
			onOpenChange={onClose}
			side="right"
			className="w-[550px] sm:min-w-[600px] p-0"
		>
			<div className="flex items-center justify-between p-4 bg-muted/20">
				<h2 className="text-2xl font-bold">{ipAddress.ip}</h2>
				<Button variant="ghost" size="icon" onClick={onClose}>
					<X className="h-5 w-5" />
				</Button>
			</div>

			<div className="p-6 space-y-8">
				{/* IP Address Details */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold">
						IP address details
					</h3>
					<div className="space-y-2 text-sm">
						<DetailRow label="Source" value={ipAddress.source} />
						<DetailRow label="Owner" value={ipAddress.owner} />
						<DetailRow
							label="IP Range"
							value={
								<span className="flex items-center gap-2">
									{ipAddress.range.split(" - ")[0]}{" "}
									<ArrowRight className="h-4 w-4" />{" "}
									{ipAddress.range.split(" - ")[1]}
								</span>
							}
						/>
						<DetailRow label="Country" value={ipAddress.country} />
						<DetailRow
							label="Autonomous System (AS)"
							value={ipAddress.asnName2}
						/>
						<DetailRow label="ASN" value={ipAddress.asn} />
						<DetailRow
							label="Services"
							value={
								<Badge variant="outline">
									{ipAddress.protocol}
								</Badge>
							}
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

				<Separator />

				{/* IP Address Scorecard */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold">
						IP address scorecard
					</h3>
					<Alert className="bg-orange-50 border border-orange-200 text-orange-800">
						<AlertCircle className="h-4 w-4" />
						<AlertTitle className="text-orange-800">
							Heads up!
						</AlertTitle>
						<AlertDescription>
							This IP is sourced from DNS records, so it does not
							receive its own score. To view scoring and risks
							relating to this IP, click on a domain below.
						</AlertDescription>
					</Alert>
				</div>

				<Separator />

				{/* Domains */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold">Domains (1)</h3>
					<div className="rounded-lg border">
						<div className="flex items-center justify-between p-3">
							<a
								href="#"
								className="text-blue-600 hover:underline"
							>
								kaspersky.gvk.com
							</a>
							<div className="flex items-center gap-2">
								<Badge
									variant="outline"
									className="text-orange-500 border-orange-500"
								>
									D
								</Badge>
								<span className="font-semibold">399</span>
								<ChevronRight className="h-5 w-5 text-muted-foreground" />
							</div>
						</div>
					</div>
				</div>
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

export default IPAddressDetails;
