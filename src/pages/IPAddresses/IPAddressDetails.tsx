import { AlertCircle, ChevronRight, X, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DrawerSheet from "@/components/DrawerSheet";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import type { IPAddress, IPAddressDetail } from "@/lib/types";

interface IPAddressDetailsProps {
	isOpen: boolean;
	onClose: () => void;
	ipAddress: IPAddress | null;
	ipDetail?: IPAddressDetail | null;
	loading?: boolean;
}

const IPAddressDetails: React.FC<IPAddressDetailsProps> = ({
	isOpen,
	onClose,
	ipAddress,
	ipDetail,
	loading = false,
}) => {
	if (!ipAddress) {
		return null;
	}

	// Use detailed data if available, otherwise fall back to basic IP data
	const displayData = ipDetail || ipAddress;

	return (
		<DrawerSheet
			open={isOpen}
			onOpenChange={onClose}
			side="right"
			className="w-[550px] sm:min-w-[600px] p-0"
		>
			<div className="flex items-center justify-between p-4 bg-muted/20">
				<h2 className="text-2xl font-bold">{displayData.ip}</h2>
				<Button variant="ghost" size="icon" onClick={onClose}>
					<X className="h-5 w-5" />
				</Button>
			</div>

			<div className="p-6 space-y-8">
				{loading && (
					<div className="flex items-center justify-center py-4">
						<Loader2 className="w-6 h-6 animate-spin mr-2" />
						<span>Loading IP details...</span>
					</div>
				)}
				
				{/* IP Address Details */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold">
						IP address details
					</h3>
					<div className="space-y-2 text-sm">
						<DetailRow 
							label="Source" 
							value={
								<div className="flex flex-wrap gap-1">
									{(displayData.sources || []).map((source, i) => (
										<Badge key={i} variant="outline">
											{source}
										</Badge>
									))}
								</div>
							} 
						/>
						<DetailRow label="Owner" value={displayData.owner} />
						<DetailRow label="Country" value={displayData.country} />
						<DetailRow
							label="Autonomous System (AS)"
							value={displayData.as_name}
						/>
						<DetailRow label="ASN" value={`AS${displayData.asn}`} />
						{ipAddress.services && ipAddress.services.length > 0 && (
							<DetailRow
								label="Services"
								value={
									<div className="flex flex-wrap gap-1">
										{ipAddress.services.map((service, i) => (
											<Badge key={i} variant="outline">
												{service}
											</Badge>
										))}
									</div>
								}
							/>
						)}
					</div>
				</div>

				{/* Domains section - only show if we have detailed data */}
				{ipDetail && ipDetail.domains && ipDetail.domains.length > 0 && (
					<>
						<Separator />
						<div className="space-y-4">
							<h3 className="text-lg font-semibold">
								Associated Domains
							</h3>
							<div className="space-y-2">
								{ipDetail.domains.map((domain, index) => (
									<div key={index} className="flex items-center justify-between p-3 border rounded-lg">
										<div className="flex flex-col">
											<span className="font-medium">{domain.hostname}</span>
										</div>
										<div className="flex items-center gap-2">
											<Badge variant="secondary">
												Score: {domain.automated_score}
											</Badge>
											<ChevronRight className="w-4 h-4 text-muted-foreground" />
										</div>
									</div>
								))}
							</div>
						</div>
					</>
				)}

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
							relating to this IP, click on a domain above.
						</AlertDescription>
					</Alert>
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
