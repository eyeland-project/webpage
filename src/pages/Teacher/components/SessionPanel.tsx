import Lottie from 'lottie-react';
import ReactDropdown, { Option } from 'react-dropdown';
import Loading from 'react-loading';
import 'react-dropdown/style.css';

import PulseGreen from '@animations/PulseGreen.json';
import SessionOptions from '@pages/Teacher/components/SessionOptions';
import useTask from '@hooks/useTask';
import { useEffect } from 'react';
import { TaskDetail } from '@interfaces/Task.interface';

function SessionPanel({
	isSessionCreated,
	isSessionStarted,
	handleCreateSession,
	handleStartSession,
	handleEndSession,
	task,
	setTask
}: {
	isSessionCreated: boolean;
	isSessionStarted: boolean;
	handleCreateSession: Function;
	handleStartSession: Function;
	handleEndSession: Function;
	task: TaskDetail | null;
	setTask: Function;
}) {
	const { tasks, getTasks, loading } = useTask();

	const onSelectTask = (option: Option) => {
		console.log(option);
		if (!tasks) return;
		if (option.value === '') {
			if (task) setTask(null);
		} else {
			const value = parseInt(option.value);
			setTask(tasks.find(({ id }) => id === value) || null);
		}
	};

	const getDropdownOptions = () => {
		if (!tasks) return [];
		return [
			{
				value: '',
				label: '-'
			},
			...tasks.map(({ id, name }) => ({
				value: String(id),
				label: name
			}))
		];
	};

	useEffect(() => {
		if (!tasks) {
			getTasks().catch(() => {
				if (task) setTask(null);
			});
		}
	}, []);

	return (
		<div className="border-b border-solid border-gray-600">
			<div className="pr-6 pl-8 flex justify-between items-center">
				<div className="flex items-center gap-4">
					<Lottie
						animationData={PulseGreen}
						loop
						className="w-40 h-40"
					/>
					<div className="">
						El curso actualmente se encuentra{' '}
						<div className="font-semibold text-green-quaternary">
							Activo
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-4">
					<SessionOptions
						isSessionCreated={isSessionCreated}
						isSessionStarted={isSessionStarted}
						handleCreateSession={handleCreateSession}
						handleStartSession={handleStartSession}
						handleEndSession={handleEndSession}
					/>
					<div className="flex gap-4 justify-between">
						<ReactDropdown
							options={getDropdownOptions()}
							onChange={onSelectTask}
							disabled={!tasks}
							// value={task?.name}
							className="grow"
							placeholder={'Selecciona una tarea'}
						/>
						{loading && (
							<div>
								<Loading
									type="spin"
									color="#A9A9A9"
									width={40}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default SessionPanel;
