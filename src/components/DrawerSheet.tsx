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

export default function DrawerSheet({
	open,
	onOpenChange,
	trigger,
	children,
	title,
	description,
	side,
	className,
}: {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	trigger?: React.ReactNode;
	children: React.ReactNode;
	title: string;
	description?: string;
	className?: string;
	side?: "left" | "right" | "top" | "bottom";
}) {
	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetTrigger asChild>{trigger}</SheetTrigger>
			<SheetContent className={cn("", className)} side={side}>
				<SheetHeader>
					<SheetTitle>{title}</SheetTitle>
					<SheetDescription>{description}</SheetDescription>
				</SheetHeader>
				<div className="m-4 mt-0">{children}</div>
			</SheetContent>
		</Sheet>
	);
}
