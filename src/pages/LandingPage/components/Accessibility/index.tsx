import { useRef, useState } from 'react';

import AccessibilityBanner from '@images/AccessibilityBanner.svg';
import Button from '@pages/LandingPage/components/Accessibility/Button';
import Mouse from '@icons/Mouse.svg';
import Title from '@components/Title';
import { useTranslation } from 'react-i18next';

function Accesibility() {
	const [classAccesibility, setClassAccesibility] = useState(
		'bg-white text-black'
	);
	const [classAccesibilityP, setClassAccesibilityP] = useState(
		'leading-relaxed text-base md:text-2xl font-Poppins tracking-normal'
	);
	const { t } = useTranslation('', { keyPrefix: 'landingPage.accessibility' });

	const description = useRef<HTMLParagraphElement>(null);

	return (
		<div
			className={
				'flex flex-col items-center justify-center px-5 pb-10 ' +
				classAccesibility
			}
		>
			<Title
				title={t('title')}
				textColor={
					classAccesibility.includes('text-black')
						? 'text-black'
						: 'text-white'
				}
			/>
			<div className="mt-10 flex flex-col items-center justify-center gap-20 md:flex-row xl:w-[1300px]">
				<p
					className={
						'relative -top-10 font-light md:w-96 ' +
						classAccesibilityP
					}
					ref={description}
				>
					{t('description')}
				</p>
				<div className="relative flex">
					<img
						src={AccessibilityBanner}
						alt=""
						className="w-[500px]"
					/>
					<div className="group absolute -top-10 left-0 right-0 mx-auto flex h-20 w-20 translate-x-1/2 items-center justify-center rounded-full  bg-green-secondary shadow-lg hover:cursor-default xl:-top-14 xl:h-28 xl:w-28 ">
						<img
							src={Mouse}
							alt=""
							className="absolute h-14 w-14 transition-all group-hover:opacity-0 xl:h-16 xl:w-16"
						/>
						<p className="absolute px-5 text-center text-xs font-bold  text-white opacity-0 transition-all group-hover:opacity-100 xl:text-base">
							{t('tryItYourself')}
						</p>
					</div>
					<div>
						{/* Leer página */}
						<Button
							className={'top-[6%] left-[5%]'}
							onClick={() => {
								window.speechSynthesis.speak(
									new SpeechSynthesisUtterance(
										description.current?.innerText
									)
								);
							}}
						/>

						{/* Contraste */}
						<Button
							className={'top-[6%] left-[33%]'}
							onClick={() => {
								if (classAccesibility.includes('bg-white')) {
									setClassAccesibility('bg-black text-white');
								} else {
									setClassAccesibility('bg-white text-black');
								}
							}}
						/>

						{/* Aumentar tamaño */}
						<Button
							className={'top-[29%] left-[5%]'}
							onClick={() => {
								if (
									classAccesibilityP.includes(
										'text-base md:text-2xl'
									)
								) {
									setClassAccesibilityP(
										classAccesibilityP.replace(
											'text-base md:text-2xl',
											'text-lg md:text-3xl'
										)
									);
								} else if (
									classAccesibilityP.includes(
										'text-lg md:text-3xl'
									)
								) {
									setClassAccesibilityP(
										classAccesibilityP.replace(
											'text-lg md:text-3xl',
											'text-xl md:text-4xl'
										)
									);
								} else if (
									classAccesibilityP.includes(
										'text-xl md:text-4xl'
									)
								) {
									setClassAccesibilityP(
										classAccesibilityP.replace(
											'text-xl md:text-4xl',
											'text-base md:text-2xl'
										)
									);
								}
							}}
						/>

						{/* Cambiar fuente */}
						<Button
							className="top-[29%] left-[33%]"
							onClick={() => {
								if (
									classAccesibilityP.includes('font-Poppins')
								) {
									setClassAccesibilityP(
										classAccesibilityP.replace(
											'font-Poppins',
											'font-sans'
										)
									);
								} else if (
									classAccesibilityP.includes('font-sans')
								) {
									setClassAccesibilityP(
										classAccesibilityP.replace(
											'font-sans',
											'font-serif'
										)
									);
								} else if (
									classAccesibilityP.includes('font-serif')
								) {
									setClassAccesibilityP(
										classAccesibilityP.replace(
											'font-serif',
											'font-mono'
										)
									);
								} else if (
									classAccesibilityP.includes('font-mono')
								) {
									setClassAccesibilityP(
										classAccesibilityP.replace(
											'font-mono',
											'font-Poppins'
										)
									);
								}
							}}
						/>

						{/* Cambiar espaciado */}
						<Button
							className="top-[52%] left-[5%]"
							onClick={() => {
								if (
									classAccesibilityP.includes(
										'tracking-normal'
									)
								) {
									setClassAccesibilityP(
										classAccesibilityP.replace(
											'tracking-normal',
											'tracking-widest'
										)
									);
								} else if (
									classAccesibilityP.includes(
										'tracking-widest'
									)
								) {
									setClassAccesibilityP(
										classAccesibilityP.replace(
											'tracking-widest',
											'tracking-normal'
										)
									);
								}
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Accesibility;
