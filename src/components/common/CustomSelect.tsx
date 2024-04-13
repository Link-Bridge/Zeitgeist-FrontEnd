import { Option, Select } from '@mui/joy';
import { FormState } from '../../hooks/useNewProject';

interface CustomSelectProps {
  values: string[];
  handleChange: (field: keyof FormState, value: string | Date | boolean) => void;
  name: keyof FormState;
}

const CustomSelect = ({ values, handleChange, name }: CustomSelectProps) => {
  return (
    <Select onChange={(_, newVal) => handleChange(name, String(newVal))}>
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
