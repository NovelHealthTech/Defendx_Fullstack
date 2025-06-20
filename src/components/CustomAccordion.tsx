/**
 * CustomAccordion
 *
 * A reusable wrapper around the Accordion component.
 * Supports rendering items from either an array or an object format.
 *
 * Props:
 * - items: An array of objects or an object map. Each item must have a `title` and `content`.
 *   - Array format: [{ title: string, content: string | ReactNode }]
 *   - Object format: { [key: string]: { title: string, content: string | ReactNode } }
 * - type: "single" | "multiple" — determines if one or multiple accordion items can be open at a time.
 * - collapsible: boolean — allows all items to be collapsed if true.
 *
 * Example Usage:
 * <CustomAccordion items={[{ title: "Q1", content: "A1" }]} />
 * <CustomAccordion items={{ q1: { title: "Q1", content: "A1" } }} />
 */

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

type AccordionItemData = {
	title: string;
	content: string | React.ReactNode;
};

type AccordionProps = {
	items: AccordionItemData[] | Record<string, AccordionItemData>;
	type?: "single" | "multiple"; // Open multiple items at once or only one
	collapsible?: boolean;
};

const CustomAccordion = ({
	items,
	type = "single",
	collapsible = true,
}: AccordionProps) => {
	const normalizedItems = Array.isArray(items)
		? items.map((item, index) => ({
				value: `item-${index + 1}`,
				...item,
			}))
		: Object.entries(items).map(([key, value]) => ({
				value: key,
				...value,
			}));

	return (
		<Accordion type={type} collapsible={collapsible}>
			{normalizedItems.map((item) => (
				<AccordionItem key={item.value} value={item.value}>
					<AccordionTrigger>{item.title}</AccordionTrigger>
					<AccordionContent>{item.content}</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
};

export default CustomAccordion;
