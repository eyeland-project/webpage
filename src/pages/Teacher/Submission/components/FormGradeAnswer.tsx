import Button from '@components/Button';
import {
	GradeAnswerCreate,
	GradeAnswerUpdate
} from '@interfaces/teacher/GradeAnswer.interface';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

function FormGradeAnswer({
	onFinish,
	defaultValues,
	action
}: {
	onFinish: (grade: GradeAnswerCreate | GradeAnswerUpdate) => void;
	defaultValues?: DefaultValues;
	action: 'create' | 'update';
}) {
	const { register, handleSubmit } = useForm<DefaultValues>({
		defaultValues
	});
	const [comment, setComment] = useState<string>(
		defaultValues?.comment ?? ''
	);

	const onSubmit = (data: DefaultValues) => {
		data.comment = comment;
		console.log('data', data);
		for (const key in data) {
			if (data[key as keyof GradeAnswerUpdate] === '') {
				delete data[key as keyof GradeAnswerUpdate];
			}
		}
		if (action === 'update') {
			const updateFields: GradeAnswerUpdate = data;
			if (defaultValues) {
				for (const key in updateFields) {
					if (
						updateFields[key as keyof GradeAnswerUpdate] ===
						defaultValues[key as keyof DefaultValues]
					) {
						delete updateFields[key as keyof GradeAnswerUpdate];
					}
				}
			}
			if (Object.keys(updateFields).length !== 0) {
				onFinish(updateFields);
			}
		} else {
			const createFields: GradeAnswerCreate = data;
			onFinish(createFields);
		}
	};

	return <form></form>;
}

interface DefaultValues {
	grade: number;
	comment?: string | null;
}

export default FormGradeAnswer;
