import Table from '@components/Table';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TaskAttemptSubmissionDetail } from '@interfaces/teacher/TaskAttempt.interface';
import { parseStudentName } from '@utils/general.utils';

function TableSubmissions({
	idCourse,
	taskAttempts
}: {
	idCourse: number;
	taskAttempts: TaskAttemptSubmissionDetail[];
}) {
	const cols = useMemo<ColumnDef<TaskAttemptSubmissionDetail>[]>(
		() => [
			{
				header: 'Id de envío',
				accessorKey: 'id',
				accessorFn: ({ id }) => id
			},
			{
				header: 'Estudiante',
				accessorKey: 'student',
				accessorFn: ({ student: { firstName, lastName } }) =>
					parseStudentName(firstName, lastName)
			},
			{
				header: 'Task',
				accessorKey: 'task',
				accessorFn: ({ task: { name } }) => name
			},
			{
				header: 'Fecha de inicio',
				accessorKey: 'timeStamp',
				accessorFn: ({ timeStamp }) =>
					new Date(timeStamp).toLocaleString()
			},
			{
				header: 'Acción',
				cell: (row) => row.renderValue(),
				accessorFn: ({ id }) => (
					<Link
						to={`/teacher/submissions/${id}?idCourse=${idCourse}`}
						target="_blank"
						// referrerPolicy='no-referrer'
						className="text-green-600 font-bold hover:underline"
					>
						Ver
					</Link>
				)
			}
		],
		[]
	);

	return (
		<div className="m-auto">
			<Table data={taskAttempts} columns={cols} showNavigation />
		</div>
	);
}

export default TableSubmissions;
