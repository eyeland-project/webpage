function TaskStageSelect({
	selectedTaskStage,
	setSelectedTaskStage
}: {
	selectedTaskStage: number | null;
	setSelectedTaskStage: (_: number) => void;
}) {
	const handleSelectTaskStage = (taskStage: number) => {
		if (taskStage !== selectedTaskStage) {
			setSelectedTaskStage(taskStage);
		}
	};

	return (
		<div className="mx-auto shadow-lg rounded-md px-1 py-1 w-fit flex justify-center bg-white">
			{TASK_STAGES.map((taskStage, index) => (
				<span
					key={index}
					className={`font-bold text-gray-800 px-5 py-2 rounded-md cursor-pointer ${
						selectedTaskStage === index
							? 'bg-green-tertiary'
							: 'hover:opacity-70'
					}`}
					onClick={() => handleSelectTaskStage(index)}
				>
					{taskStage}
				</span>
			))}
		</div>
	);
}

const TASK_STAGES = ['Aprendizaje', 'Colaboración', 'Evaluación'];

export default TaskStageSelect;
