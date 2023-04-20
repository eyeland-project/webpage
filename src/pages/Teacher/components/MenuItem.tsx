function MenuItem({
	src,
	alt,
	bgColor
}: {
	src: string;
	alt: string;
	bgColor: string;
}) {
	return (
		<div
			className={`rounded-xl w-12 h-12 cursor-pointer relative hover:scale-105 transition-all duration-300 bg-${bgColor} shadow-buttonNavbar`}
		>
			<img
				src={src}
				alt={alt}
				className="w-3/5 h-3/5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
			/>
		</div>
	);
}

export default MenuItem;
