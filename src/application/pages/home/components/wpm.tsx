interface IWpm {
  value: number;
}

export const Wpm = ({ value }: IWpm) => {
  return (
    <div>
      <p className="text-2xl">WPM: {value}</p>
    </div>
  );
};
