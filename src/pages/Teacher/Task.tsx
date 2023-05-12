import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from 'react-loading';

import useTask from '@hooks/useTask';
import useTeacherContext from '@hooks/useTeacherContext';

import Ribbon from '@pages/Teacher/components/Ribbon';

import { parseNumericParam } from '@utils/routing.utils';

import DataGridIcon from '@icons/DataGrid.svg';

function Task() {
	// navigation
	const navigate = useNavigate();
	// params
	const { idTask: idTaskStr } = useParams<{ idTask: string }>();
	// context
	const {
		tasksData: { idSelectedTask, setIdSelectedTask }
	} = useTeacherContext();
	// useTasks hook
	const { task, setTask, getTask, loading } = useTask();

	// states
	const [idTask, setIdTask] = useState<number | null>(
		parseNumericParam(idTaskStr)
	);

	useEffect(() => {
		const idTaskNum = parseNumericParam(idTaskStr);
		if (idTaskNum === null) {
			return navigate('/teacher/tasks');
		}
		if (idTaskNum !== idTask) setIdTask(idTaskNum);
	}, [idTaskStr]);

	useEffect(() => {
		if (idTask === null) {
			return navigate('/teacher/tasks');
		}
		if (idSelectedTask !== idTask) setIdSelectedTask(idTask);
		if (idSelectedTask !== idTask || !task) {
			getTask(idTask)
				.then((task) => {
					setTask(task);
				})
				.catch(() => {
					if (task !== null) setTask(null);
				});
		}
	}, [idTask]);

	return (
		<div className="h-screen">
			<Ribbon>
				<img
					src={DataGridIcon}
					alt="GraduationCap"
					className="w-5 h-5"
				/>
				<div className="text-white font-semibold">
					{task?.name || ''}
				</div>
			</Ribbon>
			<div className="px-8 pb-4 pt-10 h-full">
				{task ? (
					<></>
				) : (
					<div className="flex flex-col grow justify-center items-center h-full">
						{loading ? (
							<Loading type="spin" color="#0D9748" />
						) : (
							<div className="italic w-3/5 text-center text-lg">
								No se pudo obtener la información
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

export default Task;
