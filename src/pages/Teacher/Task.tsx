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
		// getQuestionsDuringtask,
		// getQuestionsPostask,
		// getQuestionsPretask,
		// questionsDuringtask,
		// questionsPostask,
		// questionsPretask,
		// setQuestionsDuringtask,
		// setQuestionsPostask,
		// setQuestionsPretask,
		getQuestionsFromTask,
		questionsFromTask,
		setQuestionsFromTask,
		loading: loadingQuestions
	} = useQuestion();

	// states
	const [idTask, setIdTask] = useState<number | null>(
		parseNumericParam(idTaskStr)
	);
	const [selectedTaskStage, setSelectedTaskStage] = useState<number>(0);

	const questionsFromTaskStage = !questionsFromTask
		? []
		: Object.values(questionsFromTask)[selectedTaskStage];

	const updateData = (didTaskChange: boolean) => {
		if (didTaskChange) {
			setQuestionsFromTask(null); // reset questions
			setSelectedTaskStage(0); // reset task stage
		}
		if (didTaskChange || !questionsFromTask) {
			getQuestionsFromTask(idTask!)
				.then((questions) => {
					setQuestionsFromTask(questions);
				})
				.catch(() => {
					if (questionsFromTask !== null) setQuestionsFromTask(null);
				});
		}
		if (didTaskChange || !task) {
			getTask(idTask!)
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
		if (idTask === null) {
			return navigate('/teacher/tasks');
		}
		const didChange = idSelectedTask !== idTask;
		if (didChange) {
			setIdSelectedTask(idTask); // context (submenu)
		}
		updateData(didChange);
	}, [idTask]);

	useEffect(() => {
		console.log('idSelectedTask', idSelectedTask);
		if (idTask === null) {
			return navigate('/teacher/tasks');
		}
		const didChange = idSelectedTask !== idTask;
		updateData(didChange);
	}, [idSelectedTask]);

	useEffect(() => {
		console.log('questionsFromTask', questionsFromTask);
	}, [questionsFromTask]);

	useEffect(() => {
		console.log('loadingQuestions', loadingQuestions);
	}, [loadingQuestions]);

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
				<div className="mt-8">
					<TaskStageSelect
						selectedTaskStage={selectedTaskStage}
						setSelectedTaskStage={setSelectedTaskStage}
					/>
					<div className="mt-6">
						{questionsFromTask ? (
							<>Questions</>
						) : (
							<LoadingScreen loading={loadingQuestions} />
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Task;
