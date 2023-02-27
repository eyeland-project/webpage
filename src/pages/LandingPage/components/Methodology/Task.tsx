interface Props {
    title: string;
    description: string;
    img: string;
    index: number;
    classTask: string;
    setClassTask: React.Dispatch<React.SetStateAction<string>>;
    classTaskP: string;
    setClassTaskP: React.Dispatch<React.SetStateAction<string>>;
    classTaskD: string;
    setClassTaskD: React.Dispatch<React.SetStateAction<string>>;
    setCount: React.Dispatch<React.SetStateAction<number>>;
}


function Task({
    title,
    description,
    img,
    index,
    classTask,
    setClassTask,
    classTaskP,
    setClassTaskP,
    classTaskD,
    setClassTaskD,
    setCount,
}: Props) {
    return (
        <div
            className={`relative flex transition-all duration-1000 ease-in-out md:absolute cursor-pointer ${classTask}`}
        >
            <img src={img} className="w-28 md:w-32" />
            <h5
                className={`absolute top-10 text-base font-bold transition-all duration-100 ease-in-out max-md:right-32 md:text-xl ${classTaskP}`}
            >
                {title}
            </h5>
            <p
                className={`absolute right-32 top-16 flex w-48 text-end text-sm transition-all duration-1000 ease-in-out md:right-auto md:w-auto md:text-base ${classTaskD}`}
            >
                {description}
            </p>
            <div
                className="absolute top-5 h-56 w-screen opacity-0"
                onClick={() => {
                    if (index !== 1) {
                        setClassTask(
                            `${classTask} md:translate-x-[500px] xl:translate-x-[900px]`
                        );
                    } else {
                        setClassTask(
                            `${classTask} md:translate-x-[170px] xl:translate-x-[600px]`
                        );
                    }

                    if (title === "During-Task") {
                        setClassTaskP("md:top-8 md:-translate-x-36 w-36")
                    } else if (title === "Post-Task") {
                        setClassTaskP("md:top-8 md:-translate-x-32");
                    } else {
                        setClassTaskP("md:top-8 md:-translate-x-28");
                    }
                    setClassTaskD("md:top-16 md:-translate-x-36 md:opcity-100");
                    setCount(index);
                }}
            ></div>
        </div>
    );
}

export default Task;
