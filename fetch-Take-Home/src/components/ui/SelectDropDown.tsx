import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface SelectDropdownProps<T> {
  label: string;
  value: T;
  options: T[];
  onChange: (value: T) => void;
}

export const SelectDropdown = <T extends string>({
  label,
  value,
  options,
  onChange,
}: SelectDropdownProps<T>) => {
  return (
    <FormControl fullWidth>
      <InputLabel className="b-4">{label}</InputLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        displayEmpty
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
