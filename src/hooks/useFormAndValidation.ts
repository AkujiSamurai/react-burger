import { useCallback, useState } from 'react';

import type React from 'react';

type Form = Record<string, string>;

type UseFormAndValidationReturn<T extends Form> = {
  values: T;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetForm: (newValues?: T, newErrors?: T, newIsValid?: boolean) => void;
  errors: T;
  isValid: boolean;
  setValues: React.Dispatch<React.SetStateAction<T>>;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useFormAndValidation<T extends Form>(
  initialState: T = {} as T
): UseFormAndValidationReturn<T> {
  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState<T>({} as T);
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    const form = e.target.closest('form');
    setIsValid(form?.checkValidity() ?? false);
  };

  const resetForm = useCallback(
    (newValues: T = {} as T, newErrors: T = {} as T, newIsValid = true) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    []
  );

  return { values, handleChange, resetForm, errors, isValid, setValues, setIsValid };
}
