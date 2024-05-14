import { Option, Select } from '@mui/joy';
import { useEffect, useState } from 'react';
import { FormState } from '../../hooks/useNewProject';

interface CustomSelectProps {
  values: string[];
  handleChange: (field: keyof FormState, value: string | Date | boolean | null) => void;
  name: keyof FormState;
  defaultValue?: string;
  disabled?: boolean;
}

const CustomSelect = ({
  values,
  handleChange,
  name,
  defaultValue,
  disabled = false,
}: CustomSelectProps) => {
  const [currentValue, setCurrentValue] = useState<string | null>(null);

  useEffect(() => {
    setCurrentValue(defaultValue ?? null);
  }, [defaultValue]);

  function onChange(_: React.SyntheticEvent | null, newVal: string | null) {
    setCurrentValue(newVal);
    handleChange(name, newVal);
  }

  return (
    <Select value={currentValue} onChange={onChange} disabled={disabled}>
      {values.map(value => {
        return (
          <Option key={value} value={value}>
            {value}
          </Option>
        );
      })}
    </Select>
  );
};

export default CustomSelect;
