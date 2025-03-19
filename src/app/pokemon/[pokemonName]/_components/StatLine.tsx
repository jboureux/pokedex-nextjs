interface StatLineProps {
  label: string;
  value: string | number;
  unit?: string;
}

const StatLine = (props: StatLineProps) => {
  return (
    <p>
      <span className="font-bold text-lg">{props.label}:</span> {props.value}{" "}
      {props.unit}
    </p>
  );
};

export default StatLine;
