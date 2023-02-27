interface Props {
    children: React.ReactNode;
}

function Description({ children }: Props) {
    return (
        <p className="text text-start font-light leading-relaxed md:text-center md:text-2xl xl:w-[1000px]">
            {children}
        </p>
    );
}

export default Description;
