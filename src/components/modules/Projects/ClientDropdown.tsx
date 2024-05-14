import { Option, Select } from '@mui/joy';
import React, { useEffect, useState } from 'react';
import { FormState } from '../../../hooks/useNewProject';
import { CompanyEntity } from '../../../types/company';
import { truncateText } from '../../../utils/methods';

interface ClientDropdownProps {
  values: CompanyEntity[];
  handleChange: (field: keyof FormState, value: string | Date | boolean | null) => void;
  name: keyof FormState;
  defaultValue?: string;
}

const ClientDropdown = ({ defaultValue, handleChange, values, name }: ClientDropdownProps) => {
  const [currentValue, setCurrentValue] = useState<string | null>(null);

  useEffect(() => {
    setCurrentValue(defaultValue ?? null);
  }, [defaultValue]);

  function onChange(_: React.SyntheticEvent | null, newVal: string | null) {
    setCurrentValue(newVal);
    handleChange(name, String(newVal));
  }

  return (
    <Select
      value={currentValue}
      onChange={onChange}
      slotProps={{
        listbox: { placement: 'bottom-start' },
      }}
    >
      {values.map(value => {
        return (
          <Option key={value.id} value={value.id}>
            {truncateText(value.name, 40)}
          </Option>
        );
      })}
    </Select>
  );
};

export default ClientDropdown;
