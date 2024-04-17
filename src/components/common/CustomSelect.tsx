import { Option, Select } from '@mui/joy';
import { FormState } from '../../hooks/useNewProject';

interface CustomSelectProps {
  values: string[];
  handleChange: (field: keyof FormState, value: string | Date | boolean | null) => void;
  name: keyof FormState;
  defaultValue?: string;
}

const CustomSelect = ({ values, handleChange, name, defaultValue = '' }: CustomSelectProps) => {
  return (
    <Select defaultValue={defaultValue} onChange={(_, newVal) => handleChange(name, newVal ?? '')}>
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
