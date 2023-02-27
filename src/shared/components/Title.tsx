interface Props {
  textColor: string;
  title: string;
}

function Title({ textColor, title }: Props) {
  const lineClass = "w-10 xl:w-20 border-" + textColor.split("-")[1];

  return (
    <div className="flex items-center justify-center gap-5 pt-10 pb-3">
      <hr className={lineClass} />
      <h2 className={textColor}>{title}</h2>
      <hr className={lineClass} />
    </div>
  );
}

export default Title;
