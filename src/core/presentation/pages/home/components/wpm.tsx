interface IWpm {
  value: number;
}

export const Wpm = ({ value, ...rest }: IWpm) => {
  return (
    <div {...rest}>
      <p className="text-1xl font-medium">WPM: {value}</p>
    </div>
  );
};
