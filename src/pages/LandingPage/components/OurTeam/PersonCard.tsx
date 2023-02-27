interface Props {
    name: string;
    img: string;
    link: string;
}

function PersonCard({ name, img, link }: Props) {
    return (
        <a
            href={link}
            className="card flex h-32 w-60 flex-wrap items-center justify-between font-bold xl:h-40 xl:w-80 xl:text-2xl"
        >
            <div className=" h-16 w-16 overflow-hidden rounded-full xl:h-20 xl:w-20">
                {/* The image has an alt attribute for accessibility, with the value being the person's name. */}
                <img src={img} alt={name} />
            </div>
            <p className="w-4/6 text-center">{name}</p>
        </a>
    );
}

export default PersonCard;
