import React, { useState } from "react";
import { TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
	useReactTable,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	flexRender,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";

export default function VulnerabilitiesDataTable({
	columns,
	data,
	expanded,
}: {
	columns: ColumnDef<any>[];
	data: any[];
	expanded: number | null;
}) {
	const [sorting, setSorting] = useState<any>([]);
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		state: { sorting },
	});
	return (
		<div className="w-full overflow-x-auto rounded-md border bg-card">
			<table className="min-w-[900px] w-full caption-bottom text-sm">
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead
									key={header.id}
									className="font-medium px-2 py-2 whitespace-nowrap"
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
										  )}
								</TableHead>
							))}
						</TableRow>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<React.Fragment key={row.id}>
							<TableRow
								data-state={row.getIsSelected() && "selected"}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell
										key={cell.id}
										className="px-2 py-2 whitespace-nowrap"
									>
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext()
										)}
									</TableCell>
								))}
							</TableRow>
							{expanded === row.index && (
								<TableRow className="bg-muted/30">
									<TableCell
										colSpan={columns.length}
										className="p-4"
									>
										<div className="mb-2 text-sm text-muted-foreground whitespace-break-spaces">
											{row.original.description && (
												<div>
													{row.original.description}{" "}
													{row.original.learnMore && (
														<a
															href={
																row.original
																	.learnMore
															}
															className="text-blue-600 underline ml-2"
														>
															Learn more
														</a>
													)}
												</div>
											)}
											{row.original.domains.map(
												(domain: string) => (
													<div
														key={domain}
														className="mt-2"
													>
														<span className="font-semibold">
															{domain}
														</span>{" "}
														<span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs ml-2">
															{
																row.original
																	.softwareVersion
															}
														</span>{" "}
														<span className="ml-2 text-xs text-muted-foreground">
															{
																row.original
																	.firstDetected
															}
														</span>{" "}
														<span className="ml-2 text-xs">
															Not in remediation
														</span>
													</div>
												)
											)}
										</div>
										<div className="flex justify-end">
											<Button variant="outline">
												Request remediation
											</Button>
										</div>
									</TableCell>
								</TableRow>
							)}
						</React.Fragment>
					))}
				</tbody>
			</table>
			<div className="flex flex-col sm:flex-row items-center justify-end space-x-0 sm:space-x-2 p-4 gap-2 sm:gap-0">
				<Button
					variant="outline"
					size="sm"
					className="w-full sm:w-auto"
				>
					Previous
				</Button>
				<Button
					variant="outline"
					size="sm"
					className="w-full sm:w-auto"
				>
					Next
				</Button>
			</div>
		</div>
	);
}
