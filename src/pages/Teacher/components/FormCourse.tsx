import Button from '@components/Button';
import { useForm, SubmitHandler } from 'react-hook-form';

import useCourse from '@hooks/useCourse';

import { CourseCreate } from '@interfaces/teacher/Course.interface';

function FormCourse({
	onFinish
}: {
	onFinish: (
		err: unknown | null,
		idCourse: number,
		fields: CourseCreate
	) => void;
}) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
		watch
	} = useForm<CourseCreate>();

	const { createCourse } = useCourse();

	const onSubmit: SubmitHandler<CourseCreate> = async (data) => {
		try {
			const { id } = await createCourse(data);
			onFinish(null, id, data);
		} catch (err) {
			onFinish(err, -1, data);
		}
	};

	return (
		<div className="shadow-form bg-white flex flex-col gap-4 py-6 pb-4 px-8 rounded-md w-96">
			<div className="font-bold text-xl text-center">Crear curso</div>
			<hr className="border-t border-gray-700" />
			<form
				className="flex flex-col"
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						e.preventDefault();
						handleSubmit(onSubmit)();
					}
				}}
			>
				<div className="flex gap-3">
					<div className="flex flex-col gap-1 grow relative">
						<label
							htmlFor="form-course-name"
							className="text-sm font-medium"
						>
							Nombre
						</label>
						<input
							type="text"
							id="form-course-name"
							className="text-sm h-min py-2"
							{...register('name', {
								required: true,
								minLength: 1,
								maxLength: 20,
								pattern: /^[a-zA-Z0-9][a-zA-Z0-9_\-+ ]*$/,
								onChange: ({ target: { value } }) => {
									if (!value) {
										setTimeout(() => {
											const value = watch('name');
											if (!value) {
												// If the value is still empty
												console.log('Empty');

												clearErrors();
											}
										}, 3000);
									}
								}
							})}
						/>
						{errors.name && (
							<span className="text-xs text-red-primary absolute bottom-0 transform translate-y-full">
								Nombre inválido
							</span>
						)}
					</div>
				</div>
				<div className="mt-7 flex justify-end">
					<Button onClick={handleSubmit(onSubmit)}>Crear</Button>
				</div>
			</form>
		</div>
	);
}

export default FormCourse;
