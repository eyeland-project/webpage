import { useTranslation } from 'react-i18next';

import Footer from '@components/Footer';
import NavBar from '@components/NavBar';
import Title from '@components/Title';
import Lottie from 'lottie-react';
import accessibility from '@animations/AccessibilityColors.json';

function LearnMore() {
	const { t } = useTranslation('', { keyPrefix: 'learnMore' });

	return (
		<>
			<NavBar />
			<div className="mt-40 mx-20">
				<div className=" flex justify-between gap-20 items-center">
					<h1 className="font-bold text-6xl max-w-96 w-1/2">
						{t('title.part1')}
						<span className="font-normal"> {t('title.part2')}</span>
					</h1>
					<Lottie
						animationData={accessibility}
						loop={true}
						className="mr-20"
					/>
				</div>
				<Title
					title={t('sections.introduction.name')}
					textColor={'text-black'}
				/>
				<p className="text-xl">{t('sections.introduction.text')}</p>
				<Title
					title={t('sections.methodology.name')}
					textColor={'text-black'}
				/>
				<p className="text-xl">{t('sections.methodology.text')}</p>
				<Title
					title={t('sections.accessibility.name')}
					textColor={'text-black'}
				/>
				<p className="text-xl">
					{t('sections.accessibility.text.paragraph')}
				</p>
				<ul className="list-decimal list-inside text-xl ml-5">
					<li>{t('sections.accessibility.text.list.item1')}</li>
					<li>{t('sections.accessibility.text.list.item2')}</li>
					<li> {t('sections.accessibility.text.list.item3')}</li>
				</ul>
				<div className="mt-10 card border text-center text-2xl border-black">
					<p>{t('sections.finalCard.call2action')}</p>
					<p className="mt-10 font-bold">
						{t('sections.finalCard.final')}
					</p>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default LearnMore;
