import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import Button from '@components/Button';

import {
	StudentCreate,
	StudentUpdate
} from '@interfaces/teacher/Student.interface';

import QuestionIcon from '@icons/QuestionMark.svg';
import {
	blindnessAcuities,
	colorDeficiencies,
	visualFieldDefects
} from '@constants/visualDisease.constant';

function StudentForm({
	onFinish,
	defaultValues,
	action,
	onCancel
}: {
	onFinish: (student: StudentUpdate | StudentCreate) => void;
	defaultValues?: DefaultValues;
	action: 'create' | 'update';
	onCancel: () => void;
}) {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		clearErrors
	} = useForm<Inputs>({ defaultValues });

	// states
	const [step, setStep] = useState(1);
	const [finishError, setFinishError] = useState('');

	const onSubmit: SubmitHandler<Inputs> = ({ confirmPassword, ...data }) => {
		for (const key in data) {
			if (data[key as keyof StudentUpdate] === '') {
				delete data[key as keyof StudentUpdate];
			}
		}
		if (action === 'update') {
			const updateFields: StudentUpdate = data;
			if (defaultValues) {
				for (const key in updateFields) {
					if (
						updateFields[key as keyof StudentUpdate] ===
						defaultValues[key as keyof DefaultValues]
					) {
						delete updateFields[key as keyof StudentUpdate];
					}
				}
			}
			if (Object.keys(updateFields).length === 0) {
				setFinishErrorTimeout('No se ha modificado ningún campo');
			} else {
				onFinish(updateFields);
			}
		} else {
			const createFields: StudentCreate = data;
			onFinish(createFields);
		}
	};

	const onChangeForm = () => {
		if (finishError) setFinishError('');
	};

	const setFinishErrorTimeout = (error: string) => {
		if (finishError) return;
		setFinishError(error);
		setTimeout(() => {
			setFinishError('');
		}, 2000);
	};

	useEffect(() => {
		console.log(errors);
		if (Object.keys(errors).length) {
			setFinishErrorTimeout('Por favor, revise los campos');
		}
	}, [errors]);

	return (
		<div className="bg-white flex flex-col gap-4 px-8 rounded-md h-full min-w-[400px]">
			<div className="font-bold text-xl text-center">
				{action === 'create'
					? 'Registrar estudiante'
					: 'Actualizar datos de estudiante'}
			</div>
			<hr className="border-t border-gray-700" />
			<form
				className="flex flex-col grow justify-between pb-4 h-full"
				onChange={onChangeForm}
			>
				<div className="flex gap-0 justify-center items-center">
					<div
						className="flex flex-col justify-center cursor-pointer bg-green-primary rounded-full text-sm w-8 h-8 text-center text-white font-semibold"
						onClick={() => step !== 1 && setStep(1)}
					>
						1
					</div>
					<hr
						className={`w-8 border-2 ${
							step < 2
								? 'border-gray-primary'
								: 'border-green-primary'
						}`}
					/>
					<div
						className={`flex flex-col justify-center cursor-pointer rounded-full text-sm w-8 h-8 text-center text-white font-semibold ${
							step < 2 ? 'bg-gray-primary' : 'bg-green-primary'
						}`}
						onClick={() => step !== 2 && setStep(2)}
					>
						2
					</div>
				</div>
				<div className="relative h-full mt-4">
					<div
						className={`absolute bg-white h-full w-full flex flex-col justify-between ${
							step === 1 ? '' : 'invisible'
						}`}
					>
						<div>
							<div className="flex gap-3">
								<div className="flex flex-col gap-1 grow relative">
									<label
										htmlFor="form-student-username"
										className="text-sm font-medium"
									>
										Usuario
									</label>
									<input
										type="text"
										id="form-student-username"
										className="text-sm h-min py-2 outline-none border border-gray-primary rounded-md"
										// defaultValue={defaultValues?.username}
										{...register('username', {
											required: true,
											minLength: 2,
											maxLength: 20,
											pattern: /^[a-zA-Z][a-zA-Z0-9_]*$/i
										})}
									/>
									{errors.username && (
										<span className="text-xs text-red-primary absolute bottom-0 transform translate-y-full">
											Nombre de usuario no válido
										</span>
									)}
								</div>
							</div>
							<div className="flex gap-3 mt-6">
								<div className="flex flex-col gap-1 grow relative">
									<label
										htmlFor="form-student-password"
										className="text-sm font-medium"
									>
										Contraseña
									</label>
									<input
										type="password"
										id="form-student-password"
										className="text-sm h-min py-2 outline-none border border-gray-primary rounded-md"
										{...register('password', {
											required: action === 'create',
											minLength: 5,
											maxLength: 50,
											onChange: ({
												target: { value }
											}) => {
												if (
													action === 'update' &&
													value === '' &&
													errors.confirmPassword
												) {
													clearErrors(
														'confirmPassword'
													);
												}
											}
										})}
									/>
									{errors.password && (
										<span className="text-xs text-red-primary absolute bottom-0 transform translate-y-full">
											Contraseña no válida
										</span>
									)}
								</div>
								<div className="flex flex-col gap-1 grow relative">
									<label
										htmlFor="form-student-confirmPassword"
										className="text-sm font-medium"
									>
										Confirmar contraseña
									</label>
									<input
										type="password"
										id="form-student-confirmPassword"
										className="text-sm h-min py-2 outline-none border border-gray-primary rounded-md"
										{...register('confirmPassword', {
											required: action === 'create',
											validate: (value) =>
												value === watch('password')
										})}
									/>
									{errors.confirmPassword && (
										<span className="text-xs text-red-primary absolute bottom-0 transform translate-y-full">
											Las contraseñas no coinciden
										</span>
									)}
								</div>
							</div>
							<div className="flex gap-3 mt-6">
								<div className="flex flex-col gap-1 grow relative">
									<label
										htmlFor="form-student-firstName"
										className="text-sm font-medium"
									>
										Nombres
									</label>
									<input
										type="text"
										id="form-student-firstName"
										className="text-sm h-min py-2 outline-none border border-gray-primary rounded-md"
										// defaultValue={defaultValues?.firstName}
										{...register('firstName', {
											required: true,
											minLength: 2,
											maxLength: 50,
											pattern: /^[a-zA-ZÀ-ÿ\s]{1,40}$/i
										})}
									/>
									{errors.firstName && (
										<span className="text-xs text-red-primary absolute bottom-0 transform translate-y-full">
											Nombre no válido
										</span>
									)}
								</div>
								<div className="flex flex-col gap-1 grow relative">
									<label
										htmlFor="form-student-lastName"
										className="text-sm font-medium"
									>
										Apellidos
									</label>
									<input
										type="text"
										id="form-student-lastName"
										className="text-sm h-min py-2 outline-none border border-gray-primary rounded-md"
										// defaultValue={defaultValues?.lastName}
										{...register('lastName', {
											required: true
										})}
									/>
									{errors.lastName && (
										<span className="text-xs text-red-primary absolute bottom-0 transform translate-y-full">
											Apellido no válido
										</span>
									)}
								</div>
							</div>
							<div className="flex gap-3 mt-6">
								<div className="flex flex-col gap-1">
									<label
										htmlFor="form-student-phone"
										className="text-sm font-medium"
									>
										Teléfono
									</label>
									<div
										id="form-student-phone"
										className="flex gap-1"
									>
										<select
											// id="form-student-phoneCode"
											// defaultValue={
											// 	defaultValues?.phoneCode || ''
											// }
											{...register('phoneCode', {
												// required: true
											})}
											className="outline-none border border-gray-primary rounded-md"
										>
											<option value="57">+57</option>
										</select>
										<div className="flex flex-col gap-1 grow relative">
											<input
												type="text"
												// id="form-student-phoneNumber"
												className="text-sm h-min py-2 outline-none border border-gray-primary rounded-md"
												// defaultValue={
												// 	defaultValues?.phoneNumber ||
												// 	''
												// }
												{...register('phoneNumber', {
													// required: true,
													minLength: 10,
													maxLength: 10,
													pattern: /^[0-9]{10}$/i
												})}
											/>
											{errors.phoneNumber && (
												<span className="text-xs text-red-primary absolute bottom-0 transform translate-y-full">
													Teléfono no válido
												</span>
											)}
										</div>
									</div>
								</div>
								<div className="flex flex-col gap-1 grow relative">
									<label
										htmlFor="form-student-email"
										className="text-sm font-medium"
									>
										Correo electrónico
									</label>
									<input
										type="email"
										id="form-student-email"
										className="text-sm h-min py-2 outline-none border border-gray-primary rounded-md"
										// defaultValue={
										// 	defaultValues?.email || ''
										// }
										{...register('email', {
											// required: true,
											pattern:
												/^[a-z][a-z0-9._]*@[a-z0-9.-]+\.[a-z]{2,4}$/i
										})}
									/>
									{errors.email && (
										<span className="text-xs text-red-primary absolute bottom-0 transform translate-y-full">
											Correo electrónico no válido
										</span>
									)}
								</div>
							</div>
						</div>
						<div className="mt-7 flex justify-end gap-2">
							<Button
								className="bg-gray-primary px-6"
								onClick={onCancel}
							>
								Cancelar
							</Button>
							<Button
								className="bg-green-primary px-6"
								onClick={() => setStep(2)}
							>
								Siguiente
							</Button>
						</div>
					</div>
					<div
						className={`absolute bg-white h-full w-full flex flex-col justify-between ${
							step === 2 ? '' : 'invisible'
						}`}
					>
						<div>
							<div className="flex flex-col gap-1 grow relative">
								<label
									htmlFor="form-student-blindnessAcuityCode"
									className="text-sm font-medium flex gap-2 items-center"
								>
									<span>Agudeza de la ceguera</span>
									<img
										src={QuestionIcon}
										alt="Más información"
										className="cursor-pointer w-4- h-4"
									/>
								</label>
								<select
									id="form-student-blindnessAcuityCode"
									// defaultValue={
									// 	defaultValues?.blindnessAcuityCode
									// }
									{...register('blindnessAcuityCode', {
										required: true
									})}
									className="py-2 outline-none border border-gray-primary rounded-md"
								>
									{blindnessAcuities.map(
										({ code, name }, i) => (
											<option key={i} value={code}>
												{name}
											</option>
										)
									)}
								</select>
							</div>
							<div className="flex flex-col gap-1 grow mt-6">
								<label
									htmlFor="form-student-colorDeficiencyCode"
									className="text-sm font-medium flex gap-2 items-center"
								>
									<span>
										Deficiencia de percepción de color
									</span>
									<img
										src={QuestionIcon}
										alt="Más información"
										className="cursor-pointer w-4- h-4"
									/>
								</label>
								<select
									id="form-student-colorDeficiencyCode"
									// defaultValue={
									// 	defaultValues?.colorDeficiencyCode
									// }
									{...register('colorDeficiencyCode', {
										required: true
									})}
									className="py-2 outline-none border border-gray-primary rounded-md"
								>
									{colorDeficiencies.map(
										({ code, name }, i) => (
											<option key={i} value={code}>
												{name}
											</option>
										)
									)}
								</select>
							</div>
							<div className="flex flex-col gap-1 grow mt-6">
								<label
									htmlFor="form-student-visualFieldDefectCode"
									className="text-sm font-medium flex gap-2 items-center"
								>
									<span>Defecto del campo visual</span>
									<img
										src={QuestionIcon}
										alt="Más información"
										className="cursor-pointer w-4- h-4"
									/>
								</label>
								<select
									id="form-student-visualFieldDefectCode"
									// defaultValue={
									// 	defaultValues?.visualFieldDefectCode
									// }
									{...register('visualFieldDefectCode', {
										required: true
									})}
									className="py-2 outline-none border border-gray-primary rounded-md"
								>
									{visualFieldDefects.map(
										({ code, name }, i) => (
											<option key={i} value={code}>
												{name}
											</option>
										)
									)}
								</select>
							</div>
						</div>
						<div className="mt-7">
							<div className=" flex justify-end gap-2">
								<Button
									className="bg-gray-primary px-6"
									onClick={onCancel}
								>
									Cancelar
								</Button>

								<Button
									className="bg-green-primary px-6"
									onClick={() => {
										if (Object.keys(errors).length) {
											setFinishErrorTimeout(
												'Por favor, revise los campos'
											);
										}
										handleSubmit(onSubmit)();
									}}
								>
									Finalizar
								</Button>
							</div>
							<div className="text-sm text-red-primary text-end">
								{finishError}
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}

interface Inputs {
	blindnessAcuityCode: string;
	visualFieldDefectCode: string;
	colorDeficiencyCode: string;
	firstName: string;
	lastName: string;
	username: string;
	email: string | null;
	phoneCode: string | null;
	phoneNumber: string | null;
	password: string;
	confirmPassword: string;
}

type DefaultValues = Omit<Inputs, 'password' | 'confirmPassword'>;

export default StudentForm;
