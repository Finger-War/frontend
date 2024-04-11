interface IWpm {
  value: number;
}

export const Wpm = ({ value, ...rest }: IWpm) => {
  return (
    <div {...rest}>
      <p className="text-2xl">WPM: {value}</p>
    </div>
  );
};
