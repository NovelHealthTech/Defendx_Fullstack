import React from "react";
import DrawerSheet from "../DrawerSheet";

type Product = {
	name: string;
	description: string;
};

type Vendor = {
	name: string;
};

type Props = {
	isOpen: boolean;
	onClose: () => void;
	vendor: Vendor | null;
	products: Product[];
};

const FourthPartyDetailDrawer: React.FC<Props> = ({
	isOpen,
	onClose,
	vendor,
	products,
}) => {
	if (!vendor) return null;
	return (
		<DrawerSheet
			open={isOpen}
			onOpenChange={(open) => {
				if (!open) onClose();
			}}
			side="right"
			className="w-[350px] px-4 sm:min-w-[400px]"
			title={vendor ? `${vendor.name} products used by Sportskeeda` : ""}
		>
			<div className="flex flex-col gap-4 mt-4">
				{products.map((product, idx) => (
					<div key={product.name} className="pb-4">
						<div className="font-semibold text-xs text-foreground mb-1 uppercase tracking-wide">
							{product.name}
						</div>
						<div className="text-sm text-muted-foreground leading-snug">
							{product.description}
						</div>
						{idx !== products.length - 1 && (
							<hr className="mt-4 mb-0 border-border" />
						)}
					</div>
				))}
			</div>
		</DrawerSheet>
	);
};

export default FourthPartyDetailDrawer;
