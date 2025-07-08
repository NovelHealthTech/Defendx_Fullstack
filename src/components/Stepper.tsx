"use client";

import * as React from "react";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface StepProps {
	title: string;
	description?: string;
	isActive?: boolean;
	number?: number;
	icon?: React.ReactNode;
	status?: "default" | "completed" | "error";
	clickable?: boolean;
	onClick?: () => void;
}

const Step: React.FC<StepProps> = ({
	title,
	description,
	isActive,
	number,
	icon,
	status = "default",
	clickable = false,
	onClick,
}) => {
	return (
		<button
			type="button"
			className={cn(
				"flex items-center focus:outline-none transition bg-transparent border-0 p-0 text-left",
				clickable
					? "cursor-pointer hover:text-blue-500"
					: "cursor-default",
				isActive
					? "font-semibold text-blue-600"
					: "text-muted-foreground"
			)}
			disabled={!clickable}
			onClick={onClick}
			aria-current={isActive ? "step" : undefined}
			role="tab"
		>
			<div className="relative flex items-center justify-center">
				<div
					className={cn(
						"w-8 h-8 rounded-full border-2 flex items-center justify-center",
						status === "completed"
							? "border-primary bg-primary text-primary-foreground"
							: status === "error"
							? "border-red-500 text-red-500"
							: isActive
							? "border-primary"
							: "border-muted"
					)}
				>
					{icon ? (
						icon
					) : status === "completed" ? (
						<Check className="w-4 h-4" />
					) : status === "error" ? (
						<span className="text-lg font-bold">!</span>
					) : (
						<span className="text-sm font-medium">{number}</span>
					)}
				</div>
			</div>
			<div className="ml-4">
				<p className="text-sm font-medium">{title}</p>
				{description && (
					<p className="text-sm text-muted-foreground">
						{description}
					</p>
				)}
			</div>
		</button>
	);
};

interface StepperStep {
	title: string;
	description?: string;
	content?: React.ReactNode;
	icon?: React.ReactNode;
	status?: "default" | "completed" | "error";
}

interface StepperProps {
	steps: StepperStep[];
	currentStep: number;
	onStepChange: (step: number) => void;
	className?: string;
	direction?: "horizontal" | "vertical";
	clickableSteps?: boolean;
	showNavButtons?: boolean;
	hasAdditionalSection?: React.ReactNode;
}

export function Stepper({
	steps,
	currentStep,
	onStepChange,
	className,
	direction = "horizontal",
	clickableSteps = false,
	showNavButtons = true,
	hasAdditionalSection,
}: StepperProps) {
	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "ArrowRight" || e.key === "ArrowDown") {
			e.preventDefault();
			if (currentStep < steps.length - 1) onStepChange(currentStep + 1);
		}
		if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
			e.preventDefault();
			if (currentStep > 0) onStepChange(currentStep - 1);
		}
	};

	return (
		<div className={cn("w-full mx-auto", className)}>
			<div
				className={cn(
					"mb-8 flex",
					direction === "vertical"
						? "flex-col gap-4 items-start"
						: "flex-row gap-0 items-center justify-between"
				)}
				role="tablist"
				onKeyDown={handleKeyDown}
			>
				{steps.map((step, index) => {
					const isActive = index === currentStep;
					const clickable = clickableSteps
						? index <= currentStep
						: false;
					return (
						<React.Fragment key={step.title}>
							<Step
								title={step.title}
								description={step.description}
								isActive={isActive}
								number={index + 1}
								icon={step.icon}
								status={step.status}
								clickable={clickable}
								onClick={() => clickable && onStepChange(index)}
							/>
							{direction === "horizontal" &&
								index < steps.length - 1 && (
									<ChevronRight className="text-muted-foreground" />
								)}
						</React.Fragment>
					);
				})}
			</div>
			<div className="flex flex-col gap-4 mb-4">
				{hasAdditionalSection}
				{steps[currentStep]?.content}
			</div>
			{showNavButtons && (
				<div className="flex justify-between">
					<Button
						variant="outline"
						onClick={() => onStepChange(currentStep - 1)}
						disabled={currentStep === 0}
					>
						Previous
					</Button>
					{currentStep !== steps.length - 1 && (
						<Button
							onClick={() => onStepChange(currentStep + 1)}
							disabled={currentStep === steps.length - 1}
						>
							{currentStep === steps.length - 1
								? "Finish"
								: "Next"}
						</Button>
					)}
				</div>
			)}
		</div>
	);
}
