import Button from '@components/Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CourseCreate } from '@interfaces/teacher/Course.interface';

function FormCourse({
	onFinish
}: {
	onFinish: (fields: CourseCreate) => void;
}) {
	// useForm
	const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
		watch
	} = useForm<CourseCreate>();
	// useConfirmDialog

	const { t } = useTranslation('', { keyPrefix: 'teacher.courses.form' });

	const onSubmit: SubmitHandler<CourseCreate> = (data) => {
		onFinish(data);
	};

	return (
		<div className="shadow-form bg-white flex flex-col gap-4 py-6 pb-4 px-8 rounded-md w-96">
			<div className="font-bold text-xl text-center">{t('title')}</div>
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
							{t('name')}
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
								{t('error')}
							</span>
						)}
					</div>
				</div>
				<div className="mt-7 flex justify-end">
					<Button onClick={handleSubmit(onSubmit)}>
						{t('submit')}
					</Button>
				</div>
			</form>
		</div>
	);
}

export default FormCourse;
