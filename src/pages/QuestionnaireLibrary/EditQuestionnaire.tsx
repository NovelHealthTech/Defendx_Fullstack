import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, GripVertical } from "lucide-react";
import SidebarLayout from "@/layouts/sidebar-layout";
import PageHeader from "@/components/PageHeader";
import {
	DndContext,
	closestCenter,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	useSortable,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useNavigate, useParams } from "react-router";

// Types for questionnaire items
const QUESTION_TYPES = [
	{ label: "Section", value: "section" },
	{ label: "Single-select question", value: "single" },
	{ label: "Multi-select question", value: "multi" },
	{ label: "Text question", value: "text" },
	{ label: "File upload", value: "file" },
	{ label: "Identified risk", value: "risk" },
	{ label: "Info", value: "info" },
];

type QuestionnaireItem = {
	id: number;
	type: string;
	label: string;
	options?: string[];
	multiLine?: boolean;
};

type Questionnaire = {
	name: string;
	description: string;
	showTableOfContents: boolean;
	customQuestionNumbers: boolean;
	items: QuestionnaireItem[];
};

const initialQuestionnaire: Questionnaire = {
	name: "",
	description: "",
	showTableOfContents: true,
	customQuestionNumbers: false,
	items: [],
};

function SortableItem({
	item,
	onLabelChange,
	onRemove,
	onOptionChange,
	onAddOption,
	onRemoveOption,
	onToggleMultiLine,
}: any) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: item.id });
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.7 : 1,
		background: isDragging ? "#f1f5f9" : undefined,
	};
	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			className="bg-white dark:bg-zinc-900 border rounded-lg p-4 flex items-start gap-3 relative"
		>
			<button {...listeners} tabIndex={0} aria-label="Drag to reorder">
				<GripVertical className="w-4 h-4 text-muted-foreground mt-1 cursor-move" />
			</button>
			<div className="flex-1">
				<Input
					placeholder={
						item.type === "section"
							? "Enter a section title"
							: "Enter your question"
					}
					value={item.label}
					onChange={(e) => onLabelChange(item.id, e.target.value)}
					className="mb-2"
				/>
				{/* Options for single/multi-select */}
				{(item.type === "single" || item.type === "multi") && (
					<div className="flex flex-col gap-2 mt-2">
						{item.options?.map((opt: string, i: number) => (
							<div key={i} className="flex gap-2 items-center">
								<Input
									placeholder="Enter an option"
									value={opt}
									onChange={(e) =>
										onOptionChange(
											item.id,
											i,
											e.target.value
										)
									}
									className="ml-4"
								/>
								<Button
									variant="ghost"
									size="icon"
									aria-label="Remove option"
									onClick={() => onRemoveOption(item.id, i)}
								>
									<Trash2 className="w-4 h-4" />
								</Button>
							</div>
						))}
						<Button
							variant="outline"
							size="sm"
							className="ml-4 mt-1"
							onClick={() => onAddOption(item.id)}
						>
							<Plus className="w-4 h-4" /> Add option
						</Button>
					</div>
				)}
				{/* Text question: multi-line toggle */}
				{item.type === "text" && (
					<div className="flex items-center gap-2 mt-2">
						<Checkbox
							checked={!!item.multiLine}
							onCheckedChange={(v) =>
								onToggleMultiLine(item.id, !!v)
							}
						/>
						<span className="text-xs">
							Support multi-line answers
						</span>
					</div>
				)}
				{/* Info, File, Risk types can be extended here */}
			</div>
			<Button
				variant="ghost"
				size="icon"
				aria-label="Delete"
				onClick={() => onRemove(item.id)}
				className="absolute top-2 right-2"
			>
				<Trash2 className="w-4 h-4" />
			</Button>
		</div>
	);
}

export default function EditQuestionnaire() {
	const navigate = useNavigate();
	const { id } = useParams();
	// In a real app, fetch questionnaire by id here
	const [questionnaire, setQuestionnaire] =
		useState<Questionnaire>(initialQuestionnaire);
	const sensors = useSensors(useSensor(PointerSensor));

	// Add new item
	const handleAddItem = (type: string) => {
		setQuestionnaire((q) => ({
			...q,
			items: [
				...q.items,
				{
					id: Date.now(),
					type,
					label: "",
					options:
						type === "single" || type === "multi"
							? ["", ""]
							: undefined,
				},
			],
		}));
	};

	// Remove item
	const handleRemoveItem = (id: number) => {
		setQuestionnaire((q) => ({
			...q,
			items: q.items.filter((item) => item.id !== id),
		}));
	};

	// Update item label
	const handleItemLabelChange = (id: number, label: string) => {
		setQuestionnaire((q) => ({
			...q,
			items: q.items.map((item) =>
				item.id === id ? { ...item, label } : item
			),
		}));
	};

	// Option handlers
	const handleOptionChange = (
		itemId: number,
		optIdx: number,
		value: string
	) => {
		setQuestionnaire((q) => ({
			...q,
			items: q.items.map((item) =>
				item.id === itemId
					? {
							...item,
							options: (item.options ?? []).map((o, i) =>
								i === optIdx ? value : o
							),
					  }
					: item
			),
		}));
	};
	const handleAddOption = (itemId: number) => {
		setQuestionnaire((q) => ({
			...q,
			items: q.items.map((item) =>
				item.id === itemId
					? { ...item, options: [...(item.options ?? []), ""] }
					: item
			),
		}));
	};
	const handleRemoveOption = (itemId: number, optIdx: number) => {
		setQuestionnaire((q) => ({
			...q,
			items: q.items.map((item) =>
				item.id === itemId
					? {
							...item,
							options: (item.options ?? []).filter(
								(_, i) => i !== optIdx
							),
					  }
					: item
			),
		}));
	};
	// Text question: toggle multi-line
	const handleToggleMultiLine = (itemId: number, value: boolean) => {
		setQuestionnaire((q) => ({
			...q,
			items: q.items.map((item) =>
				item.id === itemId ? { ...item, multiLine: value } : item
			),
		}));
	};

	// Drag-and-drop
	const handleDragEnd = (event: any) => {
		const { active, over } = event;
		if (active.id !== over?.id) {
			setQuestionnaire((q) => {
				const oldIndex = q.items.findIndex((i) => i.id === active.id);
				const newIndex = q.items.findIndex((i) => i.id === over.id);
				return {
					...q,
					items: arrayMove(q.items, oldIndex, newIndex),
				};
			});
		}
	};

	return (
		<SidebarLayout
			breadcrumbs={[
				{
					label: "Questionnaire Library",
					href: "/questionnaire-library",
				},
				{ label: "Edit Questionnaire", href: "" },
			]}
		>
			<PageHeader
				title="Edit Questionnaire"
				info="Create or edit your questionnaire. Add sections and questions as needed."
				actions={
					<div className="flex gap-2 items-center">
						<Button
							variant="outline"
							onClick={() =>
								navigate(`/questionnaire-library/preview/${id}`)
							}
						>
							Preview
						</Button>
						<Button variant="outline">Save and exit</Button>
						{/* <Button variant="outline">
							Save and export to Excel
						</Button> */}
						<Button>Publish</Button>
					</div>
				}
			/>
			<div className="flex flex-col md:flex-row gap-8">
				<div className="flex-1 min-w-0">
					<div className="bg-card border rounded-xl p-6 flex flex-col gap-4 mb-6">
						<Input
							placeholder="Questionnaire name"
							value={questionnaire.name}
							onChange={(e) =>
								setQuestionnaire((q) => ({
									...q,
									name: e.target.value,
								}))
							}
							className="text-lg font-medium"
						/>
						<Textarea
							placeholder="Enter a questionnaire description"
							value={questionnaire.description}
							onChange={(e) =>
								setQuestionnaire((q) => ({
									...q,
									description: e.target.value,
								}))
							}
							className="min-h-[80px]"
						/>
						<div className="flex items-center gap-4">
							<label className="flex items-center gap-2 text-sm">
								<Checkbox
									checked={questionnaire.showTableOfContents}
									onCheckedChange={(v) =>
										setQuestionnaire((q) => ({
											...q,
											showTableOfContents: !!v,
										}))
									}
								/>
								Show table of contents
							</label>
							<label className="flex items-center gap-2 text-sm">
								<Checkbox
									checked={
										questionnaire.customQuestionNumbers
									}
									onCheckedChange={(v) =>
										setQuestionnaire((q) => ({
											...q,
											customQuestionNumbers: !!v,
										}))
									}
								/>
								Custom question numbers
							</label>
						</div>
					</div>
					<DndContext
						sensors={sensors}
						collisionDetection={closestCenter}
						onDragEnd={handleDragEnd}
					>
						<SortableContext
							items={questionnaire.items.map((i) => i.id)}
							strategy={verticalListSortingStrategy}
						>
							<div className="flex flex-col gap-4">
								{questionnaire.items.map((item) => (
									<SortableItem
										key={item.id}
										item={item}
										onLabelChange={handleItemLabelChange}
										onRemove={handleRemoveItem}
										onOptionChange={handleOptionChange}
										onAddOption={handleAddOption}
										onRemoveOption={handleRemoveOption}
										onToggleMultiLine={
											handleToggleMultiLine
										}
									/>
								))}
							</div>
						</SortableContext>
					</DndContext>
					<div className="flex flex-wrap gap-2 mt-4">
						{QUESTION_TYPES.map((qt) => (
							<Button
								key={qt.value}
								variant="outline"
								size="sm"
								onClick={() => handleAddItem(qt.value)}
								className="flex items-center gap-1"
							>
								<Plus className="w-4 h-4" /> {qt.label}
							</Button>
						))}
					</div>
				</div>
				<aside className="w-full md:w-80 flex-shrink-0">
					<div className="bg-card border rounded-xl p-6">
						<h2 className="font-semibold mb-2">Sections</h2>
						<div className="text-sm text-muted-foreground">
							Sections are a simple tool to create a group with
							sub-questions inside. Use it to organise your
							questionnaire into chapters or to segregate
							questions by theme. Sections are also used to create
							the table of contents if you choose to include one.
						</div>
						<a href="#" className="block mt-2 text-xs underline">
							View support article
						</a>
					</div>
				</aside>
			</div>
		</SidebarLayout>
	);
}
