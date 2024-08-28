import { ChangeEvent, FC, useState } from "react";

interface InputFieldProps {
  id: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  ariaLabel: string;
  required?: boolean;
  validate?: (value: string) => string | null; // Validation function that returns an error message or null
}

const InputField: FC<InputFieldProps> = ({
  id,
  type,
  value,
  onChange,
  placeholder,
  ariaLabel,
  required,
  validate,
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(e);

    if (validate) {
      const validationError = validate(newValue);
      setError(validationError);
    }
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {ariaLabel}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`bg-gray-50 border ${
          error ? "border-red-500" : "border-gray-300"
        } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        aria-label={ariaLabel}
        required={required}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
