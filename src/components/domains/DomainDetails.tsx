import React from "react";
import { ChevronRight, Download, Info, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DrawerSheet from "@/components/DrawerSheet";
import { Separator } from "@/components/ui/separator";
import type { Domain } from "@/lib/types";
import CustomAccordion from "../CustomAccordion";

interface DomainDetailsProps {
	isOpen: boolean;
	onClose: () => void;
	domain: Domain | null;
}

const RiskIcon = () => (
	<div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
		!!
	</div>
);

export default function DomainDetails({
	isOpen,
	onClose,
	domain,
}: DomainDetailsProps) {
	if (!domain) {
		return null;
	}

	return (
		<DrawerSheet
			open={isOpen}
			onOpenChange={(open) => {
				if (!open) {
					onClose();
				}
			}}
			side="right"
			className="w-[500px] sm:min-w-[550px]"
		>
			<div className="p-6">
				<div className="flex items-start justify-between">
					<h2 className="text-xl font-semibold mb-2">
						{domain.domain}
					</h2>
					<div className="flex items-center gap-2">
						<Button variant="outline">
							<Download className="w-4 h-4 mr-2" />
							Export PDF
						</Button>
						<Button variant="outline">Rescan</Button>
						<Button variant="ghost" size="icon" onClick={onClose}>
							<X className="h-4 w-4" />
						</Button>
					</div>
				</div>

				<div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg p-3 flex items-start gap-3 text-sm">
					<Info className="w-5 h-5 mt-0.5" />
					<span>
						This scan includes results from both {domain.domain} and
						www.
						{domain.domain}.
					</span>
				</div>

				<div className="my-6">
					<h3 className="text-lg font-semibold mb-4">
						Domain information
					</h3>
					<div className="space-y-4 text-sm">
						<div className="flex justify-between items-center">
							<span className="text-muted-foreground">
								RISK RATING
							</span>
							<div className="flex items-center gap-2">
								{domain.grade && (
									<Badge
										variant="outline"
										className="w-6 h-6 justify-center p-0 rounded-full bg-green-100 text-green-800 border-green-200"
									>
										{domain.grade}
									</Badge>
								)}
								<span className="font-medium">
									{domain.score}
								</span>
								{domain.maxScore && (
									<span className="text-muted-foreground">
										/ {domain.maxScore}
									</span>
								)}
							</div>
						</div>
						<Separator />
						<div className="flex justify-between items-center">
							<span className="text-muted-foreground">
								LAST SCANNED
							</span>
							<span className="font-medium">
								{domain.scannedOn} {domain.scannedOnTime}
							</span>
						</div>
						<Separator />
						<div className="flex justify-between items-center">
							<span className="text-muted-foreground">
								FIRST SCANNED
							</span>
							<span className="font-medium">
								{domain.firstScanned}
							</span>
						</div>
						<Separator />
						<div className="flex justify-between items-center">
							<span className="text-muted-foreground">
								LABELS
							</span>
							<Button
								variant="outline"
								size="sm"
								className="border-dashed text-muted-foreground"
							>
								+ Add label
							</Button>
						</div>
					</div>
				</div>

				<div className="my-6">
					<h3 className="text-lg font-semibold mb-4">IP addresses</h3>
					<div className="space-y-2">
						{domain.ipAddresses?.map((ip, index) => (
							<React.Fragment key={index}>
								<div className="flex items-center justify-between py-2">
									<div className="flex items-center gap-4">
										<span className="font-mono">
											{ip.ip}
										</span>
										<div className="flex gap-2">
											{ip.domains.map((d) => (
												<Badge
													key={d}
													variant="outline"
													className="bg-gray-100"
												>
													{d}
												</Badge>
											))}
										</div>
									</div>
									<ChevronRight className="w-5 h-5 text-muted-foreground" />
								</div>
								{index <
									(domain.ipAddresses?.length ?? 0) - 1 && (
									<Separator />
								)}
							</React.Fragment>
						))}
					</div>
				</div>

				<div className="my-6">
					<div className="flex justify-between items-center mb-4">
						<h3 className="text-lg font-semibold">
							Risks ({domain.risks?.length || 0})
						</h3>
						<Button variant="outline">Request remediation</Button>
					</div>
					<div className="border rounded-lg overflow-hidden">
						<CustomAccordion
							items={
								domain.risks?.map((risk) => ({
									title: (
										<div className="flex items-center gap-3">
											<RiskIcon />
											<span className="font-medium">
												{risk.title}
											</span>
										</div>
									),
									content: (
										<div className="pl-8 pt-2 pb-4">
											<p>
												{risk.description ||
													"No description available."}
											</p>
										</div>
									),
								})) || []
							}
						/>
					</div>
				</div>
			</div>
		</DrawerSheet>
	);
}
