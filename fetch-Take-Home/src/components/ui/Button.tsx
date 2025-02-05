import { Button as MUIButton, SxProps, Theme } from "@mui/material";

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "contained" | "outlined" | "text";
  color?: "primary" | "secondary" | "error" | "success";
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

export const Button = ({
  label,
  onClick,
  variant = "contained",
  color = "primary",
  disabled = false,
}: ButtonProps) => {
  return (
    <MUIButton
      variant={variant}
      color={color}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </MUIButton>
  );
};
