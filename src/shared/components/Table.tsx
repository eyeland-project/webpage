import { useEffect } from 'react';
import {
	useReactTable,
	getCoreRowModel,
	flexRender,
	getPaginationRowModel
} from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
import EmptyIcon from '@icons/Empty.svg';

// https://dev.to/esponges/create-a-reusable-react-table-component-with-typescript-56d4
function Table<T extends object>({
	data,
	columns,
	showNavigation = true,
	pages = [10, 20, 30, 40, 50]
}: ReactTableProps<T>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel()
	});

	useEffect(() => {
		table.setPageSize(pages[0]);
	}, []);

	return (
		<div className="flex flex-col">
			<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="inline-block min-w-full py-4 sm:px-6 lg:px-8">
					<div className="overflow-hidden p-2">
						<table className="min-w-full text-center">
							<thead className="border-b bg-gray-50">
								{table
									.getHeaderGroups()
									.map((headerGroup, i) => (
										<tr key={i}>
											{headerGroup.headers.map(
												(header, i) => (
													<th
														key={i}
														className="px-6 py-4 text-sm font-medium text-gray-900"
													>
														{header.isPlaceholder
															? null
															: flexRender(
																header
																	.column
																	.columnDef
																	.header,
																header.getContext()
															)}
													</th>
												)
											)}
										</tr>
									))}
							</thead>
							<tbody>
								{
									table.getRowModel().rows.length ? (
										table.getRowModel().rows.map((row, i) => (
											<tr key={i} className='border-b" bg-white'>
												{row
													.getVisibleCells()
													.map((cell, i) => (
														<td
															className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900"
															key={i}
														>
															{flexRender(
																cell.column.columnDef
																	.cell,
																cell.getContext()
															)}
														</td>
													))}
											</tr>
										))
									) : (
										<tr>
											<td colSpan={5}>
												<div className="flex justify-center">
													<img
														src={EmptyIcon}
														alt="No hay estudiantes en este curso"
														className="w-40 my-20"
													/>
												</div>
											</td>
										</tr>
									)}
							</tbody>
						</table>
						{showNavigation ? (
							<>
								{/* <div className="h-2 mt-5" /> */}
								<div className="flex items-center gap-4 mt-5 justify-center">
									<div className="flex cursor-pointer items-center gap-1">
										<div>
											Página{' '}
											{table.getState().pagination
												.pageIndex + 1}{' '}
											de {table.getPageCount()}
										</div>
									</div>
									<div className="flex items-center justify-center gap-2">
										<button
											className="cursor-pointer rounded border p-1"
											onClick={() =>
												table.setPageIndex(0)
											}
											disabled={
												!table.getCanPreviousPage()
											}
										>
											{'<<'}
										</button>
										<button
											className="cursor-pointer rounded border p-1"
											onClick={() => table.previousPage()}
											disabled={
												!table.getCanPreviousPage()
											}
										>
											{'<'}
										</button>
										<button
											className="cursor-pointer rounded border p-1"
											onClick={() => table.nextPage()}
											disabled={!table.getCanNextPage()}
										>
											{'>'}
										</button>
										<button
											className="cursor-pointer rounded border p-1"
											onClick={() =>
												table.setPageIndex(
													table.getPageCount() - 1
												)
											}
											disabled={!table.getCanNextPage()}
										>
											{'>>'}
										</button>
									</div>
									<select
										value={
											table.getState().pagination.pageSize
										}
										onChange={(e) =>
											table.setPageSize(
												parseInt(e.target.value)
											)
										}
									>
										{pages.map((pageSize, i) => (
											<option key={i} value={pageSize}>
												Mostrar {pageSize}
											</option>
										))}
									</select>
								</div>
							</>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
}

interface ReactTableProps<T extends object> {
	data: T[];
	columns: ColumnDef<T>[];
	showNavigation?: boolean;
	pages?: number[];
}

export default Table;
