import {
	QuestionDetail,
	QuestionDuringtaskDetail
} from '@interfaces/teacher/Question.interface';

function QuestionContentInteractive({
	question
}: {
	question: QuestionDetail;
}) {
	let content = question.content.split('\\').at(-1)!;
	let { memoryPro, superRadar } = question as QuestionDuringtaskDetail;
	if (memoryPro === null || superRadar === null) return <>{content}</>;

	const matches = content.match(/(\[[^\]]*\])|(\{[^\}]*\})/g);
	if (!matches) return <>{content}</>;

	memoryPro = [...memoryPro];
	superRadar = [...superRadar];
	const contentParts: ContentPart[] = [];
	matches.forEach((match) => {
		const [before, ...rest] = content.split(match);
		contentParts.push({ content: before });
		contentParts.push({
			content: match.slice(1, -1),
			transl: (match[0] === '[' ? superRadar : memoryPro).splice(0, 1)[0]
		});
		content = rest.join(match);
	});
	contentParts.push({ content });

	return (
		<span className="">
			{contentParts.map(({ content, transl }, index) =>
				transl !== undefined ? (
					<span
						className="font-semibold cursor-default hover:underline"
						title={transl}
						key={index}
					>
						{content}
					</span>
				) : (
					<span key={index}>{content}</span>
				)
			)}
		</span>
	);
}

interface ContentPart {
	content: string;
	transl?: string;
}

export default QuestionContentInteractive;
