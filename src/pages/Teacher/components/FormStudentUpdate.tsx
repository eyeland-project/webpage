import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import useStudent from '@hooks/useStudent';

import { StudentUpdate } from '@interfaces/teacher/Student.interface';

import FormStudent from '@pages/Teacher/components/FormStudent';
import Loading from 'react-loading';

function FormStudentUpdate({
	idCourse,
	idStudent,
	onFinishUpdate,
	onCancel
}: {
	idCourse: number;
	idStudent: number;
	onFinishUpdate: (
		err: unknown | null,
		idStudente: number,
		fields: StudentUpdate
	) => void;
	onCancel: () => void;
}) {
	const { getStudent, student, setStudent, loading, updateStudent } =
		useStudent();

	const onFinish = async (student: StudentUpdate) => {
		try {
			await updateStudent(idCourse, idStudent, student);
			onFinishUpdate(null, idStudent, student);
		} catch (err) {
			onFinishUpdate(err, idStudent, student);
		}
	};

	const getDefaultValues = () => {
		if (!student) return undefined;
		const {
			blindnessAcuity: { code: blindnessAcuityCode },
			colorDeficiency: { code: colorDeficiencyCode },
			visualFieldDefect: { code: visualFieldDefectCode },
			email,
			firstName,
			lastName,
			username,
			phone
		} = student;
		return {
			blindnessAcuityCode,
			visualFieldDefectCode,
			colorDeficiencyCode,
			firstName,
			lastName,
			username,
			email,
			phoneCode: phone?.countryCode || null,
			phoneNumber: phone?.number || null
		};
	};

	useEffect(() => {
		if (!student) {
			getStudent(idCourse, idStudent).catch(() => {
				if (student) setStudent(null);
			});
		}
	}, []);

	return student ? (
		<FormStudent
			action="update"
			defaultValues={getDefaultValues()}
			onFinish={onFinish}
			onCancel={onCancel}
		/>
	) : (
		<div className="flex flex-col grow justify-center items-center h-full">
			{loading ? (
				<Loading type="spin" color="#6C6C6C" />
			) : (
				<div className="italic w-3/5 text-center text-lg">
					Error de servidor
				</div>
			)}
		</div>
	);
}

export default FormStudentUpdate;
