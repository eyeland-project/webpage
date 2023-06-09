import Table from '@components/Table';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
	const { t, i18n } = useTranslation('', {
		keyPrefix: 'teacher.submissions.table'
	});

	const cols = useMemo<ColumnDef<TaskAttemptSubmissionDetail>[]>(
		() => [
			{
				header: t<string>('id'),
				accessorKey: 'id',
				accessorFn: ({ id }) => id
			},
			{
				header: t<string>('student'),
				accessorKey: 'student',
				accessorFn: ({ student: { firstName, lastName } }) =>
					parseStudentName(firstName, lastName)
			},
			{
				header: t<string>('task'),
				accessorKey: 'task',
				accessorFn: ({ task: { name } }) => name
			},
			{
				header: t<string>('timeStamp'),
				accessorKey: 'timeStamp',
				accessorFn: ({ timeStamp }) =>
					new Date(timeStamp).toLocaleString()
			},
			{
				header: t<string>('action'),
				cell: (row) => row.renderValue(),
				accessorFn: ({ id }) => (
					<Link
						to={`/teacher/submissions/${id}?idCourse=${idCourse}`}
						target="_blank"
						// referrerPolicy='no-referrer'
						className="text-green-600 font-bold hover:underline"
					>
						{t('link')}
					</Link>
				)
			}
		],
		[i18n.language]
	);

	return (
		<div className="m-auto">
			<Table data={taskAttempts} columns={cols} showNavigation />
		</div>
	);
}

export default TableSubmissions;
