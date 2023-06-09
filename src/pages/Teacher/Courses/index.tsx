import { useEffect } from 'react';
import Lottie from 'lottie-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useTeacherContext from '@hooks/useTeacherContext';
import useConfirmDialog from '@hooks/useConfirmDialog';
import useCourse from '@hooks/useCourse';
import { useTranslation } from 'react-i18next';

import FormCourse from '@pages/Teacher/Courses/components/FormCourse';
import Ribbon from '@pages/Teacher/components/Ribbon';

import { CourseCreate } from '@interfaces/teacher/Course.interface';

import GraduationCap from '@icons/GraduationCap.svg';
import Mail from '@icons/Mail.svg';
import Location from '@icons/Location.svg';
import Website from '@icons/Website.svg';
import Phone from '@icons/Phone.svg';
import FlyingStudents from '@animations/FlyingStudents.json';

function Courses() {
	// useTeacherContext
	const {
		coursesData: { setIdSelectedCourse, setCourses, courses }
	} = useTeacherContext();
	// useConfirmDialog
	const { ConfirmDialog, showDialog } = useConfirmDialog();
	// useCourse
	const { createCourse } = useCourse();

	const { t } = useTranslation('', { keyPrefix: 'teacher.courses' });

	const onCreateCourse = (fields: CourseCreate) => {
		showDialog({
			title: t<string>('dialog.title'),
			message: t<string>('dialog.message'),
			onConfirm: () => finishCreate(fields)
		});
	};

	const finishCreate = async (fields: CourseCreate) => {
		if (!courses) {
			console.log('No courses');
			return;
		}
		try {
			const { id } = await createCourse(fields);
			setCourses([...courses, { id, name: fields.name }]);
			toast.success(t('dialog.success'));
		} catch (err) {
			toast.error(t('dialog.error'));
		}
	};

	useEffect(() => {
		setIdSelectedCourse(null);
	}, []);

	return (
		<>
			<ConfirmDialog />
			<ToastContainer />
			<Ribbon>
				<img
					src={GraduationCap}
					alt="GraduationCap"
					className="w-5 h-5"
				/>
				<div className="text-white font-semibold">
					Institución Educativa Distrital La Magdalena
				</div>
			</Ribbon>
			<div className="px-8 pb-6 relative">
				<div className="text-center mx-auto w-4/6">
					<Lottie animationData={FlyingStudents} loop={true} />
				</div>
				<div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 mt-14 sm:mt-6">
					<FormCourse onFinish={onCreateCourse} />
				</div>
				<div className="mt-20">
					<div className="font-bold text-lg">
						{t('aditionalInformation')}
					</div>
					<div className="mt-2 font-medium flex flex-col gap-1">
						<div className="flex gap-2">
							<img src={Location} alt="Location" />
							Calle 41 #7-07, Barranquilla
						</div>
						<div className="flex gap-2">
							<img src={Phone} alt="Phone" />
							6053641256
						</div>
						<div className="flex gap-2">
							<img src={Mail} alt="Mail" />
							<a href="mailto:info@insedmag.edu.co">
								mailto:info@insedmag.edu.co
							</a>
						</div>
						<div className="flex gap-2">
							<img src={Website} alt="Website" />
							<a
								href="https://insedmag.edu.co"
								target="_blank"
								referrerPolicy="no-referrer"
							>
								https://insedmag.edu.co
							</a>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Courses;
