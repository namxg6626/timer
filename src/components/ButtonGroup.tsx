import clsx from "clsx";

interface ButtonGroupProps {
  primaryTitle: string;
  secondaryTitle: string;
  onPrimaryClick: () => void;
  onSecondaryClick: () => void;
  disablePrimaryButton?: boolean;
  disableSecondaryButton?: boolean;
}

export default function ButtonGroup({
  onPrimaryClick,
  onSecondaryClick,
  primaryTitle,
  secondaryTitle,
  disablePrimaryButton,
  disableSecondaryButton,
}: ButtonGroupProps) {
  return (
    <div>
      <button
        disabled={disablePrimaryButton}
        className={clsx(
          "inline-block mr-2 bg-blue-500  text-white text-sm py-2 px-4 rounded",
          {
            "bg-blue-900 cursor-not-allowed": disablePrimaryButton,
          }
        )}
        onClick={onPrimaryClick}
      >
        {primaryTitle}
      </button>
      <button
        disabled={disableSecondaryButton}
        className="inline-block bg-gray-500 text-white text-sm py-2 px-4 rounded"
        onClick={onSecondaryClick}
      >
        {secondaryTitle}
      </button>
    </div>
  );
}
