import { FormControl, FormHelperText, FormLabel, Textarea, TextareaProps } from '@mui/joy';

type GenericTextAreaProps<T extends string = string> = TextareaProps & {
  errorString: string | undefined;
  name: T;
  handleChange: (name: T, value: string) => void;
  label: string;
  required?: boolean;
  min?: number;
  max?: number;
};

function GenericTextArea<T extends string = string>({
  errorString,
  name,
  handleChange,
  label,
  required = false,
  min,
  max,
  ...props
}: GenericTextAreaProps<T>) {
  return (
    <FormControl error={!!errorString}>
      <FormLabel>{label}</FormLabel>
      <Textarea
        {...props}
        required={required}
        name={name}
        value={props.value}
        onChange={e => handleChange(name, e.target.value)}
        slotProps={{ textarea: { minLength: min, maxLength: max } }}
      />
      {errorString ? <FormHelperText>{errorString}</FormHelperText> : null}
    </FormControl>
  );
}

export default GenericTextArea;
