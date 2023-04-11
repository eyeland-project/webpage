function ImgAbsolute({ src, alt }: { src: string; alt?: string }) {
	return (
		<div className="relative overflow-hidden w-full h-full">
			<img
				src={src}
				alt={alt || 'Image'}
				className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"
			/>
		</div>
	);
}

export default ImgAbsolute;
