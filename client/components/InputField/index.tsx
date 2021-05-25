import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

interface InputFieldProps {
  type: string;
  name: string;
  label: string;
  placeholder: string;
  submitting: boolean;
  required?: boolean;
  option?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  required = true,
  label,
  submitting,
  option,
  ...props
}) => {
  const [field, { error }] = useField(props);

  if (option === "select") {
    return (
      <FormControl
        mt={4}
        isInvalid={!!error}
        isRequired={required}
        isDisabled={submitting}
      >
        <FormLabel htmlFor={field.name}>{label}</FormLabel>
        <Select {...field} {...props} id={field.name}>
          <option value={"true"}>Yes</option>
          <option value={"false"}>No</option>
        </Select>
        {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
      </FormControl>
    );
  }

  if (option === "textarea") {
    return (
      <FormControl
        mt={4}
        isInvalid={!!error}
        isRequired={required}
        isDisabled={submitting}
      >
        <FormLabel htmlFor={field.name}>{label}</FormLabel>
        <Textarea {...field} {...props} id={field.name} />
        {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
      </FormControl>
    );
  }

  return (
    <FormControl
      mt={4}
      isInvalid={!!error}
      isRequired={required}
      isDisabled={submitting}
    >
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input {...field} {...props} id={field.name} step={1} min={1} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default InputField;
