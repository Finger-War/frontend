interface IWpm {
  value: number;
}

export const Wpm = ({ value }: IWpm) => {
  return (
    <div id="wpm">
      <p className="text-2xl">WPM: {value}</p>
    </div>
  );
};
