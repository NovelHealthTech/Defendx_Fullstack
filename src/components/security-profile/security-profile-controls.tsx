import {
	Badge,
	ChevronRightIcon,
	FilterIcon,
	SettingsIcon,
} from "lucide-react";
import CustomAccordion from "@/components/CustomAccordion";
import DrawerSheet from "@/components/DrawerSheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const controlGroups = [
	{
		id: "1",
		label: "Security policies and processes",
		subgroups: [
			{
				id: "information-security",
				label: "Information security",
				controlActions: [
					{
						id: "information-security-policy-established",
						label: "Information security policy established",
						description:
							"The organization has established an information security policy that addresses the security requirements of the organization.",
						status: "red",
					},
					{
						id: "information-security-program-implemented-and-communicated",
						label: "Information security program implemented and communicated",
						description:
							"The organization has implemented an information security program and communicated it to all relevant stakeholders.",
						status: "orange",
					},
				],
			},
			{
				id: "it-operations-management",
				label: "IT operations management",
				controlActions: [
					{
						id: "it-operations-governance-policy-established",
						label: "IT operations governance policy established",
						description:
							"The organization has established an IT operations governance policy that addresses the security requirements of the organization.",
						status: "red",
					},
					{
						id: "it-operations-governance-program-implemented-and-communicated",
						label: "IT operations governance program implemented and communicated",
						description:
							"The organization has implemented an IT operations governance program and communicated it to all relevant stakeholders.",
						status: "green",
					},
				],
			},
		],
	},
	{
		id: "2",
		label: "Security policies and processes",
		subgroups: [
			{
				id: "information-security",
				label: "Information security",
				controlActions: [
					{
						id: "information-security-policy-established",
						label: "Information security policy established",
						status: "red",
					},
					{
						id: "information-security-program-implemented-and-communicated",
						label: "Information security program implemented and communicated",
						status: "orange",
					},
				],
			},
			{
				id: "it-operations-management",
				label: "IT operations management",
				controlActions: [
					{
						id: "it-operations-governance-policy-established",
						label: "IT operations governance policy established",
						status: "red",
					},
					{
						id: "it-operations-governance-program-implemented-and-communicated",
						label: "IT operations governance program implemented and communicated",
						status: "green",
					},
				],
			},
		],
	},
	{
		id: "3",
		label: "Security policies and processes",
		subgroups: [
			{
				id: "information-security",
				label: "Information security",
				controlActions: [
					{
						id: "information-security-policy-established",
						label: "Information security policy established",
						status: "red",
					},
					{
						id: "information-security-program-implemented-and-communicated",
						label: "Information security program implemented and communicated",
						status: "orange",
					},
				],
			},
			{
				id: "it-operations-management",
				label: "IT operations management",
				controlActions: [
					{
						id: "it-operations-governance-policy-established",
						label: "IT operations governance policy established",
						status: "red",
					},
					{
						id: "it-operations-governance-program-implemented-and-communicated",
						label: "IT operations governance program implemented and communicated",
						status: "green",
					},
				],
			},
		],
	},
];

const ControlGroupMain = ({
	group,
	children,
}: {
	group: any;
	children: React.ReactNode;
}) => {
	return (
		<div className="space-y-4">
			<p className="text-md font-medium">{group.label}</p>
			{children}
		</div>
	);
};

const ControlGroupSub = ({
	subgroup,
	children,
}: {
	subgroup: any;
	children: React.ReactNode;
}) => {
	return (
		<div className="flex flex-col gap-2">
			<p className="text-sm">{subgroup.label}</p>
			{children}
		</div>
	);
};

const ControlAction = ({
	controlAction,
	onClick,
}: {
	controlAction: any;
	onClick: () => void;
}) => {
	return (
		<Button
			variant="ghost"
			className="flex items-center gap-2 justify-between rounded-sm"
			onClick={onClick}
		>
			<div className="flex gap-2">
				<Badge
					className={`${
						controlAction.status === "red"
							? "bg-red-500 text-white"
							: "bg-green-500 text-white"
					} rounded-full w-4 h-4`}
				>
					{controlAction.status}
				</Badge>
				<p className="text-sm">{controlAction.label}</p>
			</div>
			<ChevronRightIcon />
		</Button>
	);
};

export default function SecurityProfileControls() {
	const [openControlActionDrawer, openControlActionDrawerSet] =
		useState(false);
	const [selectedControlAction, selectedControlActionSet] =
		useState<any>(null);

	return (
		<Card>
			<CardHeader className="flex items-center justify-between font-normal">
				<CardTitle>Controls (10)</CardTitle>
				<div className="flex items-center gap-2">
					<Input placeholder="Search" />
					<Button variant="ghost" size="icon">
						<SettingsIcon />
					</Button>
					<Button variant="ghost" size="icon">
						<FilterIcon />
					</Button>
				</div>
			</CardHeader>
			<CardContent className="space-y-6">
				{controlGroups.map((group) => (
					<ControlGroupMain key={group.id} group={group}>
						{group.subgroups.map((subgroup) => (
							<ControlGroupSub
								key={subgroup.id}
								subgroup={subgroup}
							>
								{subgroup.controlActions.map(
									(controlAction) => (
										<ControlAction
											key={controlAction.id}
											controlAction={controlAction}
											onClick={() => {
												selectedControlActionSet(
													controlAction
												);
												openControlActionDrawerSet(
													true
												);
											}}
										/>
									)
								)}
							</ControlGroupSub>
						))}
					</ControlGroupMain>
				))}
			</CardContent>
			<DrawerSheet
				open={openControlActionDrawer}
				onOpenChange={openControlActionDrawerSet}
				title={selectedControlAction?.label}
				description={selectedControlAction?.description}
				className="w-[400px] sm:min-w-[500px]"
				children={
					<>
						<CustomAccordion
							type="multiple"
							items={[
								{
									title: "Accordion For Data Type Array?",
									content:
										"If you pass an array of objects, the accordion will be created for each object.",
								},
								{
									title: "Question 2",
									content: "Answer 2",
								},
							]}
						/>
						<CustomAccordion
							type="single"
							items={{
								"faq-1": {
									title: "Accordion For Data Type Object?",
									content:
										"The component also upports passing an object with title and content properties.",
								},
								"faq-2": {
									title: "Can I reuse it?",
									content: "Absolutely!",
								},
							}}
						/>
					</>
				}
			/>
		</Card>
	);
}
