import React from "react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const HeaderWithAction = ({
	title,
	action,
}: {
	title: string;
	action: React.ReactNode;
}) => {
	return (
		<div className="flex justify-between items-center mr-8">
			<h3 className="text-lg font-medium">{title}</h3>
			{action}
		</div>
	);
};
export default function DrawerSheet({
	open,
	onOpenChange,
	trigger,
	children,
	title,
	description,
	side,
	className,
	headerWithAction,
}: {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	trigger?: React.ReactNode;
	children: React.ReactNode;
	title?: string;
	description?: string;
	className?: string;
	side?: "left" | "right" | "top" | "bottom";
	headerWithAction?: {
		title: string;
		action: React.ReactNode;
	};
}) {
	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetTrigger asChild>{trigger}</SheetTrigger>
			<SheetContent className={cn("", className)} side={side}>
				<SheetHeader>
					{title && <SheetTitle>{title}</SheetTitle>}
					{description && (
						<SheetDescription>{description}</SheetDescription>
					)}
					{headerWithAction && (
						<HeaderWithAction
							title={headerWithAction.title}
							action={headerWithAction.action}
						/>
					)}
				</SheetHeader>
				<div className="h-[calc(100vh-4rem)] overflow-y-auto pr-6 -mr-6">
					{children}
				</div>
			</SheetContent>
		</Sheet>
	);
}
