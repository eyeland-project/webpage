import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Loading from 'react-loading';
import { ToastContainer, toast } from 'react-toastify';

import useTeacherContext from '@hooks/useTeacherContext';
import useStudent from '@hooks/useStudent';
import useCourse from '@hooks/useCourse';

import Ribbon from '@pages/Teacher/components/Ribbon';

import Button from '@components/Button';
import TableStudents from '@pages/Teacher/components/TableStudents';

import { parseNumericParam } from '@utils/routing.utils';

import DataGridIcon from '@icons/DataGrid.svg';
import AddIcon from '@icons/Add.svg';
import Modal from '@components/Modal';
import FormStudentUpdate from './components/FormStudentUpdate';
import { StudentUpdate } from '@interfaces/teacher/Student.interface';

function Students() {
	// navigation
	const navigate = useNavigate();
	// query params
	const [searchParams] = useSearchParams();
	// context
	const {
		coursesData: {
			course,
			setCourse,
			idSelectedCourse,
			setIdSelectedCourse
		}
	} = useTeacherContext();
	// useStudents
	const {
		getStudents,
		students,
		setStudents,
		loading: loadingStudents,
		deleteStudent
	} = useStudent();
	const { getCourse } = useCourse();

	// states
	const [idCourse, setIdCourse] = useState<number | null>(
		parseNumericParam(searchParams.get('idCourse'))
	);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

	// actions
	// create
	const handleCreateStudent = () => {};
	// update
	const handleUpdateStudent = (idStudent: number) => {
		if (idCourse === null) return;
		setIsModalOpen(true);
		setModalContent(
			<FormStudentUpdate
				idCourse={idCourse}
				idStudent={idStudent}
				onFinishUpdate={onFinishUpdate}
			/>
		);
	};
	// delete
	const handleDeleteStudent = (idStudent: number) => {};

	// actions completed
	// create
	const onStudentCreated = () => {};
	// update
	const onFinishUpdate = (
		err: unknown,
		idStudent: number,
		fields: StudentUpdate
	) => {
		if (students === null) return;
		if (err) {
			toast.error('Error al actualizar el estudiante');
			return;
		}
		const newStudents = students.map((student) => {
			if (student.id === idStudent) {
				return { ...student, ...fields };
			}
			return student;
		});
		setStudents(newStudents);
		setIsModalOpen(false);
		setModalContent(null);
		toast.success('Estudiante actualizado');
	};
	// delete
	const onStudentDeleted = () => {};

	useEffect(() => {
		const idCourseNum = parseNumericParam(searchParams.get('idCourse'));
		if (idCourseNum === null) {
			return navigate('/teacher/courses');
		}
		if (idCourseNum !== idCourse) setIdCourse(idCourseNum);
	}, [searchParams]);

	useEffect(() => {
		if (idCourse === null) {
			return navigate('/teacher/courses');
		}
		if (idSelectedCourse !== idCourse) setIdSelectedCourse(idCourse);
		if (idSelectedCourse !== idCourse || !course) {
			getCourse(idCourse)
				.then((course) => {
					setCourse(course);
				})
				.catch(() => {
					if (course !== null) setCourse(null);
				});
			getStudents(idCourse).catch(() => {
				if (students !== null) setStudents(null);
			});
		}
	}, [idCourse]);

	useEffect(() => {
		if (!students && idCourse !== null) {
			getStudents(idCourse).catch(() => {
				if (students !== null) setStudents(null);
			});
		}
	}, []);

	if (idCourse === null) return <></>;

	return (
		<div className="h-screen">
			<Modal
				isOpen={isModalOpen}
				setIsOpen={setIsModalOpen}
				styles={{ content: { width: '45%' } }}
			>
				{modalContent}
			</Modal>
			<ToastContainer />
			<Ribbon>
				<>
					<img
						src={DataGridIcon}
						alt="GraduationCap"
						className="w-5 h-5"
					/>
					<div className="text-white font-semibold">
						{course?.name || ''}
					</div>
				</>
			</Ribbon>
			<div className="pt-12 h-full relative flex flex-col items-center gap-10">
				<div className="flex flex-row gap-3 mt-4">
					<div className="shadow-md px-36 font-semibold text-2xl flex flex-col justify-center">
						Listado de alumnos
					</div>
					<Button className="rounded-xl px-1 relative w-12 h-12 hover:scale-105 transition duration-200 ease-in-out">
						<img
							src={AddIcon}
							alt="Nuevo"
							className="w-3/5 h-3/5 absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
						/>
					</Button>
				</div>
				{students ? (
					<div className="pb-10">
						<TableStudents
							students={students}
							handleUpdateStudent={handleUpdateStudent}
							handleDeleteStudent={handleDeleteStudent}
						/>
					</div>
				) : (
					<div className="flex flex-col grow justify-center items-center h-full">
						{loadingStudents ? (
							<Loading type="spin" color="#0D9748" />
						) : (
							<div className="italic w-3/5 text-center text-lg">
								No se pudo obtener la información
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

export default Students;
