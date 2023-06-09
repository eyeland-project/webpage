import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from 'react-loading';

import useTask from '@hooks/useTask';
import useQuestion from '@hooks/useQuestion';
import useTeacherContext from '@hooks/useTeacherContext';

import Ribbon from '@pages/Teacher/components/Ribbon';

import { parseNumericParam } from '@utils/routing.utils';

import DataGridIcon from '@icons/DataGrid.svg';
import TaskStageSelect from './components/TaskStageSelect';
import LoadingScreen from '@components/LoadingScreen';
import QuestionGrid from './components/QuestionGrid';

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
	const { task, setTask, getTask, loading: loadingTask } = useTask();
	// useQuestions hook
	const {
		getQuestionsFromTask,
		questions,
		setQuestions,
		loading: loadingQuestions
	} = useQuestion();

	// states
	const [idTask, setIdTask] = useState<number | null>(
		parseNumericParam(idTaskStr)
	);
	const [selectedTaskStage, setSelectedTaskStage] = useState<number>(0);

	const questionsFromTaskStage = !questions
		? []
		: Object.values(questions)[selectedTaskStage];

	const updateData = (idTask: number, didTaskChange: boolean) => {
		if (didTaskChange) {
			setQuestions(null); // reset questions
			setSelectedTaskStage(0); // reset task stage
		}
		if (didTaskChange || !questions) {
			console.log('getQuestionsFromTask');
			getQuestionsFromTask(idTask)
				.then((questions) => {
					setQuestions(questions);
				})
				.catch(() => {
					if (questions !== null) setQuestions(null);
				});
		}
		if (didTaskChange || !task) {
			console.log('getTask', idTask);
			getTask(idTask)
				.then((task) => {
					setTask(task);
				})
				.catch(() => {
					if (task !== null) setTask(null);
				});
		}
	};

	useEffect(() => {
		setIdTask(parseNumericParam(idTaskStr));
	}, [idTaskStr]);

	useEffect(() => {
		// detect change in param idTask
		if (idTask === null) {
			return navigate('/teacher/tasks');
		}
		const didChange = idSelectedTask !== idTask;
		if (didChange) {
			setIdSelectedTask(idTask); // context (submenu)
		}
		updateData(idTask, didChange);
	}, [idTask]);

	useEffect(() => {
		// detect change in context idTask (submenu)
		if (idSelectedTask === null) {
			return navigate('/teacher/tasks');
		}
		const didChange = idSelectedTask !== idTask;
		updateData(idSelectedTask, didChange);
	}, [idSelectedTask]);

	// useEffect(() => {
	// 	console.log('questionsFromTask', questionsFromTask);
	// }, [questionsFromTask]);

	// useEffect(() => {
	// 	console.log('loadingQuestions', loadingQuestions);
	// }, [loadingQuestions]);

	// useEffect(() => {
	// 	console.log('task', task);
	// }, [task]);

	// if (!task) return <></>;

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
				{questions ? (
					<div className="mt-8">
						<TaskStageSelect
							selectedTaskStage={selectedTaskStage}
							setSelectedTaskStage={setSelectedTaskStage}
						/>
						<div className="mt-6">
							<QuestionGrid questions={questionsFromTaskStage} />
						</div>
					</div>
				) : (
					<LoadingScreen loading={loadingQuestions} />
				)}
			</div>
		</div>
	);
}

export default Task;
