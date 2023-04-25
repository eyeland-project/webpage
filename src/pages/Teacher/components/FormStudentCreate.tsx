import useStudent from '@hooks/useStudent';
import { StudentCreate } from '@interfaces/teacher/Student.interface';
import FormStudent from '@pages/Teacher/components/FormStudent';

function FormStudentCreate({
	idCourse,
	onFinishCreate
}: {
	idCourse: number;
	onFinishCreate: (
		err: unknown | null,
		idStudente: number,
		fields: Omit<StudentCreate, 'password'>
	) => void;
}) {
	const { createStudent } = useStudent();

	const onFinish = async (fields: any) => {
		const student = fields as StudentCreate; // not the best solution
		try {
			const { id } = await createStudent(idCourse, student);
			const { password, ...fields } = student;
			onFinishCreate(null, id, fields);
		} catch (err) {
			onFinishCreate(err, -1, student);
		}
	};
	return <FormStudent action="create" onFinish={onFinish} />;
}

export default FormStudentCreate;
