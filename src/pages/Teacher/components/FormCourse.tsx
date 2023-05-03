import Button from '@components/Button';
import { useForm } from 'react-hook-form';

function FormCourse() {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();

	return (
		<div className="shadow-form bg-white flex flex-col gap-4 py-6 pb-4 px-8 rounded-md">
			<div className="font-bold text-xl text-center">Crear curso</div>
			<hr className="border-t border-gray-700" />
			<form className="flex flex-col">
				<div className="flex gap-3">
					<div className="flex flex-col gap-1">
						<label
							htmlFor="form-course-name"
							className="text-sm font-medium"
						>
							Nombre
						</label>
						<input
							type="text"
							name="form-course-name"
							id="form-course-name"
							className="text-sm h-min py-2"
						/>
					</div>
					<div className="flex flex-col gap-1">
						<label
							htmlFor="form-course-descr"
							className="text-sm font-medium"
						>
							Descripción
						</label>
						<input
							type="text"
							name="form-course-descr"
							id="form-course-descr"
							className="text-sm h-min py-2"
						/>
					</div>
				</div>
				<div className="mt-7 flex justify-end">
					<Button>Crear</Button>
				</div>
			</form>
		</div>
	);
}

export default FormCourse;
