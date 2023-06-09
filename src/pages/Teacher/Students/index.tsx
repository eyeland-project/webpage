import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useTeacherContext from '@hooks/useTeacherContext';
import useStudent from '@hooks/useStudent';
import useCourse from '@hooks/useCourse';
import useConfirmDialog from '@hooks/useConfirmDialog';
import { useTranslation } from 'react-i18next';

import Button from '@components/Button';
import Modal from '@components/Modal';
import Ribbon from '@pages/Teacher/components/Ribbon';
import TableStudents from '@pages/Teacher/Students/components/TableStudents';
import FormStudentUpdate from '@pages/Teacher/Students/components/FormStudentUpdate';
import FormStudentCreate from '@pages/Teacher/Students/components/FormStudentCreate';

import { parseNumericParam } from '@utils/routing.utils';

import DataGridIcon from '@icons/DataGrid.svg';
import {
	StudentCreate,
	StudentSummary,
	StudentUpdate
} from '@interfaces/teacher/Student.interface';
import LoadingScreen from '@components/LoadingScreen';

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
	// useConfirmDialog
	const { ConfirmDialog, showDialog } = useConfirmDialog();

	// states
	const [idCourse, setIdCourse] = useState<number | null>(
		parseNumericParam(searchParams.get('idCourse'))
	);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

	const { t } = useTranslation('', { keyPrefix: 'teacher.students' });

	// actions
	// create
	const handleCreateStudent = () => {
		if (idCourse === null) return;
		setModalContent(
			<FormStudentCreate
				onCancel={closeForm}
				idCourse={idCourse}
				onFinishCreate={onFinishCreate}
			/>
		);
		setIsModalOpen(true);
	};

	// update
	const handleUpdateStudent = (idStudent: number) => {
		if (idCourse === null) return;
		setModalContent(
			<FormStudentUpdate
				onCancel={closeForm}
				idCourse={idCourse}
				idStudent={idStudent}
				onFinishUpdate={onFinishUpdate}
			/>
		);
		setIsModalOpen(true);
	};

	// delete
	const handleDeleteStudent = (idStudent: number) => {
		showDialog({
			title: t<string>('deleteDialog.title'),
			message: t<string>('deleteDialog.message'),
			onConfirm: () => onFinishDelete(idStudent)
		});
	};

	// actions completed
	// create
	const onFinishCreate = (
		err: unknown,
		idStudent: number,
		fields: Omit<StudentCreate, 'password'>
	) => {
		if (students === null) return;
		if (err) {
			toast.error(t('addDialog.error'));
			return;
		}
		const { email, firstName, lastName, phoneCode, username, phoneNumber } =
			fields;
		const newStudent: StudentSummary = {
			email: email || null,
			firstName,
			id: idStudent,
			lastName,
			phone: phoneNumber
				? {
						countryCode: phoneCode || null,
						number: phoneNumber
				  }
				: null,
			username
		};
		setStudents([newStudent, ...students]);
		setIsModalOpen(false);
		setModalContent(null);
		toast.success(t('addDialog.success'));
	};

	// update
	const onFinishUpdate = (
		err: unknown,
		idStudent: number,
		fields: StudentUpdate
	) => {
		if (students === null) return;
		if (err) {
			toast.error(t('updateDialog.error'));
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
		toast.success(t('updateDialog.success'));
	};

	const onFinishDelete = async (idStudent: number) => {
		if (idCourse === null) return;
		try {
			await deleteStudent(idCourse, idStudent);
			setStudents(
				students!.filter((student) => student.id !== idStudent)
			);
			toast.success(t('deleteDialog.success'));
		} catch (err) {
			toast.error(t('deleteDialog.error'));
		}
	};

	const closeForm = () => {
		setIsModalOpen(false);
		setModalContent(null);
	};

	useEffect(() => {
		setIdCourse(parseNumericParam(searchParams.get('idCourse')));
	}, [searchParams]);

	useEffect(() => {
		if (idCourse === null) {
			return navigate('/teacher/courses');
		}
		if (idSelectedCourse !== idCourse) setIdSelectedCourse(idCourse);
		if (!course || course.id !== idCourse) {
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
		<div className="min-h-screen">
			<ConfirmDialog />
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
						{(course?.name ? `${course.name} - ` : '') +
							t('ribbon')}
					</div>
				</>
			</Ribbon>
			<div className="pt-10 h-full relative flex flex-col items-center gap-10">
				<div className="flex flex-col items-center gap-3 mt-4">
					<div className="shadow-md px-36 font-semibold text-2xl flex flex-col justify-center">
						{t('title')}
					</div>
					<Button
						className="rounded-xl relative hover:scale-105 transition duration-200 ease-in-out"
						onClick={handleCreateStudent}
					>
						{t('addButton')}
						{/* <img
							src={AddIcon}
							alt="Nuevo"
							className="w-3/5 h-3/5 absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
						/> */}
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
					<LoadingScreen loading={loadingStudents} />
				)}
			</div>
		</div>
	);
}

export default Students;
