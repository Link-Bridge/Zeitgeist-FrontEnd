import { Option, Select } from '@mui/joy';
import { FormState, FormStateTypes } from '../../hooks/useProjectForm';

type CustomSelectProps = {
  options: string[];
  value: string;
  values?: string[];
  handleChange: (field: keyof FormState, value: FormStateTypes) => void;
  name: keyof FormState;
  defaultValue?: string;
  disabled?: boolean;
};

const CustomSelect = ({
  options,
  values,
  handleChange,
  name,
  value,
  disabled = false,
}: CustomSelectProps) => {
  function onChange(_: React.SyntheticEvent | null, newVal: string | null) {
    handleChange(name, newVal);
  }

  const valuesSet = values ?? options;

  return (
    <Select value={value} onChange={onChange} disabled={disabled}>
      {options.map((option, i) => {
        return (
          <Option key={i} value={valuesSet[i]}>
            {option}
          </Option>
        );
      })}
    </Select>
  );
};

export default CustomSelect;
