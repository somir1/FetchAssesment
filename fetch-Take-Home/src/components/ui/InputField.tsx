import { TextField } from "@mui/material";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  fullWidth?: boolean;
}

export const InputField = ({
  label,
  value,
  onChange,
  type = "text",
  fullWidth = true,
}: InputFieldProps) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      fullWidth={fullWidth}
      variant="outlined"
    />
  );
};
