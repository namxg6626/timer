interface ButtonGroupProps {
  primaryTitle: string;
  secondaryTitle: string;
  onPrimaryClick: () => void;
  onSecondaryClick: () => void;
}

export default function ButtonGroup({
  onPrimaryClick,
  onSecondaryClick,
  primaryTitle,
  secondaryTitle,
}: ButtonGroupProps) {
  return (
    <div>
      <button
        className="inline-block mr-2 bg-blue-500 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded"
        onClick={onPrimaryClick}
      >
        {primaryTitle}
      </button>
      <button
        className="inline-block bg-gray-500 text-white text-sm py-2 px-4 rounded"
        onClick={onSecondaryClick}
      >
        {secondaryTitle}
      </button>
    </div>
  );
}
