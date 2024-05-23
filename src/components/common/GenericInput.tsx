import { FormControl, FormHelperText, FormLabel, Input, InputProps } from '@mui/joy';

type GenericInputProps<T extends string = string> = InputProps & {
  errorString: string | undefined;
  name: T;
  handleChange: (name: T, value: string) => void;
  label: string;
  required?: boolean;
  min?: number;
  max?: number;
};

function GenericInput<T extends string = string>({
  errorString,
  name,
  handleChange,
  label,
  required = false,
  min,
  max,
  ...props
}: GenericInputProps<T>) {
  props.type ? props.type : 'text';
  return (
    <FormControl sx={props.sx} error={!!errorString}>
      <FormLabel>
        {label} {required ? <span className='text-red-600'>*</span> : null}
      </FormLabel>
      <Input
        {...props}
        className='md:max-h-8'
        onChange={e => handleChange(name, e.target.value)}
        slotProps={{ input: { maxLength: max, minLength: min } }}
      />
      {errorString ? <FormHelperText>{errorString}</FormHelperText> : null}
    </FormControl>
  );
}

export default GenericInput;
